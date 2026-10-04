const roomRepository = require("../repositories/roomRepository");
const roomImageRepository = require("../repositories/roomImageRepository");

// ========================================
// Validate Image Path
// ========================================

const validateImagePath = (imagePath) => {
  if (
    typeof imagePath !== "string" ||
    !imagePath.trim()
  ) {
    throw new Error(
      "Image path is required."
    );
  }

  const trimmedPath =
    imagePath.trim();

  if (
    !trimmedPath.startsWith(
      "/uploads/rooms/"
    )
  ) {
    throw new Error(
      "Invalid image path."
    );
  }

  return trimmedPath;
};

// ========================================
// Validate Display Order
// ========================================

const validateDisplayOrder = (
  displayOrder
) => {
  const order = Number(
    displayOrder
  );

  if (
    !Number.isInteger(order) ||
    order < 1
  ) {
    throw new Error(
      "Display order must be a positive integer."
    );
  }

  return order;
};

// ========================================
// Get Room Images
// ========================================

const getRoomImages = async (
  roomId
) => {
  const room =
    await roomRepository.findRoomById(
      roomId
    );

  if (!room) {
    throw new Error(
      "Room not found."
    );
  }

  return roomImageRepository.findImagesByRoomId(
    roomId
  );
};

// ========================================
// Create Room Image
// ========================================

const createRoomImage = async (
  roomId,
  imageData
) => {
  const room =
    await roomRepository.findRoomById(
      roomId
    );

  if (!room) {
    throw new Error(
      "Room not found."
    );
  }

  const imageUrl =
    validateImagePath(
      imageData.imageUrl
    );

  const displayOrder =
    validateDisplayOrder(
      imageData.displayOrder || 1
    );

  const isPrimary =
    imageData.isPrimary === true ||
    imageData.isPrimary === 1;

  const connection =
    await roomImageRepository.getConnection();

  try {
    await connection.beginTransaction();

    // If this image should be primary,
    // remove primary status from existing images.
    if (isPrimary) {
      await connection.query(
        `
          UPDATE room_images
          SET is_primary = 0
          WHERE room_id = ?
        `,
        [roomId]
      );
    }

    const [result] =
      await connection.query(
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
          imageData.altText ||
            null,
          isPrimary ? 1 : 0,
          displayOrder,
        ]
      );

    await connection.commit();

    return roomImageRepository.findImageById(
      result.insertId
    );
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// ========================================
// Update Room Image
// ========================================

const updateRoomImage = async (
  imageId,
  imageData
) => {
  const image =
    await roomImageRepository.findImageById(
      imageId
    );

  if (!image) {
    throw new Error(
      "Room image not found."
    );
  }

  const imageUrl =
    validateImagePath(
      imageData.imageUrl
    );

  const displayOrder =
    validateDisplayOrder(
      imageData.displayOrder
    );

  const affectedRows =
    await roomImageRepository.updateImage(
      imageId,
      {
        imageUrl,
        altText:
          imageData.altText,
        displayOrder,
      }
    );

  if (affectedRows === 0) {
    throw new Error(
      "Failed to update room image."
    );
  }

  return roomImageRepository.findImageById(
    imageId
  );
};

// ========================================
// Set Primary Room Image
// ========================================

const setPrimaryRoomImage = async (
  imageId
) => {
  const image =
    await roomImageRepository.findImageById(
      imageId
    );

  if (!image) {
    throw new Error(
      "Room image not found."
    );
  }

  const connection =
    await roomImageRepository.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(
      `
        UPDATE room_images
        SET is_primary = 0
        WHERE room_id = ?
      `,
      [image.room_id]
    );

    const [result] =
      await connection.query(
        `
          UPDATE room_images
          SET is_primary = 1
          WHERE id = ?
            AND room_id = ?
        `,
        [
          imageId,
          image.room_id,
        ]
      );

    if (
      result.affectedRows === 0
    ) {
      throw new Error(
        "Failed to set primary image."
      );
    }

    await connection.commit();

    return roomImageRepository.findImageById(
      imageId
    );
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// ========================================
// Delete Room Image
// ========================================

const deleteRoomImage = async (
  imageId
) => {
  const image =
    await roomImageRepository.findImageById(
      imageId
    );

  if (!image) {
    throw new Error(
      "Room image not found."
    );
  }

  const connection =
    await roomImageRepository.getConnection();

  try {
    await connection.beginTransaction();

    const wasPrimary =
      Number(image.is_primary) === 1;

    const affectedRows =
      await roomImageRepository.deleteImage(
        connection,
        imageId
      );

    if (
      affectedRows === 0
    ) {
      throw new Error(
        "Failed to delete room image."
      );
    }

    // If the deleted image was primary,
    // automatically promote the next image.
    if (wasPrimary) {
      const nextImage =
        await roomImageRepository.findNextImageForPrimary(
          connection,
          image.room_id
        );

      if (nextImage) {
        await connection.query(
          `
            UPDATE room_images
            SET is_primary = 1
            WHERE id = ?
              AND room_id = ?
          `,
          [
            nextImage.id,
            image.room_id,
          ]
        );
      }
    }

    await connection.commit();

    return {
      deletedImageId:
        Number(imageId),
      roomId: image.room_id,
      deletedPrimary:
        wasPrimary,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// ========================================
// Exports
// ========================================

module.exports = {
  getRoomImages,
  createRoomImage,
  updateRoomImage,
  setPrimaryRoomImage,
  deleteRoomImage,
};
