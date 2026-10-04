const API_URL = "http://localhost:5000/api/bookings";

export const createBooking = async (bookingData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to submit booking request."
    );
  }

  return data;
};

/**
 * Name: Test Guest
Email: test@example.com
Phone: 0911000000
 */