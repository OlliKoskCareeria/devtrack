# DevTrack

DevTrack is a full-stack project and task management application built with **Spring Boot** and **React**.
It allows users to create projects, manage tasks, track progress, and monitor deadlines with status updates.

🌐 Live Demo

Frontend: https://devtrack210426.netlify.app/

Backend: https://devtrack190426.onrender.com

⚠️ Note: The backend is hosted on a free tier on Render and may take ~20–30 seconds to respond on first request due to cold start.
---

## 🚀 Features

### 📁 Project Management

* Create, update, and delete projects
* Optional project deadlines
* Edit project details (name, description, deadline)
* Visual status indicators based on deadlines:

  * 🟢 **ON TRACK**
  * 🟠 **AT RISK**
  * 🔴 **LATE**
  * ⚪ **NO DEADLINE**

---

### ✅ Task Management

* Create tasks within projects
* Delete tasks
* Update task status (e.g., TODO → IN PROGRESS → DONE)
* View tasks filtered by selected project

---

### 🧠 Smart Features

* Project status calculation based on deadlines
* Global exception handling for consistent API responses
* Backend validation for input data

---

### 🎨 Frontend

* Built with React (functional components + hooks)
* Component-based architecture
* Responsive layout with clean UI
* Visual feedback for selected projects and task status
* Inline editing for projects

---

## 🛠 Tech Stack

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* Maven

### Frontend

* React
* JavaScript (ES6+)
* CSS

---
⚙️ Local Setup Notes

💡 For quick evaluation, use the live demo above.
Local setup is optional and described below.

Frontend Environment Setup

Create a .env file inside the frontend folder:
content: REACT_APP_API_URL=YOUR_BACKEND_URL

⚠️ CORS Configuration (Local Development)

The backend is configured to allow requests from the deployed frontend.

If running the frontend locally, you may need to allow your local development origin in the backend CORS configuration, for example:

http://localhost:3000

Note: The port may vary depending on your development setup.


## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/OlliKoskCareeria/devtrack.git
cd devtrack
```

---

### 2. Backend setup

Make sure you have Java 17+ installed.

Run the backend using the Maven wrapper:

Windows (cmd):
mvnw.cmd spring-boot:run

Windows (PowerShell, Git Bash, WSL):
./mvnw spring-boot:run

Mac/Linux:
./mvnw spring-boot:run

---

🗄️ Database Options

By default, the application uses an H2 in-memory database:

No setup required
Data resets on restart
Ideal for quick testing and demo purposes
🔧 Optional: PostgreSQL (Local Development)

For a more production-like setup, you can configure PostgreSQL locally.

see application.properties.example and set up application.properties with your PostgreSQL credentials

Note: PostgreSQL is optional and not required to run the project
### 3. Frontend setup

```bash
cd frontend
npm install
npm start
```

---

## 🔌 API Overview

| Method | Endpoint                 | Description        |
| ------ | ------------------------ | ------------------ |
| GET    | `/api/projects`          | Get all projects   |
| POST   | `/api/projects`          | Create project     |
| PUT    | `/api/projects/{id}`     | Update project     |
| DELETE | `/api/projects/{id}`     | Delete project     |
| GET    | `/api/tasks`             | Get all tasks      |
| POST   | `/api/tasks/{projectId}` | Create task        |
| PATCH  | `/api/tasks/{id}/status` | Update task status |
| DELETE | `/api/tasks/{id}`        | Delete task        |

---

## 🧩 Project Structure

```text
devtrack/
  backend/    # Spring Boot API
  frontend/   # React application
```

---

## 📌 Future Improvements

* User authentication & authorization
* Assign users to projects
* Subtasks and task hierarchy
* Improved UI/UX (modals, animations)
* Deployment to cloud services

---

## 📄 License

This project is licensed under the MIT License.

---

## 💬 About

This project was built as a full-stack portfolio project to implement backend development with Spring Boot and frontend development with React, focusing on clean architecture, API design, and user interface implementation.

🚀 Deployment Notes

🌐 Backend Hosting

The backend is deployed on Render.

Hosted on: Render
Auto-deploys on every push to the main branch
Built using Docker + Spring Boot

💤 Cold Start Behavior

Runs on a free tier, it may enter an idle state when not in use.

First request after inactivity may take ~20–30 seconds
This delay is due to the server “waking up” from sleep
Subsequent requests are fast and responsive

🗄️ Database Configuration

The application uses an H2 in-memory database for testing the UI behaviour.
No external database setup required
Data is stored only during runtime(resets on restart or redeploy)
Schema is recreated on each restart

⚠️ Important Limitations

Because of the current setup:
Suitable for demo / portfolio purposes only
Not intended for production use

💡 Architecture Overview

Frontend: React (local development / deployable separately)
Backend: Spring Boot REST API
Database: H2 (in-memory)
Hosting: Render (backend)
