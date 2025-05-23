import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const RouteScreen = () => {
  const [truckCode, setTruckCode] = useState('');
  const [routeDetails, setRouteDetails] = useState('');

  const handleSubmit = () => {
    // Here you would typically send this data to the server
    console.log({ truckCode, routeDetails });
    alert(`Route for ${truckCode} updated!`);
    // Clear form fields
    setTruckCode('');
    setRouteDetails('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add/Update Route</Text>
      <TextInput
        style={styles.input}
        placeholder="Truck Code"
        value={truckCode}
        onChangeText={setTruckCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Route Details"
        value={routeDetails}
        onChangeText={setRouteDetails}
        multiline
      />
      <Button title="Submit Route" onPress={handleSubmit} />
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

export default RouteScreen;