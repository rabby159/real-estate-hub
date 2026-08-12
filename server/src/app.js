const express = require("express");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();

app.use(express.json());

app.use("/api/properties", propertyRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Real Estate Hub API is running",
  });
});

module.exports = app;