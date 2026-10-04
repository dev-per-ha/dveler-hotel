const bookingRepository = require(
  "../repositories/bookingRepository"
);

const {
  sendBookingNotification,
} = require("./emailService");

// ========================================
// Get Today As YYYY-MM-DD
// ========================================

const getTodayDateString = () => {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// ========================================
// Validate Date Format
// ========================================

const isValidDateString = (value) => {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return false;
  }

  const date = new Date(
    `${value}T00:00:00Z`
  );

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return (
    date.toISOString().slice(0, 10) ===
    value
  );
};

// ========================================
// Validate Booking Data
// ========================================

const validateBookingData = (
  bookingData
) => {
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
  } = bookingData;

  // ----------------------------------------
  // Required Fields
  // ----------------------------------------

  if (
    !roomId ||
    !guestName ||
    !guestEmail ||
    !guestPhone ||
    !checkIn ||
    !checkOut ||
    guests === undefined ||
    guests === null ||
    kids === undefined ||
    kids === null ||
    numberOfRooms === undefined ||
    numberOfRooms === null
  ) {
    return {
      valid: false,
      message:
        "Room, guest information, dates, guests, kids and number of rooms are required.",
    };
  }

  // ----------------------------------------
  // Room ID
  // ----------------------------------------

  if (
    !Number.isInteger(Number(roomId)) ||
    Number(roomId) <= 0
  ) {
    return {
      valid: false,
      message: "Invalid room ID.",
    };
  }

  // ----------------------------------------
  // Guests
  // ----------------------------------------

  if (
    !Number.isInteger(Number(guests)) ||
    Number(guests) < 1
  ) {
    return {
      valid: false,
      message:
        "Guest count must be at least 1.",
    };
  }

  // ----------------------------------------
  // Kids
  // ----------------------------------------

  if (
    !Number.isInteger(Number(kids)) ||
    Number(kids) < 0
  ) {
    return {
      valid: false,
      message:
        "Kids count must be a non-negative integer.",
    };
  }

  // ----------------------------------------
  // Number Of Rooms
  // ----------------------------------------

  if (
    !Number.isInteger(
      Number(numberOfRooms)
    ) ||
    Number(numberOfRooms) < 1
  ) {
    return {
      valid: false,
      message:
        "Number of rooms must be at least 1.",
    };
  }

  // ----------------------------------------
  // Dates
  // ----------------------------------------

  if (
    !isValidDateString(checkIn) ||
    !isValidDateString(checkOut)
  ) {
    return {
      valid: false,
      message:
        "Dates must use the YYYY-MM-DD format.",
    };
  }

  // ----------------------------------------
  // Check-in Cannot Be In The Past
  // ----------------------------------------

  if (
    checkIn < getTodayDateString()
  ) {
    return {
      valid: false,
      message:
        "Check-in cannot be in the past.",
    };
  }

  // ----------------------------------------
  // Check-out Must Be After Check-in
  // ----------------------------------------

  if (checkOut <= checkIn) {
    return {
      valid: false,
      message:
        "Check-out must be after check-in.",
    };
  }

  // ----------------------------------------
  // Guest Name
  // ----------------------------------------

  if (
    typeof guestName !== "string" ||
    guestName.trim().length < 2
  ) {
    return {
      valid: false,
      message:
        "Guest name must contain at least 2 characters.",
    };
  }

  // ----------------------------------------
  // Guest Email
  // ----------------------------------------

  if (
    typeof guestEmail !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      guestEmail.trim()
    )
  ) {
    return {
      valid: false,
      message:
        "Please provide a valid email address.",
    };
  }

  // ----------------------------------------
  // Guest Phone
  // ----------------------------------------

  if (
    typeof guestPhone !== "string" ||
    guestPhone.trim().length < 7
  ) {
    return {
      valid: false,
      message:
        "Please provide a valid phone number.",
    };
  }

  // ----------------------------------------
  // Valid
  // ----------------------------------------

  return {
    valid: true,
  };
};

// ========================================
// Create Booking
// ========================================

const createBooking = async (
  bookingData
) => {
  // ----------------------------------------
  // Validate
  // ----------------------------------------

  const validation =
    validateBookingData(bookingData);

  if (!validation.valid) {
    const error = new Error(
      validation.message
    );

    error.statusCode = 400;

    throw error;
  }

  // ----------------------------------------
  // Extract Data
  // ----------------------------------------

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
  } = bookingData;

  // ----------------------------------------
  // Normalize Data
  // ----------------------------------------

  const normalizedBookingData = {
    roomId: Number(roomId),

    guestName:
      guestName.trim(),

    guestEmail:
      guestEmail
        .trim()
        .toLowerCase(),

    guestPhone:
      guestPhone.trim(),

    checkIn,

    checkOut,

    guests:
      Number(guests),

    kids:
      Number(kids),

    numberOfRooms:
      Number(numberOfRooms),

    specialRequest:
      typeof specialRequest === "string" &&
      specialRequest.trim()
        ? specialRequest.trim()
        : null,
  };

  // ----------------------------------------
  // Get Database Connection
  // ----------------------------------------

  const connection =
    await bookingRepository.getConnection();

  try {
    // --------------------------------------
    // Start Transaction
    // --------------------------------------

    await connection.beginTransaction();

    // --------------------------------------
    // Find Room
    //
    // FOR UPDATE locks the room row during
    // this transaction.
    // --------------------------------------

    const room =
      await bookingRepository.findRoomForBooking(
        connection,
        normalizedBookingData.roomId
      );

    if (!room) {
      const error = new Error(
        "Room not found."
      );

      error.statusCode = 404;

      throw error;
    }

    // --------------------------------------
    // Check Room Status
    // --------------------------------------

    if (room.status !== "available") {
      const error = new Error(
        "This room is currently unavailable. Please choose another room."
      );

      error.statusCode = 400;

      throw error;
    }

    // --------------------------------------
    // Check Manual Availability
    // --------------------------------------

    const availableRooms =
      Number(room.available);

    if (availableRooms <= 0) {
      const error = new Error(
        "All rooms of this type are currently reserved. Please choose another room."
      );

      error.statusCode = 400;

      throw error;
    }

    // --------------------------------------
    // Check Requested Room Count
    // --------------------------------------

    if (
      normalizedBookingData.numberOfRooms >
      availableRooms
    ) {
      const error = new Error(
        `Only ${availableRooms} room${
          availableRooms === 1
            ? ""
            : "s"
        } are currently available.`
      );

      error.statusCode = 400;

      throw error;
    }

    // --------------------------------------
    // Check Guest Capacity
    //
    // Capacity is per room.
    //
    // Example:
    // Capacity = 2
    // Rooms = 2
    // Maximum occupants = 4
    // --------------------------------------

    const totalGuests =
      normalizedBookingData.guests +
      normalizedBookingData.kids;

    const totalCapacity =
      Number(room.capacity) *
      normalizedBookingData.numberOfRooms;

    if (
      totalGuests > totalCapacity
    ) {
      const error = new Error(
        `The selected room${
          normalizedBookingData.numberOfRooms ===
          1
            ? ""
            : "s"
        } can accommodate up to ${totalCapacity} guest${
          totalCapacity === 1
            ? ""
            : "s"
        } in total.`
      );

      error.statusCode = 400;

      throw error;
    }

    // --------------------------------------
    // IMPORTANT
    //
    // Availability is controlled manually
    // by the hotel administrator.
    //
    // Booking creation does NOT decrease:
    //
    // rooms.available
    //
    // Booking status does NOT change:
    //
    // rooms.available
    // rooms.total_rooms
    // rooms.status
    //
    // The hotel manually controls physical
    // room availability from Admin → Rooms.
    // --------------------------------------

    // --------------------------------------
    // Create Booking
    // --------------------------------------

    const bookingId =
      await bookingRepository.createBooking(
        connection,
        normalizedBookingData
      );

    // --------------------------------------
    // Get Complete Booking
    // --------------------------------------

    const booking =
      await bookingRepository.findBookingById(
        connection,
        bookingId
      );

    if (!booking) {
      const error = new Error(
        "Booking was created but could not be retrieved."
      );

      error.statusCode = 500;

      throw error;
    }

    // --------------------------------------
    // Commit Transaction
    // --------------------------------------

    await connection.commit();

    // --------------------------------------
    // Send Hotel Email
    //
    // Email failure does not roll back
    // an already-created booking.
    // --------------------------------------

    try {
      await sendBookingNotification(
        booking
      );
    } catch (emailError) {
      console.error(
        "Booking email notification failed:",
        emailError.message
      );
    }

    // --------------------------------------
    // Return Booking
    // --------------------------------------

    return booking;
  } catch (error) {
    // --------------------------------------
    // Rollback
    // --------------------------------------

    try {
      await connection.rollback();
    } catch (rollbackError) {
      console.error(
        "Transaction rollback failed:",
        rollbackError.message
      );
    }

    throw error;
  } finally {
    // --------------------------------------
    // Release Connection
    // --------------------------------------

    connection.release();
  }
};

// ========================================
// Exports
// ========================================

module.exports = {
  createBooking,
};

