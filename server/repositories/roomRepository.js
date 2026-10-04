const { pool } = require("../config/database");

// ========================================
// Find All Rooms
// Public Rooms Only
// ========================================

const findAllRooms = async () => {
  const [rooms] = await pool.query(`
    SELECT
      id,
      name,
      slug,
      description,
      room_type,
      price_per_night,
      capacity,
      size_sqm,
      bed_type,
      total_rooms,
      available,
      status,
      is_deleted,
      created_at,
      updated_at
    FROM rooms
    WHERE is_deleted = 0
    ORDER BY id ASC
  `);

  return rooms;
};

// ========================================
// Find Room By ID
// Public / General
// Only Active Rooms
// ========================================

const findRoomById = async (roomId) => {
  const [rooms] = await pool.query(
    `
      SELECT
        id,
        name,
        slug,
        description,
        room_type,
        price_per_night,
        capacity,
        size_sqm,
        bed_type,
        total_rooms,
        available,
        status,
        is_deleted,
        created_at,
        updated_at
      FROM rooms
      WHERE id = ?
        AND is_deleted = 0
      LIMIT 1
    `,
    [roomId]
  );

  return rooms[0] || null;
};

// ========================================
// Find Room By Slug
// Active Rooms Only
// ========================================

const findRoomBySlug = async (slug) => {
  const [rooms] = await pool.query(
    `
      SELECT
        id,
        name,
        slug,
        description,
        room_type,
        price_per_night,
        capacity,
        size_sqm,
        bed_type,
        total_rooms,
        available,
        status,
        is_deleted,
        created_at,
        updated_at
      FROM rooms
      WHERE slug = ?
        AND is_deleted = 0
      LIMIT 1
    `,
    [slug]
  );

  return rooms[0] || null;
};

// ========================================
// Find Room Images
// ========================================

const findRoomImages = async (roomId) => {
  const [images] = await pool.query(
    `
      SELECT
        id,
        room_id,
        image_url,
        alt_text,
        is_primary,
        display_order
      FROM room_images
      WHERE room_id = ?
      ORDER BY
        is_primary DESC,
        display_order ASC,
        id ASC
    `,
    [roomId]
  );

  return images;
};

// ========================================
// Find Room Facilities
// ========================================

const findRoomFacilities = async (roomId) => {
  const [facilities] = await pool.query(
    `
      SELECT
        f.id,
        f.name,
        f.description
      FROM room_facilities rf
      INNER JOIN facilities f
        ON rf.facility_id = f.id
      WHERE rf.room_id = ?
      ORDER BY f.name ASC
    `,
    [roomId]
  );

  return facilities;
};

// ========================================
// Create Room
// ========================================

const createRoom = async (roomData) => {
  const {
    name,
    slug,
    description,
    roomType,
    pricePerNight,
    capacity,
    sizeSqm,
    bedType,
    totalRooms,
    available,
    status,
  } = roomData;

  const [result] = await pool.query(
    `
      INSERT INTO rooms
      (
        name,
        slug,
        description,
        room_type,
        price_per_night,
        capacity,
        size_sqm,
        bed_type,
        total_rooms,
        available,
        status,
        is_deleted
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    `,
    [
      name,
      slug,
      description || null,
      roomType,
      pricePerNight,
      capacity,
      sizeSqm || null,
      bedType || null,
      totalRooms,
      available,
      status,
    ]
  );

  return result.insertId;
};

// ========================================
// Update Room
// ========================================

const updateRoom = async (
  roomId,
  roomData
) => {
  const {
    name,
    slug,
    description,
    roomType,
    pricePerNight,
    capacity,
    sizeSqm,
    bedType,
    totalRooms,
    available,
    status,
  } = roomData;

  const [result] = await pool.query(
    `
      UPDATE rooms
      SET
        name = ?,
        slug = ?,
        description = ?,
        room_type = ?,
        price_per_night = ?,
        capacity = ?,
        size_sqm = ?,
        bed_type = ?,
        total_rooms = ?,
        available = ?,
        status = ?
      WHERE id = ?
        AND is_deleted = 0
    `,
    [
      name,
      slug,
      description || null,
      roomType,
      pricePerNight,
      capacity,
      sizeSqm || null,
      bedType || null,
      totalRooms,
      available,
      status,
      roomId,
    ]
  );

  return result.affectedRows;
};

// ========================================
// Update Room Availability
// ========================================

const updateRoomAvailability = async (
  roomId,
  available
) => {
  const [result] = await pool.query(
    `
      UPDATE rooms
      SET available = ?
      WHERE id = ?
        AND is_deleted = 0
    `,
    [available, roomId]
  );

  return result.affectedRows;
};

// ========================================
// Update Room Status
// ========================================

const updateRoomStatus = async (
  roomId,
  status
) => {
  const [result] = await pool.query(
    `
      UPDATE rooms
      SET status = ?
      WHERE id = ?
        AND is_deleted = 0
    `,
    [status, roomId]
  );

  return result.affectedRows;
};

// ========================================
// Soft Delete Room
// ========================================
// IMPORTANT:
// We do NOT physically delete the room.
// This preserves existing bookings.

const deleteRoom = async (roomId) => {
  const [result] = await pool.query(
    `
      UPDATE rooms
      SET
        is_deleted = 1,
        available = 0
      WHERE id = ?
        AND is_deleted = 0
    `,
    [roomId]
  );

  return result.affectedRows;
};

// ========================================
// Exports
// ========================================

module.exports = {
  findAllRooms,
  findRoomById,
  findRoomBySlug,
  findRoomImages,
  findRoomFacilities,
  createRoom,
  updateRoom,
  updateRoomAvailability,
  updateRoomStatus,
  deleteRoom,
};