import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating, onRatingPress }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <TouchableOpacity key={i} onPress={() => onRatingPress(i)}>
        <Icon name="star" size={30} color={i <= rating ? '#FFD700' : '#ccc'} />
      </TouchableOpacity>
    );
  }

  return <View style={styles.starContainer}>{stars}</View>;
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});

export default StarRating;