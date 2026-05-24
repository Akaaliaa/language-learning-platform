# Language Learning Platform

A full-stack web application for vocabulary learning using lesson-based content and automatically generated quizzes.

---

# Features

- User registration and login
- JWT authentication
- Lesson-based vocabulary learning
- Automatic quiz generation
- Admin panel for lesson management
- Admin panel for vocabulary management
- SQLite database integration
- Modern responsive interface

---

# Technologies Used

- React.js
- Node.js
- Express.js
- SQLite3
- JavaScript
- HTML5
- CSS3
- Vite
- REST API
- JWT Authentication

---

# Project Structure

```bash
frontend/
backend/
```

The frontend folder contains the React user interface of the application.

The backend folder contains the Express.js server, REST API endpoints, and SQLite database connection.

---

# How to Run the Project

Before running the project, Node.js must be installed on the computer.

## 1. Run Backend Server

Open terminal inside the backend folder and run:

```bash
npm install
node server.js
```

The backend server will start on port 5000.

---

## 2. Run Frontend Application

Open another terminal inside the frontend folder and run:

```bash
npm install
npm run dev
```

After running the command, open the local Vite address shown in the terminal, usually:

```bash
http://localhost:5173
```

---

# Database

The project uses SQLite database for storing:

- Users
- Lessons
- Vocabulary

The database file is stored inside the backend/data folder.

---

# Quiz System

The quiz system generates questions automatically using vocabulary stored in the database.

Questions are dynamically created based on the selected lesson and vocabulary content.

---

# Future Improvements

Possible future improvements:

- Pronunciation support
- User progress tracking
- Multiple language support
- Custom quiz questions
- Advanced learning statistics

---

# Author

Bugrahan Arik
