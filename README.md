# Subscription Management API

A RESTful API for user authentication, subscription plans, and user subscriptions built with Node.js, Express, and MongoDB.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Installation & Setup](#installation--setup)  
- [Environment Variables](#environment-variables)  
- [Running the Server](#running-the-server)  
- [API Endpoints](#api-endpoints)  
  - [User Routes](#user-routes)  
  - [Plan Routes](#plan-routes)  
  - [Subscription Routes](#subscription-routes)  
- [Data Models](#data-models)  
- [Authentication Flow](#authentication-flow)  
- [License](#license)  
- [Author](#author)  

---

## Features

- User registration, login, logout, token refresh  
- Email verification & OTP via Gmail  
- Password recovery and change  
- CRUD operations for subscription plans  
- Manage user subscriptions (status, start/end dates)  
- Upload profile images using Cloudinary  
- JWT-based secure authentication  
- Proper error handling & validation  

---

## Tech Stack

- Node.js + Express  
- MongoDB + Mongoose  
- JWT (jsonwebtoken)  
- Nodemailer for emails  
- Multer for file uploads  
- Cloudinary for image storage  

---

## Prerequisites

- Node.js (v16 or higher)  
- npm or yarn  
- MongoDB instance (local or cloud)  
- Cloudinary account  
- Gmail account with App Password enabled  

---

## 🛠️ Environment Variables

Create a `.env` file at the root with the following:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
CORS_ORIGIN=http://localhost:3000
