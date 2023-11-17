Project Details: Task Manager App

Use Case:

Create a task management application where users can add, edit, and delete tasks. Include features such as setting deadlines, priority levels, and categorizing tasks.

APIs and Technologies:

Expo Calendar API for setting deadlines and reminders.
Expo SecureStore for storing sensitive data securely.
Firebase Firestore for storing user-specific task data.
Firebase Authentication for user authentication.

Folder Structure:

src/screens: Contains the different screens of the application.
src/navigation: Manages the navigation flow of the app.
src/firebaseConfig.js: Manages the Firebase configuration.

Key Features:

User Authentication: Use Firebase Authentication for user login and registration.
Task Management: Allow users to add, edit, and delete tasks.
Deadline and Priority: Implement features for setting deadlines and priority levels for tasks.
Data Storage: Use Firebase Firestore for storing and retrieving user-specific task data.
Security: Utilize Expo SecureStore for securely storing sensitive data.

Steps Completed So Far:

Project Initialization: Created a new React Native project using Expo.
Navigation Setup: Configured the navigation structure using React Navigation.
Screens Creation: Developed screens for Home, AddTask, TaskDetail, SignIn, and SignUp.
Firebase Integration: Integrated Firebase with the project using firebaseConfig.js.
Authentication API: Implemented Firebase Authentication for user login and registration.

Next Steps:

Refactor Home.js based on the provided MainScreen.js.
Remove or refactor the index.js file as needed.
Review and adjust the file structure if necessary.
Continue with the implementation of task management features using Firebase Firestore.
Address any errors or issues encountered during development.