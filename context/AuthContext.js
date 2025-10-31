import React, { createContext, useEffect, useState, useCallback } from "react";
import { saveAuth, loadAuth, clearAuth } from "../utils/storage";
import { mockLogin, mockRegister, mockRefresh } from "../utils/mockAuth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveSession = async (data) => {
    setUser(data.user);
    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setExpiresAt(data.expiresAt);
    await saveAuth(data);
  };

  // ✅ Load Session + Check Expiry Before Showing UI
  useEffect(() => {
    (async () => {
      const data = await loadAuth();

      if (data?.user) {
        const { user, accessToken, refreshToken, expiresAt } = data;

        if (expiresAt && expiresAt < Date.now()) {
          console.log("⛔ Token expired on launch → trying refresh...");

          try {
            const refreshed = await mockRefresh({ refreshToken });
            await saveSession({
              user,
              accessToken: refreshed.accessToken,
              refreshToken: refreshed.refreshToken,
              expiresAt: refreshed.expiresAt,
            });
            console.log("✅ Session refreshed on launch");
          } catch {
            console.log("🚫 Refresh failed → logout");
            await clearAuth();
          }
        } else {
          setUser(user);
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          setExpiresAt(expiresAt);
          console.log("🔁 Session restored");
        }
      }
      setLoading(false);
    })();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const data = await mockLogin({ email, password });
      await saveSession(data);
      console.log("✅ Logged in");
    } catch (err) {
      alert(err.message);
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      await mockRegister({ name, email, password });
      alert("✅ Registered! Please login");
    } catch (err) {
      alert(err.message);
    }
  };

  const refreshSession = useCallback(async () => {
    try {
      const data = await mockRefresh({ refreshToken });
      await saveSession({
        user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
      });
      console.log("🔁 Token refreshed");
    } catch {
      logout();
    }
  }, [refreshToken, user]);

  // ✅ Auto refresh before expiry
  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const diff = expiresAt - Date.now();
      if (diff <= 0) {
        console.log("⛔ Token expired → logout");
        logout();
      } else if (diff < 30000) {
        refreshSession();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [expiresAt, refreshSession]);

  const logout = async () => {
    await clearAuth();
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setExpiresAt(null);
    console.log("🚪 Logged out");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, accessToken, expiresAt }}
    >
      {children}
    </AuthContext.Provider>
  );
}
