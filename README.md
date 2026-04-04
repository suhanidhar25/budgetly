# Budgetly 💸

A full-stack expense tracking web application built with **React, Node.js, Express, and MySQL**.
It helps users securely manage expenses, monitor spending habits, and view financial insights through a clean dashboard.

---

## 🚀 Features

* 🔐 JWT-based Authentication (Signup/Login)
* 💾 MySQL persistent storage
* ➕ Add and manage expenses
* 📊 Dashboard with analytics-ready UI
* 🔒 Protected API routes with middleware
* 🌐 Axios API layer with token interceptor
* 📱 Responsive fintech-style UI

---

## 🛠️ Tech Stack

### Frontend

* React + Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MySQL (`mysql2`)
* JWT
* bcryptjs
* dotenv

---

## 📂 Project Structure

```bash
budgetly/
├── backend/
│   ├── middleware/
│   ├── routes/
│   ├── db.js
│   └── server.js
└── frontend/
    ├── src/components/
    ├── src/pages/
    ├── src/api.js
    └── src/AuthContext.jsx
```

---

## ⚙️ Local Setup

### 1) Clone repo

```bash
git clone <your-repo-link>
cd budgetly
```

### 2) Backend setup

```bash
cd backend
npm install
```

Create `.env` using `.env.example`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=budgetly
DB_PORT=3306
JWT_SECRET=your_secret
PORT=5000
```

Run backend:

```bash
node server.js
```

### 3) Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🗄️ Database Setup

Create a MySQL database named:

```sql
CREATE DATABASE budgetly;
```

Create tables:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(100),
  amount DECIMAL(10,2),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🎯 Why This Project

This project demonstrates:

* full-stack CRUD architecture
* secure authentication flow
* protected REST APIs
* MySQL integration with connection pooling
* clean frontend state + API management
* production-style folder structure

---

## 👩‍💻 Author

**Suhani Dhar**

Built as part of internship-ready MERN/full-stack portfolio projects.
