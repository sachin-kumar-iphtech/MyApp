import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useTheme } from '../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 👁 import for eye icon

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👁 state for password visibility

  const isDark = theme === 'dark';

  const handleLogin = () => {
    if (email && password) {
      dispatch(login({ email }));
      //navigation.replace('Home');
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
    >
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Welcome Back 👋</Text>

      {/* ✅ Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor={isDark ? '#aaa' : '#555'}
        style={[
          styles.input,
          { backgroundColor: isDark ? '#222' : '#f1f1f1', color: isDark ? '#fff' : '#000' },
        ]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* ✅ Password with Eye Icon */}
      <View style={[styles.passwordContainer, { backgroundColor: isDark ? '#222' : '#f1f1f1' }]}>
        <TextInput
          placeholder="Password"
          placeholderTextColor={isDark ? '#aaa' : '#555'}
          style={[styles.passwordInput, { color: isDark ? '#fff' : '#000' }]}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={22}
            color={isDark ? '#fff' : '#333'}
          />
        </TouchableOpacity>
      </View>

      {/* ✅ Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* ✅ Register Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.link, { color: isDark ? '#0af' : '#007bff' }]}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 40 },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  link: { marginTop: 20, fontSize: 16 },
});

export default LoginScreen;
