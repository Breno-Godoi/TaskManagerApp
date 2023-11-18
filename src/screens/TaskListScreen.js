// src/screens/TaskListScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const tasksCollection = collection(firestore, "tasks");
      const userTasksQuery = query(
        tasksCollection,
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(userTasksQuery);

      const tasksData = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() });
      });

      setTasks(tasksData);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("Fetching tasks...");
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const tasksCollection = collection(firestore, "tasks");
        const userTasksQuery = query(
          tasksCollection,
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(userTasksQuery);

        const tasksData = [];
        querySnapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, ...doc.data() });
        });

        setTasks(tasksData);
        console.log("Tasks Data:", tasksData);
      }
    };

    fetchTasks();
  }, []);

  // Use the useFocusEffect hook to fetch tasks when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  const handleTaskPress = (taskId) => {
    // Navigate to TaskDetailScreen with taskId as a parameter
    navigation.navigate("TaskDetail", { taskId });
  };

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <Text>No tasks found.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(task) => task.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("TaskDetails", { task: item })}
            >
              <View style={styles.taskContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.details}</Text>
                <Text style={styles.date}>
                  Date: {item.date.toDate().toLocaleString()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Add the button to navigate to AddTaskScreen */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  taskContainer: {
    marginBottom: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  addButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default TaskListScreen;
