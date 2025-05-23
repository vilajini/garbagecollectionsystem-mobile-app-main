import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

const FeedbackReportScreen = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://192.168.100.10:5000/api/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
      Alert.alert('Error', 'Failed to fetch feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const generatePdfAndShare = async () => {
    setLoading(true);
    try {
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              h1 { color: navy; }
              p { margin: 5px 0; }
            </style>
          </head>
          <body>
            ${feedbacks.map((feedback, index) => `
              <h1>Feedback ${index + 1}</h1>
              <p>Truck ID: ${feedback.truckId}</p>
              <p>Feedback: ${feedback.feedback}</p>
              <p>Rating: ${feedback.rating} ${renderStars(feedback.rating)}</p>
              <p>Date Created: ${feedback.dateCreated}</p>
            `).join('')}
          </body>
        </html>
      `;

      const file = await printToFileAsync({ html });
      await shareAsync(file.uri);
    } catch (error) {
      console.error('Failed to generate or share PDF:', error);
      Alert.alert('Error', 'Failed to generate or share PDF');
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this feedback?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.100.10:5000/api/feedback/${id}`);
              setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete feedback');
              console.error('Failed to delete feedback:', error);
            }
          }
        }
      ]
    );
  };

  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon key={i} name={i <= rating ? "star" : "star-o"} size={20} color="#FFD700" />
      );
    }
    return <View style={{ flexDirection: 'row' }}>{stars}</View>;
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {feedbacks.map(feedback => (
          <View key={feedback._id} style={styles.feedbackItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.feedbackText}>Truck ID: {feedback.truckId}</Text>
              <Text style={styles.feedbackText}>Feedback: {feedback.feedback}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.feedbackText}>{renderStars(feedback.rating)}</Text>
              </View>
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
        <Button title="Generate PDF and Share" onPress={generatePdfAndShare} color="#4CAF50"/>
      </ScrollView>
    </View>
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    padding: 10,
  },
  loader: {
    marginTop: 20
  }
});

export default FeedbackReportScreen;