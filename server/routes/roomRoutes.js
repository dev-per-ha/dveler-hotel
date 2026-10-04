
const express = require("express");

const {
  getRooms,
  getRoom,
} = require("../controllers/roomController");

const router = express.Router();

// ========================================
// GET /api/rooms
// Get all public rooms
// ========================================

router.get(
  "/",
  getRooms
);

// ========================================
// GET /api/rooms/:id
// Get one public room
// ========================================

router.get(
  "/:id",
  getRoom
);

// ========================================
// Exports
// ========================================

module.exports = router;

