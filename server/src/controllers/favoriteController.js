const mongoose = require("mongoose");

const Favorite = require("../models/Favorite");
const Property = require("../models/Property");

// Add property to favorites
const addFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user.userId;

    // Validate property ID
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    // Check property exists
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      user: userId,
      property: propertyId,
    });

    if (existingFavorite) {
      return res.status(409).json({
        success: false,
        message: "Property is already in favorites",
      });
    }

    const favorite = await Favorite.create({
      user: userId,
      property: propertyId,
    });

    res.status(201).json({
      success: true,
      message: "Property added to favorites",
      data: favorite,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add favorite",
      error: error.message,
    });
  }
};


// Get current user's favorites
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;

    const favorites = await Favorite.find({
      user: userId,
    })
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get favorites",
      error: error.message,
    });
  }
};


// Remove property from favorites
const removeFavorite = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const favorite = await Favorite.findOneAndDelete({
      user: userId,
      property: propertyId,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Property is not in favorites",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property removed from favorites",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove favorite",
      error: error.message,
    });
  }
};


module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};