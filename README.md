Project Details: Task Manager App

Use Case:

Create a task management application where users can add, edit, and delete tasks. Include features such as setting deadlines and sending task details via email and SMS.

APIs and Technologies:

Expo Calendar API for setting deadlines and reminders.
Expo SecureStore for storing sensitive data securely.
Expo Mail Composer for sending task details via email.
Expo SMS APIs for sending details via SMS.
Firebase Firestore for storing user-specific task data.
Firebase Authentication for user authentication.

Folder Structure:

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
Key Features:

User Authentication: Utilize Firebase Authentication for secure user login and registration.

Task Management: Enable users to add, edit, and delete tasks with features like setting deadlines and priority levels.

Deadline and Priority: Implement functionalities for users to set deadlines and prioritize tasks.

Data Storage: Utilize Firebase Firestore to securely store and retrieve user-specific task data.

Security: Enhance security by utilizing Expo SecureStore for the secure storage of sensitive data.


Steps Completed So Far:

Project Initialization: Created a new React Native project using Expo.

Navigation Setup: Configured the navigation structure using React Navigation.

Screens Creation: Developed screens for Home, AddTask, TaskDetail, SignIn, and SignUp.

Firebase Integration: Integrated Firebase with the project using firebaseConfig.js.

Authentication API: Implemented Firebase Authentication for user login and registration.


Next Steps:

Refactor Home.js: Based on the provided MainScreen.js, update the Home.js screen for improved functionality.

Remove or Refactor index.js: Assess the need for the index.js file and refactor or remove it accordingly.

Review and Adjust File Structure: Ensure the file structure is optimal; make adjustments as necessary.

Continue Implementation: Progress with the implementation of task management features using Firebase Firestore.

Error Handling: Address any errors or issues encountered during development for a smooth user experience.