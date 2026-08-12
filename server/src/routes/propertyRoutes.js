const express = require("express");

const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getProperties);
router.get("/:id", getPropertyById);

// Admin-only routes
router.post(
  "/",
  protect,
  authorize("admin"),
  createProperty
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateProperty
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteProperty
);

module.exports = router;