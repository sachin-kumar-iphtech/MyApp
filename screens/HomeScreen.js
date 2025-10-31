// src/screens/HomeScreen.js
import React, { useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, accessToken, expiresAt, logout } = useContext(AuthContext);

  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome {user?.name}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.tokenText}>Email: {user?.email}</Text>
        <Text style={styles.tokenText}>
          Token Expires: {expiresAt ? new Date(expiresAt).toLocaleTimeString() : "n/a"}
        </Text>
        <Text style={styles.tokenText}>
          Access Token: {accessToken ? accessToken.slice(0, 20) + "..." : "n/a"}
        </Text>
      </View>

      

      <View style={styles.logoutBox}>
        <Button title="Logout" onPress={logout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 0, alignItems: "center", backgroundColor: "#f2f2f2" ,justifyContent:"center"},
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  infoBox: { marginBottom: 15, backgroundColor: "#fff", padding: 10, borderRadius: 8, width: "90%", elevation: 2 },
  tokenText: { fontSize: 15, marginBottom: 5, color: "#555" },
  logoutBox: { width: "90%", marginTop: 12, marginBottom: 20 },
});
