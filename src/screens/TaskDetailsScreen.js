// src/screens/TaskDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TaskDetailsScreen = ({ route, navigation }) => {
  const { params } = route;
  const task = params ? params.task : null;

  if (!task) {
    // Handle the case where task is not defined
    return (
      <View>
        <Text>Error: Task not found</Text>
      </View>
    );
  }

  const handleEditPress = () => {
    // Navigate to the screen where you can edit the task (you need to create this screen)
    // Pass the task details to the edit screen
    navigation.navigate('EditTask', { taskId: task.id });
  };

  const handleDeletePress = () => {
    // Implement the logic to delete the task here
    // After deleting, navigate back to the task list
    // For now, let's just log a message
    console.log('Task deleted');
    // You might want to refresh the task list here, or use a state management solution
    // to update the list without navigating back
    navigation.navigate('TaskList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.details}</Text>
      <Text style={styles.date}>Date: {task.date.toDate().toLocaleString()}</Text>

      <TouchableOpacity style={styles.button} onPress={handleEditPress}>
        <Text style={styles.buttonText}>Edit Task</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDelete} onPress={handleDeletePress}>
        <Text style={styles.buttonText}>Delete Task</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TaskList')}>
        <Text style={styles.buttonText}>Back to Task List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 8,
  },

  buttonDelete: {
    backgroundColor: 'black',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 25,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default TaskDetailsScreen;
