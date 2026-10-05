const API_URL =
  "https://dveler-hotel-backend.onrender.com/api/admin/rooms";

// Get Room Images
export const getRoomImages = async (roomId) => {
  const response = await fetch(
    `${API_URL}/${roomId}/images`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to retrieve room images."
    );
  }

  return data;
};

// Add Room Image
export const createRoomImage = async (
  roomId,
  imageData
) => {
  const response = await fetch(
    `${API_URL}/${roomId}/images`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(imageData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to create room image."
    );
  }

  return data;
};

// Update Room Image
export const updateRoomImage = async (
  roomId,
  imageId,
  imageData
) => {
  const response = await fetch(
    `${API_URL}/${roomId}/images/${imageId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(imageData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update room image."
    );
  }

  return data;
};

// Set Primary Room Image
export const setPrimaryRoomImage = async (
  roomId,
  imageId
) => {
  const response = await fetch(
    `${API_URL}/${roomId}/images/${imageId}/primary`,
    {
      method: "PATCH",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to set primary room image."
    );
  }

  return data;
};

// Delete Room Image
export const deleteRoomImage = async (
  roomId,
  imageId
) => {
  const response = await fetch(
    `${API_URL}/${roomId}/images/${imageId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to delete room image."
    );
  }

  return data;
};
