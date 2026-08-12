const express = require("express");

const propertyRoutes = require("./routes/propertyRoutes");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

app.use(express.json());

app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Real Estate Hub API is running",
  });
});

app.get("/api/auth/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authentication successful",
    user: req.user,
  });
});

module.exports = app;