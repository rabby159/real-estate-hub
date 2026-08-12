const mongoose = require("mongoose");

const Inquiry = require("../models/Inquiry");
const Property = require("../models/Property");

// Create inquiry
const createInquiry = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      property,
      name,
      email,
      phone,
      message,
    } = req.body;

    // Validate required fields
    if (!property || !name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All inquiry fields are required",
      });
    }

    // Validate property ID
    if (!mongoose.Types.ObjectId.isValid(property)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    // Check property exists
    const propertyExists = await Property.findById(property);

    if (!propertyExists) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const inquiry = await Inquiry.create({
      user: userId,
      property,
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create inquiry",
      error: error.message,
    });
  }
};


// Get current customer's inquiries
const getMyInquiries = async (req, res) => {
  try {
    const userId = req.user.userId;

    const inquiries = await Inquiry.find({
      user: userId,
    })
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get inquiries",
      error: error.message,
    });
  }
};


// Get all inquiries - Admin only
const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate("user", "name email")
      .populate("property", "title price propertyType location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get all inquiries",
      error: error.message,
    });
  }
};


// Get single inquiry
const getInquiryById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID",
      });
    }

    const inquiry = await Inquiry.findById(id)
      .populate("property")
      .populate("user", "name email");

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    // Customer can only view their own inquiry
    if (
      req.user.role === "customer" &&
      inquiry.user._id.toString() !== userId
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get inquiry",
      error: error.message,
    });
  }
};


// Update inquiry status - Admin only
const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID",
      });
    }

    if (!["pending", "contacted", "closed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry status",
      });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry status updated successfully",
      data: inquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update inquiry status",
      error: error.message,
    });
  }
};


// Delete inquiry - Admin only
const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry ID",
      });
    }

    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete inquiry",
      error: error.message,
    });
  }
};


module.exports = {
  createInquiry,
  getMyInquiries,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
};