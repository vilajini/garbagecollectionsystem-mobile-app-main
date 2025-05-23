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
import { useUser } from './UserContext';
import StarRating from './StarRating'; // Import the StarRating component

const AddFeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0); // State to store rating
  const [truckIds, setTruckIds] = useState([]);
  const { user } = useUser();
  const [selectedTruckId, setSelectedTruckId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTruckIds();
  }, []);

  const fetchTruckIds = async () => {
    try {
      const response = await axios.get('http://192.168.100.10:5000/api/routes');
      setTruckIds(response.data.map(truck => truck.truckId));
    } catch (error) {
      console.error('Error fetching truck IDs:', error);
      Alert.alert('Error', 'Failed to fetch truck IDs');
    }
  };

  const handleSubmit = async () => {
    if (!user?.userId || !selectedTruckId || rating === 0) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
  
    // Validate feedback length
    if (feedback.length > 50) {
      Alert.alert('Error', 'Feedback cannot exceed 50 characters');
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.100.10:5000/api/feedback', {
        userId: user.userId,
        feedback,
        truckId: selectedTruckId,
        rating
      });
  
      Alert.alert('Success', 'Feedback submitted successfully!');
      setFeedback('');
      setRating(0); // Reset rating
      setSelectedTruckId('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };  

  return (
    <View style={styles.container}>
      <Picker
        style={styles.input}
        selectedValue={selectedTruckId}
        onValueChange={(itemValue) => setSelectedTruckId(itemValue)}
      >
        <Picker.Item label="Select Truck ID" value="" />
        {truckIds.map((truckId, index) => (
          <Picker.Item key={index} label={truckId} value={truckId} />
        ))}
      </Picker>
      <StarRating rating={rating} onRatingPress={setRating} />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Feedback"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Button title="Submit Feedback" onPress={handleSubmit} color="#4CAF50" />
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

export default AddFeedbackScreen;