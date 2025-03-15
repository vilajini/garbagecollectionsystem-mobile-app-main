import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ route, navigation }) => {
  const { userId, userType } = route.params;

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const userTypeNames = {
    admin: 'Admin',
    garbageCollector: 'Garbage Collector',
    publicUser: 'Public User',
  };

  const handleSignOut = () => {
    // Perform sign-out logic here
    navigation.navigate('SignIn'); // Navigate to the sign-in screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Garbage Collection App</Text>
      </View>
      <View style={styles.header}>
      <Text style={styles.userType}>Welcome {userTypeNames[userType]}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/image.jpg')}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonContainer}>
        {(userType === 'admin') && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation('AddRoute')}
          >
            <Icon name="add" size={20} color="white" />
            <Text style={styles.buttonText}>Create Route</Text>
          </TouchableOpacity>
        )}
        {(userType === 'admin' || userType === 'publicUser') && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation('FeedbackScreen')}
          >
            <Icon name="feedback" size={20} color="white" />
            <Text style={styles.buttonText}>Create Feedback</Text>
          </TouchableOpacity>
        )}
        {(userType === 'admin' || userType === 'publicUser' || userType === 'garbageCollector') && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation('MapScreen')}
          >
            <Icon name="map" size={20} color="white" />
            <Text style={styles.buttonText}>View Map</Text>
          </TouchableOpacity>
        )}
        {(userType === 'admin') && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation('ViewAllRoutes')}
          >
            <Icon name="list" size={20} color="white" />
            <Text style={styles.buttonText}>Manage Routes</Text>
          </TouchableOpacity>
        )}
        {(userType === 'admin') && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation('ViewAllFeedback')}
          >
            <Icon name="assignment" size={20} color="white" />
            <Text style={styles.buttonText}>Manage Feedbacks</Text>
          </TouchableOpacity>
        )}
        {(userType === 'admin') && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigation('Report')}
          >
            <Icon name="report" size={20} color="white" />
            <Text style={styles.buttonText}>View Report</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  logo: {
    width: 470,
    height: 340,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  userType: {
    fontSize: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
  signOutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  signOutText: {
    color: 'white',
  },
});

export default HomeScreen;