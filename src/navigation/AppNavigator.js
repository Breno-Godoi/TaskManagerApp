// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskListScreen from '../screens/TaskListScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import EditTaskScreen from '../screens/EditTaskScreen';

// Create a stack navigator
const AppStack = createStackNavigator();

// Create the main switch navigator
const SwitchNavigator = () => (
  <NavigationContainer>
    <AppStack.Navigator initialRouteName="Auth">
      <AppStack.Screen name="Auth" component={LoginScreen} />
      <AppStack.Screen name="TaskList" component={TaskListScreen} />
      <AppStack.Screen name="AddTask" component={AddTaskScreen} />
      <AppStack.Screen name="Register" component={RegisterScreen} />
      <AppStack.Screen name="TaskDetails" component={TaskDetailsScreen} />
      <AppStack.Screen name="EditTask" component={EditTaskScreen} />
    </AppStack.Navigator>
  </NavigationContainer>
);

export default SwitchNavigator;
