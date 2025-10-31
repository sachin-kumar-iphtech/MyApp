// src/screens/RegisterScreen.js
import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function RegisterScreen({ onGoLogin }) {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPressRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Validation", "All fields required");
      return;
    }
    try {
      await register({ name, email, password });

      Alert.alert("Success", "Registered — please login");
      onGoLogin();
    } catch (e) {
      Alert.alert("Register Failed", e.message || "Error");
    }
  };

  return (
    <View style={{ flex:1,justifyContent:"center",alignItems:"center"}}>
      <View style={{ padding:20, marginTop:60, backgroundColor:"gray", borderRadius:20, width:"95%" }}>
        <Text style={{ fontSize:25, fontWeight:"bold", textAlign:"center", marginBottom:12 }}>Register</Text>
        <Text>Name</Text>
        <TextInput value={name} onChangeText={setName} style={{ borderWidth:1, padding:10, marginBottom:12, backgroundColor:"white" }} />
        <Text>Email</Text>
        <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" style={{ borderWidth:1, padding:10, marginBottom:12, backgroundColor:"white" }} />
        <Text>Password</Text>
        <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth:1, padding:10, marginBottom:12, backgroundColor:"white" }} />
        <Button title="Register" onPress={onPressRegister} />
        <TouchableOpacity onPress={onGoLogin} style={{ marginTop:12 }}>
          <Text style={{ color:"blue" }}>Already have account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
