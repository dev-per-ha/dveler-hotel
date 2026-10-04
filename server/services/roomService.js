const roomRepository = require("../repositories/roomRepository");

// ========================================
// Build Complete Room
// ========================================

const buildRoom = async (room) => {
  if (!room) {
    return null;
  }

  const [
    images,
    facilities,
  ] = await Promise.all([
    roomRepository.findRoomImages(
      room.id
    ),
    roomRepository.findRoomFacilities(
      room.id
    ),
  ]);

  return {
    ...room,
    images,
    facilities,
  };
};

// ========================================
// Get All Rooms
// ========================================

const getAllRooms = async () => {
  const rooms =
    await roomRepository.findAllRooms();

  return Promise.all(
    rooms.map((room) =>
      buildRoom(room)
    )
  );
};

// ========================================
// Get Room By ID
// ========================================

const getRoomById = async (roomId) => {
  const room =
    await roomRepository.findRoomById(
      roomId
    );

  return buildRoom(room);
};

// ========================================
// Validate Room Data
// ========================================

const validateRoomData = (roomData) => {
  const {
    name,
    slug,
    roomType,
    pricePerNight,
    capacity,
    totalRooms,
    available,
    status,
  } = roomData;

  if (
    !name ||
    !slug ||
    !roomType ||
    pricePerNight === undefined ||
    capacity === undefined ||
    totalRooms === undefined ||
    available === undefined ||
    !status
  ) {
    return {
      valid: false,
      message:
        "Name, slug, room type, price, capacity, total rooms, available rooms and status are required.",
    };
  }

  if (
    typeof name !== "string" ||
    name.trim().length < 2
  ) {
    return {
      valid: false,
      message:
        "Room name must contain at least 2 characters.",
    };
  }

  if (
    typeof slug !== "string" ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
      slug.trim()
    )
  ) {
    return {
      valid: false,
      message:
        "Slug must contain lowercase letters, numbers and hyphens only.",
    };
  }

  if (
    typeof roomType !== "string" ||
    roomType.trim().length < 2
  ) {
    return {
      valid: false,
      message:
        "Room type is invalid.",
    };
  }

  const price =
    Number(pricePerNight);

  const roomCapacity =
    Number(capacity);

  const roomTotal =
    Number(totalRooms);

  const roomAvailable =
    Number(available);

  if (
    !Number.isFinite(price) ||
    price < 0
  ) {
    return {
      valid: false,
      message:
        "Price must be a valid positive number.",
    };
  }

  if (
    !Number.isInteger(roomCapacity) ||
    roomCapacity <= 0
  ) {
    return {
      valid: false,
      message:
        "Capacity must be a positive integer.",
    };
  }

  if (
    !Number.isInteger(roomTotal) ||
    roomTotal <= 0
  ) {
    return {
      valid: false,
      message:
        "Total rooms must be a positive integer.",
    };
  }

  if (
    !Number.isInteger(roomAvailable) ||
    roomAvailable < 0
  ) {
    return {
      valid: false,
      message:
        "Available rooms must be zero or greater.",
    };
  }

  if (
    roomAvailable > roomTotal
  ) {
    return {
      valid: false,
      message:
        "Available rooms cannot be greater than total rooms.",
    };
  }

  if (
    ![
      "available",
      "maintenance",
    ].includes(status)
  ) {
    return {
      valid: false,
      message:
        "Invalid room status.",
    };
  }

  return {
    valid: true,
  };
};

// ========================================
// Create Room
// ========================================

const createRoom = async (
  roomData
) => {
  const validation =
    validateRoomData(roomData);

  if (!validation.valid) {
    const error = new Error(
      validation.message
    );

    error.statusCode = 400;

    throw error;
  }

  const normalizedSlug =
    roomData.slug
      .trim()
      .toLowerCase();

  const existingRoom =
    await roomRepository.findRoomBySlug(
      normalizedSlug
    );

  if (existingRoom) {
    const error = new Error(
      "A room with this slug already exists."
    );

    error.statusCode = 409;

    throw error;
  }

  const roomId =
    await roomRepository.createRoom({
      ...roomData,

      name:
        roomData.name.trim(),

      slug:
        normalizedSlug,

      roomType:
        roomData.roomType.trim(),

      description:
        roomData.description
          ? roomData.description.trim()
          : null,

      bedType:
        roomData.bedType
          ? roomData.bedType.trim()
          : null,

      pricePerNight:
        Number(
          roomData.pricePerNight
        ),

      capacity:
        Number(roomData.capacity),

      sizeSqm:
        roomData.sizeSqm
          ? Number(roomData.sizeSqm)
          : null,

      totalRooms:
        Number(roomData.totalRooms),

      available:
        Number(roomData.available),
    });

  return roomRepository.findRoomById(
    roomId
  );
};

// ========================================
// Update Room
// ========================================

const updateRoom = async (
  roomId,
  roomData
) => {
  const room =
    await roomRepository.findRoomById(
      roomId
    );

  if (!room) {
    const error = new Error(
      "Room not found."
    );

    error.statusCode = 404;

    throw error;
  }

  const validation =
    validateRoomData(roomData);

  if (!validation.valid) {
    const error = new Error(
      validation.message
    );

    error.statusCode = 400;

    throw error;
  }

  const normalizedSlug =
    roomData.slug
      .trim()
      .toLowerCase();

  const existingRoom =
    await roomRepository.findRoomBySlug(
      normalizedSlug
    );

  if (
    existingRoom &&
    existingRoom.id !== roomId
  ) {
    const error = new Error(
      "A room with this slug already exists."
    );

    error.statusCode = 409;

    throw error;
  }

  await roomRepository.updateRoom(
    roomId,
    {
      ...roomData,

      name:
        roomData.name.trim(),

      slug:
        normalizedSlug,

      roomType:
        roomData.roomType.trim(),

      description:
        roomData.description
          ? roomData.description.trim()
          : null,

      bedType:
        roomData.bedType
          ? roomData.bedType.trim()
          : null,

      pricePerNight:
        Number(
          roomData.pricePerNight
        ),

      capacity:
        Number(roomData.capacity),

      sizeSqm:
        roomData.sizeSqm
          ? Number(roomData.sizeSqm)
          : null,

      totalRooms:
        Number(roomData.totalRooms),

      available:
        Number(roomData.available),
    }
  );

  return roomRepository.findRoomById(
    roomId
  );
};

// ========================================
// Update Room Availability
// ========================================

const updateRoomAvailability = async (
  roomId,
  available
) => {
  const room =
    await roomRepository.findRoomById(
      roomId
    );

  if (!room) {
    const error = new Error(
      "Room not found."
    );

    error.statusCode = 404;

    throw error;
  }

  const availableCount =
    Number(available);

  if (
    !Number.isInteger(
      availableCount
    ) ||
    availableCount < 0
  ) {
    const error = new Error(
      "Available rooms must be a non-negative integer."
    );

    error.statusCode = 400;

    throw error;
  }

  if (
    availableCount >
    room.total_rooms
  ) {
    const error = new Error(
      "Available rooms cannot exceed total rooms."
    );

    error.statusCode = 400;

    throw error;
  }

  await roomRepository.updateRoomAvailability(
    roomId,
    availableCount
  );

  return roomRepository.findRoomById(
    roomId
  );
};

// ========================================
// Update Room Status
// ========================================

const updateRoomStatus = async (
  roomId,
  status
) => {
  const room =
    await roomRepository.findRoomById(
      roomId
    );

  if (!room) {
    const error = new Error(
      "Room not found."
    );

    error.statusCode = 404;

    throw error;
  }

  if (
    ![
      "available",
      "maintenance",
    ].includes(status)
  ) {
    const error = new Error(
      "Invalid room status."
    );

    error.statusCode = 400;

    throw error;
  }

  await roomRepository.updateRoomStatus(
    roomId,
    status
  );

  return roomRepository.findRoomById(
    roomId
  );
};

// ========================================
// Delete Room
// ========================================

const deleteRoom = async (
  roomId
) => {
  const room =
    await roomRepository.findRoomById(
      roomId
    );

  if (!room) {
    const error = new Error(
      "Room not found."
    );

    error.statusCode = 404;

    throw error;
  }

  try {
    await roomRepository.deleteRoom(
      roomId
    );
  } catch (error) {
    if (
      error.code ===
      "ER_ROW_IS_REFERENCED_2"
    ) {
      const deleteError =
        new Error(
          "This room cannot be deleted because it has existing bookings."
        );

      deleteError.statusCode = 409;

      throw deleteError;
    }

    throw error;
  }

  return true;
};

// ========================================
// Exports
// ========================================

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  updateRoomAvailability,
  updateRoomStatus,
  deleteRoom,
};

