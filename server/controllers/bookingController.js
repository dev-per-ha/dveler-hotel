const bookingService = require("../services/bookingService");

// ========================================
// POST /api/bookings
// Create Booking
// ========================================

const createBooking = async (req, res) => {
  try {
    const {
      roomId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests,
      kids,
      numberOfRooms,
      specialRequest,
    } = req.body;

    const booking = await bookingService.createBooking({
      roomId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests,
      kids,
      numberOfRooms,
      specialRequest,
    });

    return res.status(201).json({
      success: true,
      message: "Booking request submitted successfully.",
      data: {
        booking,
      },
    });
  } catch (error) {
    console.error("Create booking error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message:
        error.message || "Failed to create booking.",
    });
  }
};

// ========================================
// Exports
// ========================================

module.exports = {
  createBooking,
};
