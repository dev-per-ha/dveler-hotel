const { pool } = require("../config/database");

// ========================================
// Get Database Connection
// ========================================

const getConnection = async () =>
  pool.getConnection();

// ========================================
// Find Room For Booking
// ========================================
//
// The room row is locked during the
// booking transaction.
//
// This allows us to safely check the
// manually controlled availability.
//

const findRoomForBooking = async (
  connection,
  roomId
) => {
  const [rooms] = await connection.query(
    `
      SELECT
        id,
        name,
        room_type,
        price_per_night,
        capacity,
        total_rooms,
        available,
        status
      FROM rooms
      WHERE id = ?
      LIMIT 1
      FOR UPDATE
    `,
    [roomId]
  );

  return rooms[0] || null;
};

// ========================================
// Create Booking
// ========================================

const createBooking = async (
  connection,
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
    specialRequest,
  } = bookingData;

  const [result] =
    await connection.query(
      `
        INSERT INTO bookings (
          room_id,
          guest_name,
          guest_email,
          guest_phone,
          check_in,
          check_out,
          guests,
          kids,
          number_of_rooms,
          special_request,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `,
      [
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
      ]
    );

  return result.insertId;
};

// ========================================
// Find Booking By ID
// ========================================
//
// Used after creating a booking so the
// complete booking information can be
// returned to the frontend and email service.
//

const findBookingById = async (
  connection,
  bookingId
) => {
  const [bookings] =
    await connection.query(
      `
        SELECT
          b.id,
          b.room_id,
          b.guest_name,
          b.guest_email,
          b.guest_phone,
          b.check_in,
          b.check_out,
          b.guests,
          b.kids,
          b.number_of_rooms,
          b.special_request,
          b.status,
          b.created_at,

          r.name AS room_name,
          r.room_type,
          r.price_per_night,
          r.capacity

        FROM bookings b

        INNER JOIN rooms r
          ON b.room_id = r.id

        WHERE b.id = ?

        LIMIT 1
      `,
      [bookingId]
    );

  return bookings[0] || null;
};

// ========================================
// Exports
// ========================================

module.exports = {
  getConnection,
  findRoomForBooking,
  createBooking,
  findBookingById,
};

