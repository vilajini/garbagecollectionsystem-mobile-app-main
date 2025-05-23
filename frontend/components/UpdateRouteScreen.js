import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component

const UpdateRouteScreen = ({ route, navigation }) => {
  const { routeId } = route.params;
  const [truckId, setTruckCode] = useState('');
  const [routeName, setRouteName] = useState('');
  const [startDistrict, setStartDistrict] = useState('');
  const [endDistrict, setEndDistrict] = useState('');
  const [routePoints, setRoutePoints] = useState([]);

  const routePointsData = {
    Colombo: [
        { latitude: 6.9271, longitude: 79.8612 },
    ],
    Ampara: [
        { latitude: 7.2891, longitude: 81.6533 },
    ],
    Nugegoda: [
        { latitude: 6.8907, longitude: 79.9018 },
    ],
    Katunayaka: [
        { latitude: 7.1725, longitude: 79.8854 }, 
    ],
    Kandy: [
        { latitude: 7.2906, longitude: 80.6337 },
    ],
    Galle: [
        { latitude: 6.0535, longitude: 80.2209 },
    ],
    Anuradhapura: [
        { latitude: 8.3114, longitude: 80.4037 },
    ],
    Jaffna: [
        { latitude: 9.6685, longitude: 80.0074 },
    ],
    Trincomalee: [
        { latitude: 8.5874, longitude: 81.2152 },
    ],
    Badulla: [
        { latitude: 6.9934, longitude: 81.0550 },
    ],
    Ratnapura: [
        { latitude: 6.6828, longitude: 80.3992 },
    ],
    Negombo: [
        { latitude: 7.2008, longitude: 79.8737 },
    ],
};

  useEffect(() => {
    fetchRouteDetails();
  }, []);

  const fetchRouteDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.100.10:5000/api/routes/${routeId}`);
      if (response.data) {
        setRouteName(response.data.name);  // Update this line based on actual data structure
        setTruckCode(response.data.truckId);  // Assuming truckId is also part of the route data
        setStartDistrict(response.data.startDistrict);  // Assuming startDistrict is part of the route data
        setEndDistrict(response.data.endDistrict);  // Assuming endDistrict is part of the route data
      }
    } catch (error) {
      console.error('Failed to fetch route details:', error);
      Alert.alert('Error', 'Failed to fetch route details');
    }
  };

  const handleUpdate = async () => {
    try {
      if (!truckId || !truckId.trim()) {
        throw new Error('Please enter a truck code.');
      }
  
      // Truck ID validation
      const truckIdRegex = /^[A-Za-z0-9]{6}$/; // Example format: Six alphanumeric characters
      if (!truckIdRegex.test(truckId)) {
        throw new Error('Truck code must be six alphanumeric characters.');
      }
  
      // Continue with the update operation
      await axios.put(`http://192.168.100.10:5000/api/routes/${routeId}`, {
        name: routeName,
        truckId: truckId,
        startDistrict: startDistrict,
        endDistrict: endDistrict,
        routePoints: routePoints // Assuming routePoints is also part of the route data
      });
      Alert.alert('Success', 'Route updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update route:', error);
      Alert.alert('Error', error.message);
    }
  };  

  // Function to set route points based on selected districts
  const setRoutePointsByDistricts = (start, end) => {
    const startPoints = routePointsData[start] || [];
    const endPoints = routePointsData[end] || [];
    setRoutePoints([...startPoints, ...endPoints]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={truckId}
        onChangeText={setTruckCode}
        placeholder="Enter truck code"
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={startDistrict}
          onValueChange={(itemValue) => {
            setStartDistrict(itemValue);
            setRoutePoints([]);
            setRoutePointsByDistricts(itemValue, endDistrict);
          }}
          mode="dropdown" // Android only
        >
          {Object.keys(routePointsData).map(city => (
                <Picker.Item key={city} label={city} value={city} />
            ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={endDistrict}
          onValueChange={(itemValue) => {
            setEndDistrict(itemValue);
            setRoutePoints([]);
            setRoutePointsByDistricts(startDistrict, itemValue);
          }}
          mode="dropdown" // Android only
        >
          {Object.keys(routePointsData).map(city => (
                <Picker.Item key={city} label={city} value={city} />
            ))}
        </Picker>
      </View>
      <Button title="Update Route" onPress={handleUpdate} color="#4CAF50"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#2196F3',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  }
});

export default UpdateRouteScreen;