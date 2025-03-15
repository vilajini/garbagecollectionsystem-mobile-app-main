import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import StarRating from './StarRating'; // Import the StarRating component

const UpdateFeedbackScreen = ({ route, navigation }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0); // Initialize rating as 0
  const [truckId, setTruckId] = useState('');
  const [truckIds, setTruckIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { feedbackId } = route.params;
  const { onGoBack } = route.params;

  useEffect(() => {
    const fetchFeedbackDetails = async () => {
      try {
        setLoading(true); // Start loading when fetching details
        const response = await axios.get(`http://192.168.31.214:5000/api/feedback/getfeedback/${feedbackId}`);
        const data = response.data;
        setFeedback(data.feedback || '');
        setRating(data.rating || 0);
        setTruckId(data.truckId || '');
      } catch (error) {
        console.error('Failed to fetch feedback details:', error);
        Alert.alert('Error', 'Failed to load feedback data');
      } finally {
        setLoading(false); // End loading whether successful or not
      }
    };

    fetchFeedbackDetails();
  }, [feedbackId]);

  useEffect(() => {
    fetchTruckIds();
  }, []);

  const fetchTruckIds = async () => {
    try {
      const response = await axios.get('http://192.168.31.214:5000/api/routes');
      setTruckIds(response.data.map(truck => truck.truckId));
    } catch (error) {
      console.error('Error fetching truck IDs:', error);
      Alert.alert('Error', 'Failed to fetch truck IDs');
    }
  };

  const handleUpdate = async () => {
    if (!feedback || feedback.trim().length === 0 || rating === 0 || !truckId) {
      Alert.alert('Error', 'Please provide all necessary details');
      return;
    }
  
    // Validate feedback length
    if (feedback.length > 50) {
      Alert.alert('Error', 'Feedback cannot exceed 50 characters');
      return;
    }
  
    try {
      setLoading(true); // Start loading when attempting to update
      const response = await axios.put(`http://192.168.31.214:5000/api/feedback/${feedbackId}`, {
        feedback,
        rating,
        truckId
      });
      Alert.alert('Success', 'Feedback updated successfully!');
      if (onGoBack) onGoBack(); // Call the callback function before going back
      navigation.goBack(); // Navigate back after successful update
    } catch (error) {
      console.error('Failed to update feedback:', error);
      Alert.alert('Error', 'Failed to update feedback');
    } finally {
      setLoading(false); // End loading whether successful or not
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Feedback</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Update Feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <StarRating rating={rating} onRatingPress={setRating} />
      <Picker
        style={styles.input}
        selectedValue={truckId}
        onValueChange={(itemValue) => setTruckId(itemValue)}
      >
        <Picker.Item label="Select Truck ID" value="" />
        {truckIds.map((truckId, index) => (
          <Picker.Item key={index} label={truckId} value={truckId} />
        ))}
      </Picker>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Update Feedback" onPress={handleUpdate} color="#4CAF50" disabled={loading} />
      )}
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
  header: {
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
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
});

export default UpdateFeedbackScreen;