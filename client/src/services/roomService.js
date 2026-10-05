const API_URL = "https://dveler-hotel-backend.onrender.com/api/rooms";

// Get All Public Rooms
export const getRooms = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to retrieve rooms."
    );
  }

  return data;
};

// Get Single Room
export const getRoom = async (roomId) => {
  const response = await fetch(
    `${API_URL}/${roomId}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to retrieve room."
    );
  }

  return data;
};

// Check Room Availability
// ========================================
// Get Available Rooms
// ========================================

export const getAvailableRooms = async ({
  checkIn,
  checkOut,
  guests,
  numberOfRooms,
}) => {
  const params = new URLSearchParams({
    checkIn,
    checkOut,
    guests: String(guests),
    numberOfRooms: String(numberOfRooms),
  });

  const response = await fetch(
    `${API_URL}/availability?${params.toString()}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to check room availability."
    );
  }

  return data;
};
