const express = require("express");

const {
  createBooking,
} = require("../controllers/bookingController");

const router =
  express.Router();

// ========================================
// PUBLIC BOOKING
// ========================================

// POST /api/bookings
//
// Creates a booking request.
//
// Booking flow:
//
// Guest
//   ↓
// Booking Form
//   ↓
// POST /api/bookings
//   ↓
// Validate booking
//   ↓
// Save booking to MySQL
//   ↓
// Send booking notification to hotel email
//
// IMPORTANT:
//
// This route does NOT decrease
// rooms.available.
//
// Room availability is controlled
// manually from the Admin Rooms page.

router.post(
  "/",
  createBooking
);

// ========================================
// Exports
// ========================================

module.exports = router;

