const express = require("express");

const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const router = express.Router();

router.get("/", getProperties);
router.post("/", createProperty);

router.get("/:id", getPropertyById);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

module.exports = router;