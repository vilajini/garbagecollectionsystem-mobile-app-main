import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Import Picker

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin'); // Default user type
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleSignUp = async () => {
    if (!email || !password || !userType) {
      Alert.alert('Validation Error', 'Please enter all fields and select a user type');
      return;
    }

    setLoading(true); // Start loading before the request
    try {
      await axios.post('http://192.168.100.10:5000/api/auth/signup', { email, password, userType });
      setLoading(false); // End loading after the request is resolved
      Alert.alert('Success', 'Account created successfully', [
        { text: 'OK', onPress: () => navigation.navigate('SignIn') }
      ]);
    } catch (error) {
      setLoading(false); // End loading on error
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        Alert.alert('Signup Failed', error.response.data.message || 'Failed to create account');
      } else if (error.request) {
        // The request was made but no response was received
        Alert.alert('Network Error', 'No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        Alert.alert('Error', 'Error during the setup of the request');
      }
      console.error('Sign up error:', error);
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
      <Picker
        selectedValue={userType}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
      >
        <Picker.Item label="Admin" value="admin" />
        <Picker.Item label="Garbage Collector" value="garbageCollector" />
        <Picker.Item label="Public User" value="publicUser" />
      </Picker>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Button title="Sign Up" onPress={handleSignUp} color="#4CAF50" />
      )}
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.linkText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  linkText: {
    marginTop: 20,
    fontSize: 16,
    color: '#fff',
  },
});

export default SignUpScreen;