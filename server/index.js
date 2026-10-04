const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

// ========================================
// Database
// ========================================

const {
  pool,
  testDatabaseConnection,
} = require("./config/database");

// ========================================
// Routes
// ========================================

const roomRoutes = require("./routes/roomRoutes");

const bookingRoutes = require("./routes/bookingRoutes");

const adminRoutes = require("./routes/adminRoutes");

const roomImageRoutes = require("./routes/roomImageRoutes");

// ========================================
// Email Service
// ========================================

const {
  verifyEmailConnection,
} = require("./services/emailService");

// ========================================
// App
// ========================================

const app = express();

const PORT = process.env.PORT || 5000;

const HOST = "0.0.0.0";

// ========================================
// Middleware
// ========================================

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:5173",

    credentials: true,
  })
);

app.use(
  express.json()
);

app.use(
  cookieParser()
);

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ========================================
// API Routes
// ========================================

// Public room routes
app.use(
  "/api/rooms",
  roomRoutes
);

// Public booking routes
app.use(
  "/api/bookings",
  bookingRoutes
);

// Admin routes
app.use(
  "/api/admin",
  adminRoutes
);

// Admin room image routes
app.use(
  "/api/admin/rooms",
  roomImageRoutes
);

// ========================================
// Test API
// ========================================

app.get(
  "/",
  (req, res) => {
    return res.status(200).json({
      success: true,
      message:
        "Hotel API is running.",
    });
  }
);

// ========================================
// Test Database API
// ========================================

app.get(
  "/api/test-db",
  async (req, res) => {
    try {
      const [rows] =
        await pool.query(
          `
            SELECT
              id,
              name,
              room_type,
              price_per_night,
              capacity,
              total_rooms,
              available,
              status
            FROM rooms
            ORDER BY id ASC
          `
        );

      return res.status(200).json({
        success: true,
        message:
          "MySQL database connection is working.",
        data: rows,
      });
    } catch (error) {
      console.error(
        "Database test error:",
        error.message
      );

      return res.status(500).json({
        success: false,
        message:
          "MySQL database connection failed.",
      });
    }
  }
);

// ========================================
// Start Server
// ========================================

const startServer = async () => {
  try {
    // ------------------------------------
    // Test MySQL
    // ------------------------------------

    await testDatabaseConnection();

    // ------------------------------------
    // Test SMTP
    // ------------------------------------

    await verifyEmailConnection();

    // ------------------------------------
    // Start Express
    // ------------------------------------

    app.listen(
      PORT,
      HOST,
      () => {
        console.log(
          `Hotel API running on ${HOST}:${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );

    process.exit(1);
  }
};

startServer();
