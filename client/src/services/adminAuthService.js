const API_URL = "https://dveler-hotel-backend.onrender.com/api/admin";

// Admin Login
export const loginAdmin = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Admin login failed."
    );
  }

  return data;
};

// Get Current Admin
export const getCurrentAdmin = async () => {
  const response = await fetch(`${API_URL}/test-auth`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to authenticate admin."
    );
  }

  return data;
};

// Logout Admin
export const logoutAdmin = async () => {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Admin logout failed."
    );
  }

  return data;
};
