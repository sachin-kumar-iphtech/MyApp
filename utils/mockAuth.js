// src/utils/mockAuth.js
// In-memory fake server. App restart clears users (only tokens persist if stored).

// let users = {}; // { email: { name, password } }
let users = {
    "test@test.com": { name: "Test User", password: "123456" }
  };
  
const rand = (len = 24) => Math.random().toString(36).slice(2, 2 + len);
const wait = (ms = 350) => new Promise((r) => setTimeout(r, ms));

export async function mockRegister({ name, email, password }) {
  await wait();
  const e = email.trim().toLowerCase();
  if (users[e]) throw new Error("User already exists");
  users[e] = { name: name.trim(), password };
  return { message: "Registered" };
}

export async function mockLogin({ email, password }) {
  await wait();
  const e = email.trim().toLowerCase();
  const u = users[e];
  if (!u || u.password !== password) throw new Error("Invalid credentials");

  const accessToken = "acc_" + rand(28);
  const refreshToken = "ref_" + rand(36);
  const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minutes

  return {
    user: { name: u.name, email: e },
    accessToken,
    refreshToken,
    expiresAt,
  };
}

export async function mockRefresh({ refreshToken }) {
  await wait();
  if (!refreshToken || typeof refreshToken !== "string") {
    throw new Error("Invalid refresh token");
  }
  // For mock: accept any string refreshToken
  const accessToken = "acc_" + rand(28);
  const newRefreshToken = "ref_" + rand(36);
  const expiresAt = Date.now() + 2 * 60 * 1000;
  return {
    accessToken,
    refreshToken: newRefreshToken,
    expiresAt,
  };
}
console.log("Users db:", users);
