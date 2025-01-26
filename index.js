const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory database for demo purposes
let users = [];

// Route to register a user
app.post("/register", (req, res) => {
  const { name, age, username, password } = req.body;

  if (!name || !age || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Save user data
  users.push({ name, age, username, password });
  res.status(201).json({ message: "User registered successfully" });
});

// Route to login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate input
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  res.status(200).json({ message: "Login successful", certificates: [
    {
      name: "Birth Certificate",
      link: "https://docs.google.com/document/d/1WZNwOLENnyUvPC03rs_JffnKgZe_LYYiOZdDUSiXgn0/edit?usp=drive_link"
    },
    {
      name: "SSLC Certificate",
      link: "https://docs.google.com/document/d/1y__XwI307BoBFzZ7KopHzFMEtycFFE1RKku8y0uUSRY/edit?usp=drive_link"
    },
    {
      name: "Income Certificate",
      link: "https://docs.google.com/document/d/1PyC0gErfYDlx9wJgKekta2yolds7lNzeotdVy6KFEXc/edit?usp=drive_link"
    }
  ] });
});

// Start the server
app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});