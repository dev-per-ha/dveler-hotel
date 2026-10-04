const nodemailer = require("nodemailer");

require("dotenv").config();

// ========================================
// Email Transporter
// ========================================

const transporter =
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,

    port: Number(
      process.env.SMTP_PORT
    ),

    secure:
      process.env.SMTP_SECURE ===
      "true",

    auth: {
      user:
        process.env.SMTP_USER,

      pass:
        process.env.SMTP_PASSWORD,
    },
  });

// ========================================
// Verify SMTP Connection
// ========================================

const verifyEmailConnection =
  async () => {
    try {
      await transporter.verify();

      console.log(
        "Email SMTP connection verified successfully."
      );
    } catch (error) {
      console.error(
        "Email SMTP connection failed:",
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

    const mailOptions = {
      from: `"Dveler Hotel Website" <${process.env.SMTP_USER}>`,

      to: process.env.HOTEL_EMAIL,

      replyTo: guest_email,

      subject: `New Booking Request #${id} - ${room_name}`,

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
    };

    const result =
      await transporter.sendMail(
        mailOptions
      );

    console.log(
      `Booking notification email sent. Message ID: ${result.messageId}`
    );

    return result;
  };

module.exports = {
  transporter,
  verifyEmailConnection,
  sendBookingNotification,
};

