// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskListScreen from '../screens/TaskListScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Create a stack navigator for your app
const AppStack = createStackNavigator();

// Create the main switch navigator
const SwitchNavigator = () => (
  <NavigationContainer>
    <AppStack.Navigator initialRouteName="Auth">
      <AppStack.Screen name="Auth" component={LoginScreen} />
      <AppStack.Screen name="App" component={HomeScreen} />
      <AppStack.Screen name="TaskList" component={TaskListScreen} />
      <AppStack.Screen name="AddTask" component={AddTaskScreen} />
      <AppStack.Screen name="Register" component={RegisterScreen} />
    </AppStack.Navigator>
  </NavigationContainer>
);

export default SwitchNavigator;
