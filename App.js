// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from './Pages/Dashboard'; // adjust this if path is different

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        {/* Add other screens here like Tasks, Mindfulness, etc */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
