const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const blogRoutes = require("./server/routes/blog");

// ✅ Hard-coded MongoDB Atlas URI
const MONGODB_URI =
  "mongodb+srv://patilvaish20:<your_password>@cluster0.soi1qup.mongodb.net/juiceblog?retryWrites=true&w=majority";

// ⬇️ Replace <your_password> with your actual password
const finalMongoURI = MONGODB_URI.replace("<your_password>", "your_actual_password");

// ✅ Connect to MongoDB
mongoose
  .connect(finalMongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
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
