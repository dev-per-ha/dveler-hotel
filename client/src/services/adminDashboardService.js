const API_URL = "https://dveler-hotel-backend.onrender.com/api/admin";

// Get Dashboard Statistics
export const getDashboardStatistics = async () => {
  const response = await fetch(
    `${API_URL}/dashboard`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to retrieve dashboard statistics."
    );
  }

  return data;
};
