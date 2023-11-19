// src/screens/LoginScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Alert, Image, StyleSheet } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as SecureStore from "expo-secure-store";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      // Save the user's email securely
      await SecureStore.setItemAsync("userEmail", email);

      navigation.navigate("TaskList");
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Authentication Failed", "Invalid email or password.");
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate("Register");
  };

  useEffect(() => {
    // Set headerShown to false to hide the navigation header
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Task Manager</Text>
      <Image
        source={require('../images/check-list.png')}
        style={styles.image}
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
      <Button title="   Login   " color="#4364E6" onPress={handleLogin}/>
      <Text style={styles.text}>Or</Text>
      <Button
        title="Register"
        onPress={handleNavigateToRegister}
        color="#4364E6"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 60,
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
  },

  image: {
    width: 180,
    height: 180,
    marginBottom: 30,
    
  },

  title: {
    fontSize: 30,
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#4364E6",
  },

  text: {
    fontSize: 15,
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center",
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
    width: '80%',
  },

});

export default LoginScreen;
