const roomService = require("../services/roomService");

// ========================================
// Public: Get All Rooms
// ========================================

const getRooms = async (req, res) => {
  try {
    const rooms =
      await roomService.getAllRooms();

    return res.status(200).json({
      success: true,
      message:
        "Rooms retrieved successfully.",
      data: rooms,
    });
  } catch (error) {
    console.error(
      "Get rooms error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve rooms.",
    });
  }
};

// ========================================
// Public: Get Room By ID
// ========================================

const getRoom = async (req, res) => {
  try {
    const roomId = Number(
      req.params.id
    );

    if (
      !Number.isInteger(roomId) ||
      roomId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID.",
      });
    }

    const room =
      await roomService.getRoomById(
        roomId
      );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Room retrieved successfully.",
      data: room,
    });
  } catch (error) {
    console.error(
      "Get room error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve room.",
    });
  }
};

// ========================================
// Admin: Get All Rooms
// ========================================

const getAdminRooms = async (
  req,
  res
) => {
  try {
    const rooms =
      await roomService.getAllRooms();

    return res.status(200).json({
      success: true,
      message:
        "Admin rooms retrieved successfully.",
      data: rooms,
    });
  } catch (error) {
    console.error(
      "Get admin rooms error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve admin rooms.",
    });
  }
};

// ========================================
// Admin: Get Room By ID
// ========================================

const getAdminRoom = async (
  req,
  res
) => {
  try {
    const roomId = Number(
      req.params.id
    );

    if (
      !Number.isInteger(roomId) ||
      roomId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID.",
      });
    }

    const room =
      await roomService.getRoomById(
        roomId
      );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Admin room retrieved successfully.",
      data: room,
    });
  } catch (error) {
    console.error(
      "Get admin room error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve admin room.",
    });
  }
};

// ========================================
// Admin: Create Room
// ========================================

const createRoom = async (
  req,
  res
) => {
  try {
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
    } = req.body;

    const room =
      await roomService.createRoom({
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
      });

    return res.status(201).json({
      success: true,
      message:
        "Room created successfully.",
      data: {
        room,
      },
    });
  } catch (error) {
    console.error(
      "Create room error:",
      error.message
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.statusCode
          ? error.message
          : "Failed to create room.",
    });
  }
};

// ========================================
// Admin: Update Room
// ========================================

const updateRoom = async (
  req,
  res
) => {
  try {
    const roomId = Number(
      req.params.id
    );

    if (
      !Number.isInteger(roomId) ||
      roomId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID.",
      });
    }

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
    } = req.body;

    const room =
      await roomService.updateRoom(
        roomId,
        {
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
        }
      );

    return res.status(200).json({
      success: true,
      message:
        "Room updated successfully.",
      data: {
        room,
      },
    });
  } catch (error) {
    console.error(
      "Update room error:",
      error.message
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.statusCode
          ? error.message
          : "Failed to update room.",
    });
  }
};

// ========================================
// Admin: Update Room Availability
// ========================================

const updateRoomAvailability = async (
  req,
  res
) => {
  try {
    const roomId = Number(
      req.params.id
    );

    if (
      !Number.isInteger(roomId) ||
      roomId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID.",
      });
    }

    const {
      available,
    } = req.body;

    const room =
      await roomService.updateRoomAvailability(
        roomId,
        available
      );

    return res.status(200).json({
      success: true,
      message:
        "Room availability updated successfully.",
      data: {
        room,
      },
    });
  } catch (error) {
    console.error(
      "Update room availability error:",
      error.message
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.statusCode
          ? error.message
          : "Failed to update room availability.",
    });
  }
};

// ========================================
// Admin: Update Room Status
// ========================================

const updateRoomStatus = async (
  req,
  res
) => {
  try {
    const roomId = Number(
      req.params.id
    );

    if (
      !Number.isInteger(roomId) ||
      roomId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID.",
      });
    }

    const {
      status,
    } = req.body;

    const room =
      await roomService.updateRoomStatus(
        roomId,
        status
      );

    return res.status(200).json({
      success: true,
      message:
        "Room status updated successfully.",
      data: {
        room,
      },
    });
  } catch (error) {
    console.error(
      "Update room status error:",
      error.message
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.statusCode
          ? error.message
          : "Failed to update room status.",
    });
  }
};

// ========================================
// Admin: Delete Room
// ========================================

const deleteRoom = async (
  req,
  res
) => {
  try {
    const roomId = Number(
      req.params.id
    );

    if (
      !Number.isInteger(roomId) ||
      roomId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid room ID.",
      });
    }

    await roomService.deleteRoom(
      roomId
    );

    return res.status(200).json({
      success: true,
      message:
        "Room deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete room error:",
      error.message
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.statusCode
          ? error.message
          : "Failed to delete room.",
    });
  }
};

// ========================================
// Exports
// ========================================

module.exports = {
  // Public
  getRooms,
  getRoom,

  // Admin
  getAdminRooms,
  getAdminRoom,
  createRoom,
  updateRoom,
  updateRoomAvailability,
  updateRoomStatus,
  deleteRoom,
};

