import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useUser } from '../components/UserContext'; // Correct usage of useUser

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser(); // Correct usage of context to access setUser

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.100.10:5000/api/auth/signin', { email, password });
      setLoading(false);
      const { data } = response;
      setUser(data);  // Store user data in context

      Alert.alert('Success', 'Logged in successfully');
      navigation.navigate('Home', { userId: data.userId, userType: data.userType });
    } catch (error) {
      setLoading(false);
      let errorMessage = 'Failed to log in';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'No response received';
      }
      Alert.alert('Login Failed', errorMessage);
      console.error('Sign in error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Button title="Sign In" onPress={handleSignIn} color="#4CAF50" />
      )}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2196F3',
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  linkText: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
  },
});

export default SignInScreen;