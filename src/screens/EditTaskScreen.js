// src/screens/EditTaskScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditTaskScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    // Fetch the task details based on the ID passed through navigation params
    const fetchTaskDetails = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const taskId = route.params.taskId;
        const taskDocRef = doc(firestore, "tasks", taskId);
        const taskDocSnapshot = await getDoc(taskDocRef);

        if (taskDocSnapshot.exists()) {
          const taskData = taskDocSnapshot.data();
          setTitle(taskData.title);
          setDetails(taskData.details);
          setDate(taskData.date.toDate());
        }
      }
    };

    fetchTaskDetails();
  }, [route.params.taskId]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (selectedDate) => {
    hideDatePicker();
    setDate(selectedDate);
  };

  const handleUpdateTask = async () => {
    // Update the task with new details
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const taskId = route.params.taskId;
      const taskDocRef = doc(firestore, "tasks", taskId);

      await updateDoc(taskDocRef, {
        title,
        details,
        date: Timestamp.fromDate(new Date(date)),
        // You may want to convert the date back to a valid Firestore timestamp
        // based on your data structure
        // date: firestore.Timestamp.fromDate(new Date(date)),
      });

      // Navigate back to the task list screen
      navigation.navigate("TaskList");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Details"
        value={details}
        onChangeText={(text) => setDetails(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date.toLocaleString()}
        onTouchStart={showDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <Button title="Update Task" onPress={handleUpdateTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default EditTaskScreen;
