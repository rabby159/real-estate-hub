const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    propertyType: {
      type: String,
      required: true,
      enum: ["Apartment", "House", "Villa", "Land", "Commercial"],
    },

    purpose: {
      type: String,
      required: true,
      enum: ["Sale", "Rent"],
    },

    location: {
      city: {
        type: String,
        required: true,
      },

      area: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
    },

    bedrooms: {
      type: Number,
      default: 0,
    },

    bathrooms: {
      type: Number,
      default: 0,
    },

    area: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    amenities: {
      type: [String],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["available", "sold", "rented"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);