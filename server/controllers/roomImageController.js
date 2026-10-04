const roomImageService = require("../services/roomImageService");

// ========================================
// GET /api/admin/rooms/:roomId/images
// Get Room Images
// ========================================

const getRoomImages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const images =
      await roomImageService.getRoomImages(
        roomId
      );

    return res.status(200).json({
      success: true,
      message:
        "Room images retrieved successfully.",
      data: images,
    });
  } catch (error) {
    console.error(
      "Get room images error:",
      error.message
    );

    if (
      error.message ===
      "Room not found."
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve room images.",
    });
  }
};

// ========================================
// POST /api/admin/rooms/:roomId/images
// Upload Room Image
// ========================================

const createRoomImage = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please select an image to upload.",
      });
    }

    const {
      altText,
      isPrimary,
      displayOrder,
    } = req.body;

    const imageUrl =
      `/uploads/rooms/${req.file.filename}`;

    const image =
      await roomImageService.createRoomImage(
        roomId,
        {
          imageUrl,
          altText,
          isPrimary,
          displayOrder,
        }
      );

    return res.status(201).json({
      success: true,
      message:
        "Room image uploaded successfully.",
      data: image,
    });
  } catch (error) {
    console.error(
      "Create room image error:",
      error.message
    );

    if (
      error.message ===
      "Room not found."
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
        "Image URL is required." ||
      error.message ===
        "Invalid image URL." ||
      error.message ===
        "Display order must be a positive integer."
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to upload room image.",
    });
  }
};

// ========================================
// PUT /api/admin/rooms/:roomId/images/:imageId
// Update Room Image
// ========================================

const updateRoomImage = async (req, res) => {
  try {
    const { roomId, imageId } =
      req.params;

    const {
      imageUrl,
      altText,
      displayOrder,
    } = req.body;

    const existingImage =
      await roomImageService.getRoomImages(
        roomId
      );

    const imageBelongsToRoom =
      existingImage.some(
        (image) =>
          Number(image.id) ===
          Number(imageId)
      );

    if (!imageBelongsToRoom) {
      return res.status(404).json({
        success: false,
        message:
          "Room image not found.",
      });
    }

    const image =
      await roomImageService.updateRoomImage(
        imageId,
        {
          imageUrl,
          altText,
          displayOrder,
        }
      );

    return res.status(200).json({
      success: true,
      message:
        "Room image updated successfully.",
      data: image,
    });
  } catch (error) {
    console.error(
      "Update room image error:",
      error.message
    );

    if (
      error.message ===
      "Room image not found."
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message ===
        "Image URL is required." ||
      error.message ===
        "Invalid image URL." ||
      error.message ===
        "Display order must be a positive integer."
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update room image.",
    });
  }
};

// ========================================
// PATCH /api/admin/rooms/:roomId/images/:imageId/primary
// Set Primary Room Image
// ========================================

const setPrimaryRoomImage = async (
  req,
  res
) => {
  try {
    const { roomId, imageId } =
      req.params;

    const images =
      await roomImageService.getRoomImages(
        roomId
      );

    const imageBelongsToRoom =
      images.some(
        (image) =>
          Number(image.id) ===
          Number(imageId)
      );

    if (!imageBelongsToRoom) {
      return res.status(404).json({
        success: false,
        message:
          "Room image not found.",
      });
    }

    const image =
      await roomImageService.setPrimaryRoomImage(
        imageId
      );

    return res.status(200).json({
      success: true,
      message:
        "Primary room image updated successfully.",
      data: image,
    });
  } catch (error) {
    console.error(
      "Set primary room image error:",
      error.message
    );

    if (
      error.message ===
        "Room image not found." ||
      error.message ===
        "Failed to set primary image."
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update primary room image.",
    });
  }
};

// ========================================
// DELETE /api/admin/rooms/:roomId/images/:imageId
// Delete Room Image
// ========================================

const deleteRoomImage = async (req, res) => {
  try {
    const { roomId, imageId } =
      req.params;

    const images =
      await roomImageService.getRoomImages(
        roomId
      );

    const imageBelongsToRoom =
      images.some(
        (image) =>
          Number(image.id) ===
          Number(imageId)
      );

    if (!imageBelongsToRoom) {
      return res.status(404).json({
        success: false,
        message:
          "Room image not found.",
      });
    }

    const result =
      await roomImageService.deleteRoomImage(
        imageId
      );

    return res.status(200).json({
      success: true,
      message:
        "Room image deleted successfully.",
      data: result,
    });
  } catch (error) {
    console.error(
      "Delete room image error:",
      error.message
    );

    if (
      error.message ===
        "Room image not found." ||
      error.message ===
        "Failed to delete room image."
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete room image.",
    });
  }
};

module.exports = {
  getRoomImages,
  createRoomImage,
  updateRoomImage,
  setPrimaryRoomImage,
  deleteRoomImage,
};

