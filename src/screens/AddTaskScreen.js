// src/screens/AddTaskScreen.js
import React, { useState, useEffect, useReducer, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

const AddTaskScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDateString, setSelectedDateString] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    if (selectedDate) {
      setDate(selectedDate);
      setSelectedDateString(format(selectedDate, "yyyy-MM-dd HH:mm"));
    }
  };

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
      />

      <Text style={styles.label}>Task Date</Text>
      <View>
        <Button title="Pick a date" onPress={showDatePicker} />
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

      <Button title="Save Task" onPress={() => console.log('Save Task')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  label: {
    fontSize: 18,
    marginBottom: 8,
  },

  inputTitle: {
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  input: {
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 100,
  },

  selectedDateText: {
    marginTop: 20, // Add space at the top
    marginBottom: 20,
    fontSize: 20, // Increase font size
    color: 'blue',
    textAlign: 'center', // Center the text horizontally
  },
});

export default AddTaskScreen;
