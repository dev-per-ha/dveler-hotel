const API_URL = "http://localhost:5000/api/admin/rooms";

// Get All Admin Rooms
export const getAdminRooms = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to retrieve rooms."
    );
  }

  return data;
};

// Get Single Admin Room
export const getAdminRoom = async (roomId) => {
  const response = await fetch(
    `${API_URL}/${roomId}`,
    {
      method: "GET",
      credentials: "include",
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

// Create Room
export const createAdminRoom = async (roomData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(roomData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create room."
    );
  }

  return data;
};

// Update Room
export const updateAdminRoom = async (
  roomId,
  roomData
) => {
  const response = await fetch(
    `${API_URL}/${roomId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(roomData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update room."
    );
  }

  return data;
};

// Update Room Availability
export const updateRoomAvailability = async (
  roomId,
  available
) => {
  const response = await fetch(
    `${API_URL}/${roomId}/availability`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        available,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update room availability."
    );
  }

  return data;
};

// Update Room Status
export const updateRoomStatus = async (
  roomId,
  status
) => {
  const response = await fetch(
    `${API_URL}/${roomId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        status,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update room status."
    );
  }

  return data;
};

// Delete Room
export const deleteAdminRoom = async (roomId) => {
  const response = await fetch(
    `${API_URL}/${roomId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete room."
    );
  }

  return data;
};