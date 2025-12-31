# Employee Management System

A full-stack Employee Management System built using **Spring Boot** and **React (Vite)**.  
This application provides secure role-based authentication, an admin dashboard, and complete employee management functionality with a modern UI supporting dark and light modes.

---

## 🚀 Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Hibernate / JPA
- MySQL

### Frontend
- React (Vite)
- Axios
- CSS / Tailwind (if used)
- Responsive UI with Dark & Light mode

### Tools
- Git & GitHub
- Postman
- Maven
- VS Code

---

## ✨ Features

- Role-based authentication (Admin / Employee)
- Secure login using JWT
- Admin dashboard with statistics
- Employee CRUD operations (Create, Read, Update, Delete)
- Protected routes based on roles
- Modern UI with dark & light theme
- Clean and scalable project structure

---

## 📂 Project Structure

employee-management-system
│
├── ems-backend
│ ├── src
│ ├── pom.xml
│ └── Spring Boot backend
│
├── ems-frontend
│ ├── src
│ ├── package.json
│ ├── vite.config.js
│ └── React frontend
│
└── README.md


---

## ▶️ How to Run the Project

### 1️⃣ Backend (Spring Boot)

Import ems-backend in Spring tool suite, select the root and click on run as spring boot app.
(File > Import > Maven > Existing Maven Projects > select ems-backend)

Backend will start on:
http://localhost:9090

### 1️⃣ Frontend (React)
cd ems-frontend
npm install
npm run dev


Frontend will start on:

http://localhost:5173

🔑 Default Admin Credentials

(Admin is auto-created at application startup)

Email: admin@ems.com
Password: Admin@123


🔐 Security Implementation

JWT-based authentication

Role-based authorization

Protected backend APIs

Secure frontend routing

📌 Future Enhancements

Forgot password functionality

Multiple admin creation

Pagination and search

Email notifications

Deployment (Docker / Cloud)

👨‍💻 Developed By

Mani Simhadri
Full Stack Java Developer
