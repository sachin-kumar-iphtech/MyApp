import * as React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Enter email & password");
      return;
    }

    try {
      const jsonValue = await AsyncStorage.getItem("user");
      const storedUser = jsonValue ? JSON.parse(jsonValue) : null;

      if (storedUser && storedUser.email === email && storedUser.password === password) {
        navigation.navigate("Profile");
      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to read user data");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ marginTop:20, color:"#007bff" }}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20, backgroundColor:'#f2f2f2' },
  title:{ fontSize:32, fontWeight:'bold', marginBottom:20 },
  input:{ width:'100%', borderWidth:1, borderColor:'#ccc', borderRadius:8, padding:12, marginBottom:15, backgroundColor:'#fff' },
  button:{ width:'100%', backgroundColor:'#007bff', padding:15, borderRadius:8, alignItems:'center', marginTop:10 },
  buttonText:{ color:'#fff', fontWeight:'bold', fontSize:16 },
});
