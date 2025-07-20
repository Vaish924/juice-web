const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config(); // <-- for local `.env` support

const app = express();
const blogRoutes = require("./server/routes/blog");

// ✅ Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // for uploads
app.use(express.static(__dirname)); // to serve index.html, blog.css

// Set EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/blog", blogRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
