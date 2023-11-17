// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { firestore } from '../../firebaseConfig';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Get a reference to the 'tasks' collection
        const tasksCollection = collection(firestore, 'tasks');

        // Retrieve the documents from the 'tasks' collection
        const querySnapshot = await getDocs(tasksCollection);

        // Convert the query snapshot to an array of tasks
        const tasksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Update the state with the fetched tasks
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    // Fetch tasks only once when the component mounts
    fetchTasks();
  }, []); // Empty dependency array to fetch tasks only once

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text>{item.title}</Text>
      {/* Add more details or actions as needed */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
});

export default HomeScreen;
