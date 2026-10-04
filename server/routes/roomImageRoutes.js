const express = require("express");
const multer = require("multer");

const {
  getRoomImages,
  createRoomImage,
  updateRoomImage,
  setPrimaryRoomImage,
  deleteRoomImage,
} = require("../controllers/roomImageController");

const {
  requireAdminAuth,
} = require("../middleware/adminAuth");

const router = express.Router();

// ========================================
// Multer Configuration
// ========================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/rooms");
  },

  filename: (req, file, cb) => {
    const extension =
      file.originalname.split(".").pop();

    const fileName =
      `room-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}.${extension}`;

    cb(null, fileName);
  },
});

// ========================================
// File Filter
// ========================================

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG, and WEBP images are allowed."
      ),
      false
    );
  }
};

// ========================================
// Upload Configuration
// ========================================

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// ========================================
// GET /api/admin/rooms/:roomId/images
// Get Room Images
// ========================================

router.get(
  "/:roomId/images",
  requireAdminAuth,
  getRoomImages
);

// ========================================
// POST /api/admin/rooms/:roomId/images
// Upload Room Image
// ========================================

router.post(
  "/:roomId/images",
  requireAdminAuth,
  upload.single("image"),
  createRoomImage
);

// ========================================
// PUT /api/admin/rooms/:roomId/images/:imageId
// Update Room Image
// ========================================

router.put(
  "/:roomId/images/:imageId",
  requireAdminAuth,
  updateRoomImage
);

// ========================================
// PATCH /api/admin/rooms/:roomId/images/:imageId/primary
// Set Primary Room Image
// ========================================

router.patch(
  "/:roomId/images/:imageId/primary",
  requireAdminAuth,
  setPrimaryRoomImage
);

// ========================================
// DELETE /api/admin/rooms/:roomId/images/:imageId
// Delete Room Image
// ========================================

router.delete(
  "/:roomId/images/:imageId",
  requireAdminAuth,
  deleteRoomImage
);

module.exports = router;

