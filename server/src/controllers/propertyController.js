const Property = require("../models/Property");
const mongoose = require("mongoose");

// Get all properties
const getProperties = async (req, res) => {
  try {
    const {
      search,
      city,
      area,
      propertyType,
      purpose,
      minPrice,
      maxPrice,
      bedrooms,
      status,
      featured,
      page = 1,
      limit = 12,
      sort = "newest",
    } = req.query;

    const filter = {};

    // Search by title or description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Location filters
    if (city) {
      filter["location.city"] = {
        $regex: city,
        $options: "i",
      };
    }

    if (area) {
      filter["location.area"] = {
        $regex: area,
        $options: "i",
      };
    }

    // Property filters
    if (propertyType) {
      filter.propertyType = propertyType;
    }

    if (purpose) {
      filter.purpose = purpose;
    }

    if (status) {
      filter.status = status;
    }

    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    // Bedrooms
    if (bedrooms) {
      filter.bedrooms = Number(bedrooms);
    }

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    // Pagination
    const currentPage = Math.max(Number(page), 1);
    const itemsPerPage = Math.min(Math.max(Number(limit), 1), 50);
    const skip = (currentPage - 1) * itemsPerPage;

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "price-low":
        sortOption = { price: 1 };
        break;

      case "price-high":
        sortOption = { price: -1 };
        break;

      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      case "newest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    // Get total matching properties
    const total = await Property.countDocuments(filter);

    // Get paginated properties
    const properties = await Property.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(itemsPerPage);

    const totalPages = Math.ceil(total / itemsPerPage);

    res.status(200).json({
      success: true,
      count: properties.length,
      pagination: {
        total,
        page: currentPage,
        limit: itemsPerPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

// Get single property
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch property",
      error: error.message,
    });
  }
};

// Create property
const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create property",
      error: error.message,
    });
  }
};

// Update property
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update property",
      error: error.message,
    });
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
      data: property,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete property",
      error: error.message,
    });
  }
};

const compareProperties = async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({
        success: false,
        message: "Property IDs are required",
      });
    }

    const propertyIds = ids.split(",").filter(Boolean);

    // Maximum 3 properties
    if (propertyIds.length < 2 || propertyIds.length > 3) {
      return res.status(400).json({
        success: false,
        message: "You can compare between 2 and 3 properties",
      });
    }

    // Validate MongoDB IDs
    const invalidId = propertyIds.some(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );

    if (invalidId) {
      return res.status(400).json({
        success: false,
        message: "One or more property IDs are invalid",
      });
    }

    const properties = await Property.find({
      _id: { $in: propertyIds },
    });

    if (properties.length !== propertyIds.length) {
      return res.status(404).json({
        success: false,
        message: "One or more properties were not found",
      });
    }

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to compare properties",
      error: error.message,
    });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  compareProperties,
};