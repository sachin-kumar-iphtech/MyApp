import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const RegisterScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isDark = theme === 'dark';

  const handleRegister = () => {
    if (!email || !password) return alert('Please fill all fields');
    if (password !== confirmPassword) return alert('Passwords do not match');

    // Register logic here (You can save in AsyncStorage or API)
    alert('Registered successfully!');
    navigation.replace('Login'); // go to login without pre-filled values
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
    >
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Create Account ✨</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={isDark ? '#aaa' : '#555'}
        style={[styles.input, { backgroundColor: isDark ? '#222' : '#f1f1f1', color: isDark ? '#fff' : '#000' }]}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={isDark ? '#aaa' : '#555'}
        style={[styles.input, { backgroundColor: isDark ? '#222' : '#f1f1f1', color: isDark ? '#fff' : '#000' }]}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={isDark ? '#aaa' : '#555'}
        style={[styles.input, { backgroundColor: isDark ? '#222' : '#f1f1f1', color: isDark ? '#fff' : '#000' }]}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.link, { color: isDark ? '#0af' : '#007bff' }]}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 40 },
  input: { width: '100%', padding: 15, borderRadius: 12, marginBottom: 20, fontSize: 16 },
  button: { backgroundColor: '#007bff', paddingVertical: 14, width: '100%', borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  link: { marginTop: 20, fontSize: 16 },
});

export default RegisterScreen;
