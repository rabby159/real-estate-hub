const express = require("express");

const {
  createInquiry,
  getMyInquiries,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  deleteInquiry,
} = require("../controllers/inquiryController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Customer routes
router.post(
  "/",
  protect,
  authorize("customer"),
  createInquiry
);

router.get(
  "/my",
  protect,
  authorize("customer"),
  getMyInquiries
);

// Admin routes
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllInquiries
);

router.put(
  "/:id/status",
  protect,
  authorize("admin"),
  updateInquiryStatus
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteInquiry
);

// Customer + Admin
router.get(
  "/:id",
  protect,
  getInquiryById
);

module.exports = router;