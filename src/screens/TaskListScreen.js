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

  // Using the useFocusEffect hook to fetch tasks when the screen is focused (loaded)
  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  const handleBackToLoginPress = () => {
    navigation.navigate("Auth");
  };

  useEffect(() => {
    // Set headerShown to false to hide the navigation header
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Tasks</Text>
      {tasks.length === 0 ? (
        <Text style={styles.text}>No tasks found.</Text>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddTask")}
        >
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backToLoginButton}
          onPress={handleBackToLoginPress}
        >
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
    color: "#4364E6",
    textAlign: "center",
    textDecorationLine: "underline",
  },

  taskContainer: {
    marginBottom: 0,
    marginTop: 25,
    borderColor: "#4364E6",
    backgroundColor: "#4364E6",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginLeft: 16,
    marginRight: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
    textAlign: "center",
  },

  description: {
    fontSize: 16,
    marginBottom: 8,
    color: "#fff",
    textAlign: "center",
  },

  date: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },

  text: {
    fontSize: 14,
    color: "#4364E6",
    marginBottom: 20,
    marginTop: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  addButton: {
    backgroundColor: "#4364E6",
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#fff",
    flex: 1,
    marginRight: 8,
  },

  backToLoginButton: {
    backgroundColor: "#FF4A45",
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#fff",
    flex: 1,
    marginLeft: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TaskListScreen;
