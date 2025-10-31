import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import { View, ActivityIndicator } from "react-native";

function RootNavigation() {
  const { user, loading } = useContext(AuthContext);
  const [showReg, setShowReg] = React.useState(false);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) return <HomeScreen />;

  return showReg
    ? <RegisterScreen onGoLogin={() => setShowReg(false)} />
    : <LoginScreen onGoRegister={() => setShowReg(true)} />;
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
