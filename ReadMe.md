# Book Management System
# Overview
The Book Management System is a web application designed to manage a collection of books. This project allows users to add, update, delete, and retrieve books efficiently.

# Getting Started
# Prerequisites
Node.js installed on your machine
MongoDB instance up and running
# Installation Steps

- npm init to create a package.json file
- npm i express to use express
- installed nodemon as a Dev dependency to help restart my server when changes are detected
-  Create an env file containing your database Uri and JWT Secret. It should be in this format: `MONGO_URI2 = mongodb://127.m0.0.1:27017/rezStore` and `JWT_SECRET = abctrjbn4789nnfjkkb`
- make sure  DB is up and running
- npm start to start server
- npm run dev -This command runs the server in development mode, automatically restarting it on file change



# Connecting to MongoDB
To connect your application to a MongoDB database, follow these steps:

- Install Dependencies: Ensure you have mongoose installed, which is an ODM (Object Data Modeling) library for MongoDB    and  Node.js. You can install it using npm:
- npm install mongoose
-  Create a .env file in the root of your project to store your database connection string securely . 
 - Create a folder called config with your db.js file in it
 - create a function to connect your database using mongose.connect and access your MONGO_URI from your env file using process.env.MONGO-URI
 - export the function and call the function in your server.js where all server connections occur.
 - npm run dev to start the server  

# project Structure


├── views/                # Contains EJS templates
│   └── welcomeEmail.ejs  # Template for the welcome email
├── routes/               # API route handlers
├── models/               # Mongoose models
├── controllers/          # Business logic for routes
├── middleware/           # Middleware functions (e.g., authentication)
├── utils/                # Utility functions (e.g., for sending emails)
├── app.js                # Main application file to configure middleware and routes
└── server.js             # Main entry point to start the server
