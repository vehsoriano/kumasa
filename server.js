const express = require("express");

const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

const root = require("path").join(__dirname, "client", "build");
app.use(express.static(root));

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/branch", require("./routes/api/branch"));
app.use("/api/item", require("./routes/api/item"));
app.use("/api/order", require("./routes/api/order"));

const PORT = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

app.listen(PORT, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});