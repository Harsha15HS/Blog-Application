📌 Blog Application (MERN Stack)
📖 Project Description

A full-stack blogging platform where users can register, login using JWT authentication, create, edit, delete, and view blog posts. The application supports pagination, search functionality, and comments. Only authenticated users can perform protected operations.

🚀 Features

User Registration & Login (JWT Authentication)

Create, Read, Update, Delete Blogs

My Blogs Section

Search Blogs

Pagination

Comment System

Protected Routes

Responsive UI

🛠 Tech Stack

Frontend:

React.js

Axios

React Router

CSS / Tailwind / Bootstrap

Backend:

Node.js

Express.js

MongoDB

Mongoose

JWT

bcrypt

📂 Database Schemas

User

name

email

password (hashed)

Blog

title

content

author (User reference)

createdAt

Comment

blogId

userId

text

createdAt

🔐 Authentication

JWT-based authentication

Token verification middleware

Protected CRUD operations

📦 Installation
Backend
npm install
npm start
Frontend
npm install
npm start
