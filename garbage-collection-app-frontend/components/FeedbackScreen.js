import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const FeedbackScreen = () => {
  const [userId, setUserId] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    if (!userId || !feedback) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
    
    try {
      // Update this line with your actual IP and port
      const response = await axios.post('http://192.168.100.10:5000/api/feedback', {
        userId,
        feedback
      });

      // Handle response here
      console.log(response.data);
      Alert.alert('Success', 'Feedback submitted successfully!');
      // Clear form fields
      setUserId('');
      setFeedback('');
    } catch (error) {
      console.error(error);
      // Handle errors here
      Alert.alert('Error', 'Failed to submit feedback');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Submit Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <Button title="Submit Feedback" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  }
});

export default FeedbackScreen;