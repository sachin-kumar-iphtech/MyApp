// src/screens/LoginScreen.js
import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ onGoRegister }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation", "Please enter email & password");
      return;
    }
    try {
      await login({ email, password });

      // success -> RootNavigation will render Home
    } catch (e) {
      Alert.alert("Login Failed", e.message || "Invalid credentials");
    }
  };

  return (
    <View style={{ flex:1,justifyContent:"center",alignItems:"center"}}>
      <View style={{ padding: 20, marginTop: 60, backgroundColor:"gray", borderRadius:20, width:"95%" }}>
        <Text style={{ fontSize:25, fontWeight:"bold", textAlign:"center", marginBottom:12 }}>Login</Text>
        <Text>Email</Text>
        <TextInput placeholder="email@example.com" autoCapitalize="none" value={email} onChangeText={setEmail}
          style={{ borderWidth:1, padding:10, marginBottom:12, backgroundColor:"white" }} />
        <Text>Password</Text>
        <TextInput placeholder="password" secureTextEntry value={password} onChangeText={setPassword}
          style={{ borderWidth:1, padding:10, marginBottom:12, backgroundColor:"white" }} />
        <Button title="Login" onPress={onPressLogin} />
        <TouchableOpacity onPress={onGoRegister} style={{ marginTop:12 }}>
          <Text style={{ color:"blue" }}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
