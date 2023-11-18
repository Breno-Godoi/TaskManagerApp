// src/screens/RegisterScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { auth, firestore } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (!firstName || !lastName || !email || !password) {
        Alert.alert("All fields are required.");
        return;
      }

      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Set the display name for the user
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      const userData = {
        firstName,
        lastName,
        email,
      };

      // Explicitly reference the Firestore instance, the "users" collection, and the user's document
      const userDocRef = doc(firestore, "users", user.uid);

      await setDoc(userDocRef, userData);

      Alert.alert("User registered!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error registering user:", error);
      Alert.alert("Error registering user:", error.message);
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
      <Text style={styles.title}>Registration Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} color="#4364E6" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#4364E6",
  },
  input: {
    height: 45,
    borderColor: "#4364E6",
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
  },
});

export default RegisterScreen;
