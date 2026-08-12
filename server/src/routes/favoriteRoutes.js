const express = require("express");

const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controllers/favoriteController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  authorize("customer"),
  getFavorites
);

router.post(
  "/:propertyId",
  protect,
  authorize("customer"),
  addFavorite
);

router.delete(
  "/:propertyId",
  protect,
  authorize("customer"),
  removeFavorite
);

module.exports = router;