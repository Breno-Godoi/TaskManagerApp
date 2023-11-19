// src/screens/TaskDetailsScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { deleteDoc, doc } from "firebase/firestore";
import { Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import * as SMS from 'expo-sms';
import { firestore } from "../../firebaseConfig";

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
    // Navigate to the edit task screen
    // Pass the task details to the edit screen
    navigation.navigate("EditTask", { taskId: task.id });
  };

  const handleDeletePress = async () => {
    // Display an alert before deleting the task
    Alert.alert(
      "Are you sure?",
      "This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const taskId = task.id;
              const taskDocRef = doc(firestore, "tasks", taskId);

              // Delete the task from Firestore
              await deleteDoc(taskDocRef);

              // Log a message (you can remove this line in the final version)
              console.log("Task deleted successfully");

              // Navigate back to the task list
              navigation.navigate("TaskList");
            } catch (error) {
              // Handle errors (e.g., display an error message)
              console.error("Error deleting task:", error.message);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleSendEmail = () => {
    const subject = 'Task Details';
    const body = `Title: ${task.title}\nDetails: ${task.details}\nDue Date: ${task.date.toDate().toLocaleString()}`;

    MailComposer.composeAsync({
      recipients: ['recipient@example.com'],
      subject,
      body,
    });
  };

  const handleSendSMS = () => {
    const message = `Title: ${task.title}\nDetails: ${task.details}\nDue Date: ${task.date.toDate().toLocaleString()}`;

    SMS.sendSMSAsync([], message);
  };

  useEffect(() => {
    // Set headerShown to false to hide the navigation header
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.details}</Text>
        <Text style={styles.date}>
          Due Date: {task.date.toDate().toLocaleString()}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEditPress}>
          <Text style={styles.buttonText}>Edit Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={handleDeletePress}
        >
          <Text style={styles.buttonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.emailButton} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>Send by Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smsButton} onPress={handleSendSMS}>
          <Text style={styles.buttonText}>Send by SMS</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backbutton}
        onPress={() => navigation.navigate("TaskList")}
      >
        <Text style={styles.buttonText}>Back to Task List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 25,
  },

  box: {
    backgroundColor: "#C9D2FF",
    padding: 16,
    borderRadius: 10,
    borderColor: "#4364E6",
    marginBottom: 16,
    width: "100%",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#4364E6",
    textAlign: "center",
  },

  description: {
    fontSize: 20,
    marginBottom: 16,
    color: "#4364E6",
    textAlign: "center",
  },

  date: {
    fontSize: 20,
    color: "#4364E6",
    marginBottom: 24,
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  button: {
    backgroundColor: "#4364E6",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
    marginRight: 4,
  },

  buttonDelete: {
    backgroundColor: "#FF4A45",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
    marginLeft: 4,
  },

  backbutton: {
    backgroundColor: "#4364E6",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 8,
    width: '100%',
  },

  emailButton: {
    backgroundColor: "#5A6591",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
    marginRight: 4,
  },

  smsButton: {
    backgroundColor: "#E6BB43",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
    flex: 1,
    marginLeft: 4,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default TaskDetailsScreen;
