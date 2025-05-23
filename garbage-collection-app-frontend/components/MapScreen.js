import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, TextInput } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const MapScreen = () => {
  const [routes, setRoutes] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('http://192.168.100.10:5000/api/routes');
        setRoutes(response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  const filteredRoutes = routes.filter(route => route.truckId.includes(searchText));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by Truck ID"
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 7.2906,
          longitude: 80.6337,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        {filteredRoutes.map((route, index) => (
          <Polyline
            key={index}
            coordinates={route.routePoints}
            strokeColor={route.color}
            strokeWidth={6}
          />
        ))}
        {filteredRoutes.map((route, index) => (
          <Marker
            key={`start-${index}`}
            coordinate={route.routePoints[0]}
            title={`Start: ${route.startDistrict} - Truck ID: ${route.truckId}`}
            pinColor="green"
          />
        ))}
        {filteredRoutes.map((route, index) => (
          <Marker
            key={`end-${index}`}
            coordinate={route.routePoints[route.routePoints.length - 1]}
            title={`End: ${route.endDistrict} - Truck ID: ${route.truckId}`}
            pinColor="red"
          />
        ))}
      </MapView>
      <ScrollView style={styles.routeList}>
        {filteredRoutes.map(route => (
          <View key={route._id} style={styles.routeItem}>
            <Text style={styles.routeText}>Truck ID: {route.truckId}</Text>
            <Text style={styles.routeDetail}>Start: {route.startDistrict}</Text>
            <Text style={styles.routeDetail}>End: {route.endDistrict}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  map: {
    width: width,
    height: height * 0.5,
  },
  routeList: {
    marginTop: 10,
    paddingHorizontal: 20,
    width: '100%',
    maxHeight: height * 0.4,
  },
  routeItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  routeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  routeDetail: {
    fontSize: 14,
    color: '#888',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
    marginTop: 20,
  },
});

export default MapScreen;