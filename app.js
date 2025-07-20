const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// ✅ Load .env only in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
const blogRoutes = require("./server/routes/blog");

// ✅ Check MongoDB URI
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined. Please set it in Render or .env file.");
  process.exit(1); // stop server
}

// ✅ Connect to MongoDB
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

// 🔷 Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // for static assets (like uploads, css, js)

// 🔷 Set EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🔷 Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/blog", blogRoutes);

// 🔷 Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
