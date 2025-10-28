import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 👁 for eye icon

const RegisterScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // ✅ State variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ✅ Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Email validation regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = () => {
    // ✅ Validation checks
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      return Alert.alert('Error', 'Please fill all fields.');
    }

    if (!validateEmail(email)) {
      return Alert.alert('Invalid Email', 'Please enter a valid email address.');
    }

    if (password.length < 6) {
      return Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
    }

    if (password !== confirmPassword) {
      return Alert.alert('Password Mismatch', 'Passwords do not match.');
    }

    // ✅ Registration success
    Alert.alert('Success', 'Registered successfully!');
    navigation.replace('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}
    >
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Create Account ✨</Text>

      {/* ✅ First Name */}
      <TextInput
        placeholder="First Name"
        placeholderTextColor={isDark ? '#aaa' : '#555'}
        style={[styles.input, { backgroundColor: isDark ? '#222' : '#f1f1f1', color: isDark ? '#fff' : '#000' }]}
        value={firstName}
        onChangeText={setFirstName}
      />

      {/* ✅ Last Name */}
      <TextInput
        placeholder="Last Name"
        placeholderTextColor={isDark ? '#aaa' : '#555'}
        style={[styles.input, { backgroundColor: isDark ? '#222' : '#f1f1f1', color: isDark ? '#fff' : '#000' }]}
        value={lastName}
        onChangeText={setLastName}
      />

      {/* ✅ Email */}
      <TextInput
        placeholder="Email"
        placeholderTextColor={isDark ? '#aaa' : '#555'}
        style={[styles.input, { backgroundColor: isDark ? '#222' : '#f1f1f1', color: isDark ? '#fff' : '#000' }]}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* ✅ Password with eye icon */}
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

      {/* ✅ Confirm Password with eye icon */}
      <View style={[styles.passwordContainer, { backgroundColor: isDark ? '#222' : '#f1f1f1' }]}>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={isDark ? '#aaa' : '#555'}
          style={[styles.passwordInput, { color: isDark ? '#fff' : '#000' }]}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons
            name={showConfirmPassword ? 'eye' : 'eye-off'}
            size={22}
            color={isDark ? '#fff' : '#333'}
          />
        </TouchableOpacity>
      </View>

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

export default RegisterScreen;
