const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// ========================================
// MySQL Connection Pool
// ========================================

const poolConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// ========================================
// Aiven SSL Configuration
// ========================================

if (process.env.DB_SSL === "true") {
  const caPath = path.join(__dirname, "..", "ca.pem");

  poolConfig.ssl = {
    ca: fs.readFileSync(caPath),
    rejectUnauthorized: true,
  };
}

// ========================================
// Create Connection Pool
// ========================================

const pool = mysql.createPool(poolConfig);

// ========================================
// Test Database Connection
// ========================================

const testDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL database connected successfully.");

    connection.release();
  } catch (error) {
    console.error(
      "MySQL database connection failed:",
      error.message
    );

    throw error;
  }
};

// ========================================
// Export
// ========================================

module.exports = {
  pool,
  testDatabaseConnection,
};

