// src/screens/AddTaskScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateString, setSelectedDateString] = useState("");

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedDateString(format(selectedDate, "yyyy-MM-dd HH:mm"));
    }
  };

  const saveTask = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.log("User not logged in");
        return;
      }

      const taskData = {
        title,
        details,
        date: serverTimestamp(),
        userId: user.uid,
      };

      const tasksCollection = collection(firestore, "tasks");

      // Use `addDoc` to automatically generate a unique ID for the new task
      await addDoc(tasksCollection, taskData);

      // Reset form fields
      setTitle("");
      setDetails("");
      setDate(new Date());
      setSelectedDateString("");

      // Navigate back to the home screen
      navigation.navigate("TaskList");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  useEffect(() => {
    // Set headerShown to false to hide the navigation header
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Back", // Change the header title to 'Back'
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4364E6",
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.inputTitle}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Task Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task details"
        value={details}
        onChangeText={setDetails}
        multiline={true}
      />

      <Text style={styles.label}>Task Date</Text>
      <View>
        <Button title="Pick a date" onPress={showDatePicker} color="#5A6591" />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {date && (
          <Text style={styles.selectedDateText}>
            Selected Date: {selectedDateString}
          </Text>
        )}
      </View>

      <Button title="Save Task" onPress={saveTask} color="#4364E6" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  label: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#4364E6",
  },

  inputTitle: {
    fontSize: 16,
    borderColor: "#4364E6",
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  input: {
    fontSize: 16,
    borderColor: "#4364E6",
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 100,
  },

  selectedDateText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    color: "#4364E6",
    textAlign: "center",
  },
});

export default AddTaskScreen;
