const express = require("express");


const {
  loginAdmin,
  logoutAdmin,
  getDashboardStatistics,
} = require("../controllers/adminController");


const {
  requireAdminAuth,
} = require("../middleware/adminAuth");

const {
  getAdminRooms,
  getAdminRoom,
  createRoom,
  updateRoom,
  updateRoomAvailability,
  updateRoomStatus,
  deleteRoom,
} = require("../controllers/roomController");

const router = express.Router();

// ========================================
// Admin Login
// ========================================

router.post(
  "/login",
  loginAdmin
);


// ========================================
// Admin Logout
// ========================================

router.post(
  "/logout",
  logoutAdmin
);


// ========================================
// Admin Authentication Test
// ========================================

router.get(
  "/test-auth",
  requireAdminAuth,
  (req, res) => {
    return res.status(200).json({
      success: true,
      message:
        "Admin authentication successful.",
      data: {
        admin: req.admin,
      },
    });
  }
);

// ========================================
// Admin Dashboard
// ========================================

router.get(
  "/dashboard",
  requireAdminAuth,
  getDashboardStatistics
);

// ========================================
// Admin Room Management
// ========================================

// Get all rooms
router.get(
  "/rooms",
  requireAdminAuth,
  getAdminRooms
);

// Get one room
router.get(
  "/rooms/:id",
  requireAdminAuth,
  getAdminRoom
);

// Create room
router.post(
  "/rooms",
  requireAdminAuth,
  createRoom
);

// Update room
router.put(
  "/rooms/:id",
  requireAdminAuth,
  updateRoom
);

// Update room availability
router.patch(
  "/rooms/:id/availability",
  requireAdminAuth,
  updateRoomAvailability
);

// Update room status
router.patch(
  "/rooms/:id/status",
  requireAdminAuth,
  updateRoomStatus
);

// Delete room
router.delete(
  "/rooms/:id",
  requireAdminAuth,
  deleteRoom
);

module.exports = router;