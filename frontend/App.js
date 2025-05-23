import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import RouteScreen from './components/RouteScreen';
import AddFeedbackScreen from './components/AddFeedbackScreen';
import ViewAllFeedbackScreen from './components/ViewAllFeedbackScreen';
import UpdateFeedbackScreen from './components/UpdateFeedbackScreen';
import AddRouteScreen from './components/AddRouteScreen';
import ViewAllRoutesScreen from './components/ViewAllRoutesScreen';
import UpdateRouteScreen from './components/UpdateRouteScreen';
import MapScreen from './components/MapScreen'; // Ensure this import is correct
import { UserProvider } from './components/UserContext';
import FeedbackReportScreen from './components/FeedbackReportScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RouteScreen" component={RouteScreen} />
        <Stack.Screen name="FeedbackScreen" component={AddFeedbackScreen} />
        <Stack.Screen name="ViewAllFeedback" component={ViewAllFeedbackScreen} options={{ title: 'View All Feedback' }} />
        <Stack.Screen name="UpdateFeedback" component={UpdateFeedbackScreen} options={{ title: 'Update Feedback' }} />
        <Stack.Screen name="AddRoute" component={AddRouteScreen} options={{ title: 'Add New Route' }} />
        <Stack.Screen name="ViewAllRoutes" component={ViewAllRoutesScreen} options={{ title: 'View All Routes' }} />
        <Stack.Screen name="UpdateRoute" component={UpdateRouteScreen} options={{ title: 'Update Route' }} />
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ title: 'Map' }} />
        <Stack.Screen name="Report" component={FeedbackReportScreen} options={{ title: 'Report' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}