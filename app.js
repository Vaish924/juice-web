const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const blogRoutes = require("./server/routes/blog");

// ✅ MongoDB Atlas connection URI
const MONGODB_URI =
  "mongodb+srv://patilvaish20:<your_password>@cluster0.soi1qup.mongodb.net/juiceblog?retryWrites=true&w=majority";

// 🟢 Replace <your_password> with your actual Atlas password:
const dbURI = MONGODB_URI.replace("<your_password>", "YourActualPasswordHere");

// ✅ Connect to MongoDB Atlas
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // exit if cannot connect
  });

// 📄 Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // for uploads
app.use(express.static(__dirname)); // to serve index.html, blog.css

// 📝 Set EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// 🌐 Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/blog", blogRoutes);

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
