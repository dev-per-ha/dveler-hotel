const { pool } = require("../config/database");

// ========================================
// Find Admin By Email
// ========================================

const findAdminByEmail = async (email) => {
  const [admins] = await pool.query(
    `
      SELECT
        id,
        name,
        email,
        password,
        role,
        created_at,
        updated_at
      FROM admins
      WHERE email = ?
      LIMIT 1
    `,
    [email]
  );

  return admins[0] || null;
};

// ========================================
// Find Admin By ID
// ========================================

const findAdminById = async (adminId) => {
  const [admins] = await pool.query(
    `
      SELECT
        id,
        name,
        email,
        role,
        created_at,
        updated_at
      FROM admins
      WHERE id = ?
      LIMIT 1
    `,
    [adminId]
  );

  return admins[0] || null;
};

// ========================================
// Get Dashboard Room Statistics
// ========================================

const getDashboardStatistics = async () => {
  const [roomStatistics] =
    await pool.query(
      `
        SELECT
          COUNT(*) AS total_rooms,

          COALESCE(
            SUM(
              CASE
                WHEN status = 'available'
                THEN 1
                ELSE 0
              END
            ),
            0
          ) AS available_room_types,

          COALESCE(
            SUM(
              CASE
                WHEN status = 'maintenance'
                THEN 1
                ELSE 0
              END
            ),
            0
          ) AS maintenance_room_types,

          COALESCE(
            SUM(total_rooms),
            0
          ) AS total_room_units,

          COALESCE(
            SUM(available),
            0
          ) AS available_room_units

        FROM rooms
      `
    );

  return {
    rooms:
      roomStatistics[0],
  };
};

// ========================================
// Exports
// ========================================

module.exports = {
  findAdminByEmail,
  findAdminById,
  getDashboardStatistics,
};

