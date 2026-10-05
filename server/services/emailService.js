const { Resend } = require("resend");

require("dotenv").config();

// ========================================
// Resend Email Client
// ========================================

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  );

// ========================================
// Verify Email Connection
// ========================================

const verifyEmailConnection =
  async () => {
    try {
      if (
        !process.env.RESEND_API_KEY
      ) {
        throw new Error(
          "RESEND_API_KEY is not configured."
        );
      }

      console.log(
        "Resend email service configured successfully."
      );
    } catch (error) {
      console.error(
        "Resend email service configuration failed:",
        error.message
      );

      throw error;
    }
  };

// ========================================
// Send Booking Notification
// ========================================

const sendBookingNotification =
  async (booking) => {
    const {
      id,
      room_name,
      room_type,
      guest_name,
      guest_email,
      guest_phone,
      check_in,
      check_out,
      guests,
      kids,
      number_of_rooms,
      special_request,
      status,
    } = booking;

    const result =
      await resend.emails.send({
        from:
          process.env.EMAIL_FROM,

        to:
          process.env.HOTEL_EMAIL,

        replyTo:
          guest_email,

        subject:
          `New Booking Request #${id} - ${room_name}`,

        text: `
New Booking Request

Booking ID: #${id}

Guest Information
-----------------
Name: ${guest_name}
Email: ${guest_email}
Phone: ${guest_phone}

Booking Information
-------------------
Room: ${room_name}
Room Type: ${room_type}
Check-in: ${check_in}
Check-out: ${check_out}
Guests: ${guests}
Kids: ${kids}
Number of Rooms: ${number_of_rooms}
Status: ${status}

Special Request
---------------
${special_request || "None"}

This is a booking request submitted through the Dveler Hotel website.
Please contact the guest using the email address or phone number above.
      `.trim(),
      });

    if (result.error) {
      console.error(
        "Booking notification email failed:",
        result.error
      );

      throw new Error(
        result.error.message ||
          "Failed to send booking notification email."
      );
    }

    console.log(
      `Booking notification email sent. Message ID: ${result.data.id}`
    );

    return result.data;
  };

module.exports = {
  resend,
  verifyEmailConnection,
  sendBookingNotification,
};
