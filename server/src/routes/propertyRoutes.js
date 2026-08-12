const express = require("express");

const {
  getProperties,
  getPropertyById,
  createProperty,
} = require("../controllers/propertyController");

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.post("/", createProperty);

module.exports = router;