import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ViewAllFeedbackScreen = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://192.168.31.214:5000/api/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.log(error);
        alert('Failed to fetch feedbacks');
      }
    };

    fetchFeedbacks();  // Fetch immediately on component mount
    const interval = setInterval(fetchFeedbacks, 5000);  // Set up the interval to refresh every 5 seconds

    return () => clearInterval(interval);  // Clear the interval when the component unmounts
  }, []);

  const deleteFeedback = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this feedback?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.31.214:5000/api/feedback/${id}`);
              alert("Feedback deleted successfully!");
            } catch (error) {
              alert("Failed to delete feedback");
              console.log(error);
            }
          }
        }
      ]
    );
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Icon key={i} name="star" size={20} color="#FFD700" />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<Icon key={i} name="star-half" size={20} color="#FFD700" />);
      } else {
        stars.push(<Icon key={i} name="star-o" size={20} color="#FFD700" />);
      }
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  return (
    <ScrollView style={styles.container}>
      {feedbacks.map(feedback => (
        <View key={feedback._id} style={styles.feedbackItem}>
          <View style={{ flex: 1 }}>
            <Text style={styles.feedbackText}>Truck ID: {feedback.truckId}</Text>
            <Text style={styles.feedbackText}>Feedback: {feedback.feedback}</Text>
            <Text style={styles.feedbackText}>{renderStars(feedback.rating)}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('UpdateFeedback', { feedbackId: feedback._id })}
            style={styles.icon}
          >
            <Icon name="edit" size={20} color="#007bff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteFeedback(feedback._id)}
            style={styles.icon}
          >
            <Icon name="trash" size={20} color="#dc3545" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10, 
    backgroundColor: '#2196F3',
  },
  feedbackItem: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  feedbackText: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
    padding: 10,
  }
});

export default ViewAllFeedbackScreen;