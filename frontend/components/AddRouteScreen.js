import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import { useUser } from './UserContext';
import { Picker } from '@react-native-picker/picker';

const AddRouteScreen = ({ navigation }) => {
    const [truckId, setTruckId] = useState('');
    const [startDistrict, setStartDistrict] = useState('');
    const [endDistrict, setEndDistrict] = useState('');
    const { user } = useUser();
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
  
    const setRoutePointsByDistricts = (start, end) => {
      const startPoints = routePointsData[start] || [];
      const endPoints = routePointsData[end] || [];
      setRoutePoints([...startPoints, ...endPoints]);
    };
  
    const handleAddRoute = async () => {
        try {
          if (!startDistrict || !endDistrict) {
            throw new Error('Please select both start and end districts.');
          }
      
          if (!routePoints.length) {
            throw new Error('Route points not found for selected start and end districts');
          }
      
          // Truck ID validation
          const truckIdRegex = /^[A-Z0-9]{6}$/; // Example format: Six alphanumeric characters
          if (!truckIdRegex.test(truckId)) {
            throw new Error('Truck ID must be six characters long and alphanumeric.');
          }
      
          await axios.post('http://192.168.100.10:5000/api/routes', { 
            truckId, 
            startDistrict,
            endDistrict,
            userId: user.userId,
            routePoints
          });
          navigation.goBack();
        } catch (error) {
          console.error(error);
          Alert.alert('Error', `Failed to add route: ${error.response?.data?.message || error.message}`);
        }
      };      
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={truckId}
          onChangeText={setTruckId}
          placeholder="Enter truck ID"
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={startDistrict}
            onValueChange={(itemValue) => {
              setStartDistrict(itemValue);
              setRoutePoints([]);
              setRoutePointsByDistricts(itemValue, endDistrict);
            }}
            mode="dropdown"
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
            mode="dropdown"
          >
            {Object.keys(routePointsData).map(city => (
                <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>
        <Button title="Add Route" onPress={handleAddRoute} color="#4CAF50"/>
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

export default AddRouteScreen;