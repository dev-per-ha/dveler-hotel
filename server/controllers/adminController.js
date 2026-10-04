const adminService = require("../services/adminService");

// ========================================
// Admin Login
// ========================================

const loginAdmin = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const result =
      await adminService.loginAdmin(
        email,
        password
      );

    res.cookie(
      "admin_token",
      result.token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
        maxAge:
          24 * 60 * 60 * 1000,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Admin login successful.",
      data: {
        admin: result.admin,
      },
    });
  } catch (error) {
    console.error(
      "Admin login error:",
      error.message
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Admin login failed.",
    });
  }
};

// ========================================
// Get Dashboard Statistics
// ========================================

const getDashboardStatistics = async (
  req,
  res
) => {
  try {
    const statistics =
      await adminService.getDashboardStatistics();

    return res.status(200).json({
      success: true,
      message:
        "Dashboard statistics retrieved successfully.",
      data: statistics,
    });
  } catch (error) {
    console.error(
      "Get dashboard statistics error:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to retrieve dashboard statistics.",
    });
  }
};


// ========================================
// Admin Logout
// ========================================

const logoutAdmin = (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.status(200).json({
    success: true,
    message: "Admin logged out successfully.",
  });
};



module.exports = {
  loginAdmin,
  getDashboardStatistics,
  logoutAdmin,
};

