# Task Manager App

## Overview

Task Manager is a mobile application that helps users organize their tasks efficiently. It provides features for adding, editing, and deleting tasks, along with setting deadlines and sending task details via email and SMS.

## Technologies Used

- **Expo Calendar API:** Enables users to set deadlines and receive reminders.
- **Expo SecureStore:** Safely stores sensitive data, ensuring secure access.
- **Expo Mail Composer:** Allows users to send task details via email directly from the app.
- **Expo SMS APIs:** Facilitates sending task details via SMS.
- **Firebase Firestore:** Stores and retrieves user-specific task data securely.
- **Firebase Authentication:** Ensures secure user login and registration.

## Project Structure

```plaintext
/project-root
│
├── /src
│   ├── /screens
│   │   ├── AddTaskScreen.js
│   │   ├── EditTaskScreen.js
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── TaskDetailsScreen.js
│   │   └── TaskListScreen.js
│   ├── /navigation
│   │   └── AppNavigator.js
│   └── firebaseConfig.js
│
├── App.js
├── package.json
└── ...

## Key Features

User Authentication: Secure user login and registration with Firebase Authentication.

Task Management: Add, edit, and delete tasks with features such as setting deadlines and priority levels.

Deadline and Priority: Set deadlines for tasks and prioritize them based on urgency.

Data Storage: Utilize Firebase Firestore to securely store and retrieve user-specific task data.

Security: Enhance security by utilizing Expo SecureStore for the safe storage of sensitive data.

## To be Implemented
Priority Levels: Implement a system for users to categorize tasks based on priority levels.

Task Categories: Allow users to categorize tasks into different groups or categories for better organization.

Task Completion: Add a completion feature for the tasks aiming to maintain task history.

## Usage
Follow these steps to run the project locally:

Clone the repository.
Install dependencies with npm install.
Start the Expo development server with npm start.
Feel free to explore and contribute to make Task Manager even more effective for users!