// Import the necessary modules
const express = require("express");
const path = require("path");
const routes = require("./src/routes/userRoutes");
require("dotenv").config();
// Create an instance of an Express application
const app = express();
//const cors = require('cors');
//app.use(cors()); // Add this line in your server setup
const mongoose = require("mongoose");
const  auth  = require("./src/utilis/Jwt");
// Define the port number
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
//const authenticateJWT = require("./src/middleware/Authenticate");
app.use(cookieParser());

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);
// Route for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
mongoose
  .connect("mongodb://127.0.0.1:27017/userss", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Adjust the timeout period (in milliseconds)
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));




 
  // app.get("/mind",authenticateJWT,  (req, res) => {
  //   res.sendFile(path.join(__dirname, "public", "mind.html"));
  // });
// Route for the login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});


// Route for the registration page
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
  // res.send("hii")
});

// Handle form submissions (for demonstration purposes)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Handle login logic here (e.g., check credentials)
  res.send(`Login attempt: ${username}`);
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  // Handle registration logic here (e.g., save user data)
  res.send(`Registration attempt: ${username}`);
});
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "profile.html"));
});
// Handle 404 errors (when the route is not found)
app.use((req, res) => {
  res.status(404).send("404: Page not found");
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
