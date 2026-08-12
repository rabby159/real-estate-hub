const express = require("express");
router.get("/compare", compareProperties);

const {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  compareProperties,
} = require("../controllers/propertyController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getProperties);
router.get("/:id", getPropertyById);
router.get("/compare", compareProperties);

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