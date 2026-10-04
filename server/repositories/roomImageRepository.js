const { pool } = require("../config/database");

// ========================================
// Find Images By Room ID
// ========================================

const findImagesByRoomId = async (roomId) => {
  const [images] = await pool.query(
    `
      SELECT
        id,
        room_id,
        image_url,
        alt_text,
        is_primary,
        display_order,
        created_at
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
// Find Image By ID
// ========================================

const findImageById = async (imageId) => {
  const [images] = await pool.query(
    `
      SELECT
        id,
        room_id,
        image_url,
        alt_text,
        is_primary,
        display_order,
        created_at
      FROM room_images
      WHERE id = ?
      LIMIT 1
    `,
    [imageId]
  );

  return images[0] || null;
};

// ========================================
// Create Image
// ========================================

const createImage = async (imageData) => {
  const {
    roomId,
    imageUrl,
    altText,
    isPrimary,
    displayOrder,
  } = imageData;

  const [result] = await pool.query(
    `
      INSERT INTO room_images
      (
        room_id,
        image_url,
        alt_text,
        is_primary,
        display_order
      )
      VALUES (?, ?, ?, ?, ?)
    `,
    [
      roomId,
      imageUrl,
      altText || null,
      isPrimary ? 1 : 0,
      displayOrder,
    ]
  );

  return result.insertId;
};

// ========================================
// Update Image
// ========================================

const updateImage = async (
  imageId,
  imageData
) => {
  const {
    imageUrl,
    altText,
    displayOrder,
  } = imageData;

  const [result] = await pool.query(
    `
      UPDATE room_images
      SET
        image_url = ?,
        alt_text = ?,
        display_order = ?
      WHERE id = ?
    `,
    [
      imageUrl,
      altText || null,
      displayOrder,
      imageId,
    ]
  );

  return result.affectedRows;
};

// ========================================
// Set Primary Image
// ========================================

const setPrimaryImage = async (
  connection,
  roomId,
  imageId
) => {
  await connection.query(
    `
      UPDATE room_images
      SET is_primary = 0
      WHERE room_id = ?
    `,
    [roomId]
  );

  const [result] = await connection.query(
    `
      UPDATE room_images
      SET is_primary = 1
      WHERE id = ?
        AND room_id = ?
    `,
    [imageId, roomId]
  );

  return result.affectedRows;
};

// ========================================
// Delete Image
// ========================================

const deleteImage = async (
  connection,
  imageId
) => {
  const [result] = await connection.query(
    `
      DELETE FROM room_images
      WHERE id = ?
    `,
    [imageId]
  );

  return result.affectedRows;
};

// ========================================
// Find Next Image For Primary
// ========================================

const findNextImageForPrimary = async (
  connection,
  roomId
) => {
  const [images] = await connection.query(
    `
      SELECT
        id
      FROM room_images
      WHERE room_id = ?
      ORDER BY
        display_order ASC,
        id ASC
      LIMIT 1
    `,
    [roomId]
  );

  return images[0] || null;
};

// ========================================
// Get Database Connection
// ========================================

const getConnection = async () => {
  return pool.getConnection();
};

module.exports = {
  findImagesByRoomId,
  findImageById,
  createImage,
  updateImage,
  setPrimaryImage,
  deleteImage,
  findNextImageForPrimary,
  getConnection,
};