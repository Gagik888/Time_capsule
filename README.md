# Time Capsule Application

## Overview
The Time Capsule application allows users to create digital time capsules that can store memories and financial snapshots to be opened at a later date. Users can input a title, upload files (images and videos), write a text note, and select a duration for when the capsule will be opened. The application is designed to be simple and user-friendly, making it accessible for all users.

## Project Structure
```
time-capsule-app
├── index.html        # Main HTML document for the application
├── style.css         # Styles for the application
├── script.js         # JavaScript functionality for the application
└── README.md         # Documentation for the project
```

## Setup and Usage
1. **Clone the Repository**
   - Clone this repository to your local machine using:
     ```
     git clone <repository-url>
     ```

2. **Open the Application**
   - Navigate to the project directory and open `index.html` in your web browser.

3. **Creating a Capsule**
   - Fill in the title, upload files, write a note, and select a duration for your capsule.
   - Click the "Create Capsule" button to save your capsule.

4. **Viewing Capsules**
   - Your created capsules will be displayed in the "Your Capsules" section.
   - Capsules will automatically open after the specified duration, displaying their contents.

5. **Deleting Test Capsule**
   - If you created a test capsule (1-minute duration), you can delete it using the "Delete 1-min Test" button.

## Core Functionality
- **createCapsule**: Handles the creation of a new time capsule, including file uploads, title, and duration selection.
- **openCapsule**: Displays the contents of a time capsule when the timer expires.
- **deleteTestCapsule**: Deletes the test capsule created for the 1-minute timer.
- **saveToLocalStorage**: Saves the capsule data to LocalStorage.
- **loadFromLocalStorage**: Loads existing capsules from LocalStorage.
- **setTimer**: Sets a timer based on the selected duration and triggers the opening of the capsule.
- **showNotification**: Displays a notification when a capsule is ready to be opened.

## Styling
The application uses CSS for styling, which includes:
- A responsive layout using flexbox.
- A modal for displaying opened capsules.
- Clean and modern UI for buttons and form elements.

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript

## License
This project is open-source and available for anyone to use and modify.
