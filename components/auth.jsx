import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const LoginSignUpComponent = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle login
  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://react-native-backend-ikg4.onrender.com/api/auth/login', { email, password });
      const token = response.data.token;

      // Example: Save token in AsyncStorage or SecureStore
      // await AsyncStorage.setItem('token', token);

      // Dummy user data
      const dummyUser = {
        name: 'Ankit Maharshi',
        email: 'ankitmaharshi55@gmail.com',
        phone: '5467890-=',
        img: 'https://p0.pikist.com/photos/422/376/dolomites-mountains-alpine-italy-south-tyrol-unesco-world-heritage-clouds-panorama-val-gardena-thumbnail.jpg',
      };

      onLogin(dummyUser);
    } catch (error) {
      Alert.alert('Login failed', 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // Handle sign up
 // Handle sign up
const handleSignUp = async () => {
  if (username === '' || email === '' || password === '') {
    Alert.alert('Error', 'Please fill in all fields.');
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post('https://react-native-backend-ikg4.onrender.com/api/auth/signup', {
      username,
      email,
      password,
    });

    Alert.alert('Success', 'Account created successfully!');

    // Dummy user data
    const dummyUser = {
      name: 'Ankit Maharshi',
      email: 'ankitmaharshi55@gmail.com',
      phone: '5467890-=',
      img: 'https://p0.pikist.com/photos/422/376/dolomites-mountains-alpine-italy-south-tyrol-unesco-world-heritage-clouds-panorama-val-gardena-thumbnail.jpg',
    };

    // Automatically log in the user after signup by setting the dummy user
    onLogin(dummyUser);

    // Optionally, switch to the login screen if you don't want automatic login
    // setIsLogin(true);
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error.message);
    Alert.alert('Sign up failed', error.response?.data?.msg || 'An error occurred while signing up');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button
        title={loading ? (isLogin ? 'Logging in...' : 'Signing up...') : isLogin ? 'Login' : 'Sign Up'}
        onPress={isLogin ? handleLogin : handleSignUp}
      />

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  toggleText: {
    textAlign: 'center',
    color: '#3498db',
    marginTop: 16,
    fontSize: 16,
  },
});

export default LoginSignUpComponent;
