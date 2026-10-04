const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminRepository = require("../repositories/adminRepository");

// ========================================
// Generate Admin Token
// ========================================

const generateAdminToken = (admin) => {
  if (!process.env.JWT_SECRET) {
    const error = new Error(
      "JWT_SECRET is not configured."
    );

    error.statusCode = 500;

    throw error;
  }

  return jwt.sign(
    {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || "1d",
    }
  );
};

// ========================================
// Admin Login
// ========================================

const loginAdmin = async (
  email,
  password
) => {
  if (
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    const error = new Error(
      "Email and password are required."
    );

    error.statusCode = 400;

    throw error;
  }

  const normalizedEmail = email
    .trim()
    .toLowerCase();

  if (!normalizedEmail) {
    const error = new Error(
      "Email is required."
    );

    error.statusCode = 400;

    throw error;
  }

  if (!password) {
    const error = new Error(
      "Password is required."
    );

    error.statusCode = 400;

    throw error;
  }

  const admin =
    await adminRepository.findAdminByEmail(
      normalizedEmail
    );

  if (!admin) {
    const error = new Error(
      "Invalid email or password."
    );

    error.statusCode = 401;

    throw error;
  }

  const passwordMatches =
    await bcrypt.compare(
      password,
      admin.password
    );

  if (!passwordMatches) {
    const error = new Error(
      "Invalid email or password."
    );

    error.statusCode = 401;

    throw error;
  }

  const token =
    generateAdminToken(admin);

  const {
    password: _password,
    ...safeAdmin
  } = admin;

  return {
    token,
    admin: safeAdmin,
  };
};

// ========================================
// Get Dashboard Statistics
// ========================================

const getDashboardStatistics =
  async () => {
    const statistics =
      await adminRepository.getDashboardStatistics();

    return {
      rooms: {
        totalRoomTypes: Number(
          statistics.rooms.total_rooms
        ),

        availableRoomTypes: Number(
          statistics.rooms
            .available_room_types
        ),

        maintenanceRoomTypes: Number(
          statistics.rooms
            .maintenance_room_types
        ),

        totalRoomUnits: Number(
          statistics.rooms
            .total_room_units
        ),

        availableRoomUnits: Number(
          statistics.rooms
            .available_room_units
        ),
      },
    };
  };

// ========================================
// Exports
// ========================================

module.exports = {
  loginAdmin,
  getDashboardStatistics,
};

