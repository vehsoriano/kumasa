const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
// const path = require('path');
const fileUpload = require("express-fileupload");

const app = express();
app.use(cors());
app.use(fileUpload());

// Connect Database
connectDB();

// ... other app.use middleware
// app.use(express.static(path.join(__dirname, "client", "build")))

const root = require("path").join(__dirname, "client", "build");
app.use(express.static(root));

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

// Define Routes
// Admin Routes

// Port
const PORT = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
