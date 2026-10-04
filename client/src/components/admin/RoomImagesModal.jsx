import { useEffect, useState } from "react";

import {
  Check,
  ImagePlus,
  Loader2,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { toast } from "sonner";

const API_URL =
  "http://localhost:5000/api/admin/rooms";

const SERVER_URL =
  "http://localhost:5000";

// ========================================
// Get Image URL
// ========================================

const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return "";
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  return `${SERVER_URL}${imageUrl}`;
};

// ========================================
// Room Image Modal
// ========================================

const RoomImageModal = ({
  isOpen,
  onClose,
  room,
}) => {
  const [images, setImages] =
    useState([]);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [actionLoading, setActionLoading] =
    useState("");

  const [error, setError] =
    useState("");

  // ========================================
  // Load Images When Modal Opens
  // ========================================

  useEffect(() => {
    if (!isOpen || !room?.id) {
      return;
    }

    loadImages();
  }, [isOpen, room?.id]);

  // ========================================
  // Cleanup Preview URL
  // ========================================

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(
          previewUrl
        );
      }
    };
  }, [previewUrl]);

  // ========================================
  // Load Room Images
  // ========================================

  const loadImages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/${room.id}/images`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load room images."
        );
      }

      setImages(data.data || []);
    } catch (error) {
      console.error(
        "Load room images error:",
        error
      );

      const message =
        error.message ||
        "Failed to load room images.";

      setError(message);

      toast.error(
        "Could not load room images.",
        {
          description: message,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // Select File
  // ========================================

  const handleFileChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    setError("");

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    // ========================================
    // Allowed Image Types
    // ========================================

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      const message =
        "Only JPG, PNG, and WEBP images are allowed.";

      setError(message);

      toast.error(
        "Invalid image format.",
        {
          description: message,
        }
      );

      event.target.value = "";

      setSelectedFile(null);
      setPreviewUrl("");

      return;
    }

    // ========================================
    // Maximum 5 MB
    // ========================================

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      const message =
        "Image size must not exceed 5 MB.";

      setError(message);

      toast.error(
        "Image is too large.",
        {
          description: message,
        }
      );

      event.target.value = "";

      setSelectedFile(null);
      setPreviewUrl("");

      return;
    }

    // ========================================
    // Remove Previous Preview
    // ========================================

    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl
      );
    }

    const newPreviewUrl =
      URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(newPreviewUrl);
  };

  // ========================================
  // Upload Image
  // ========================================

  const handleUpload = async () => {
    if (!selectedFile) {
      const message =
        "Please select an image first.";

      setError(message);

      toast.error(
        "No image selected.",
        {
          description: message,
        }
      );

      return;
    }

    if (uploading || actionLoading) {
      return;
    }

    try {
      setUploading(true);
      setError("");

      const formData =
        new FormData();

      formData.append(
        "image",
        selectedFile
      );

      formData.append(
        "altText",
        `${room.name} room`
      );

      formData.append(
        "isPrimary",
        images.length === 0
          ? "true"
          : "false"
      );

      formData.append(
        "displayOrder",
        String(images.length + 1)
      );

      const response =
        await fetch(
          `${API_URL}/${room.id}/images`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to upload image."
        );
      }

      setSelectedFile(null);

      if (previewUrl) {
        URL.revokeObjectURL(
          previewUrl
        );
      }

      setPreviewUrl("");

      await loadImages();

      toast.success(
        "Image uploaded successfully.",
        {
          description:
            images.length === 0
              ? "This image is now the primary room image."
              : `${room.name} gallery has been updated.`,
        }
      );
    } catch (error) {
      console.error(
        "Upload image error:",
        error
      );

      const message =
        error.message ||
        "Failed to upload image.";

      setError(message);

      toast.error(
        "Image upload failed.",
        {
          description: message,
        }
      );
    } finally {
      setUploading(false);
    }
  };

  // ========================================
  // Set Primary Image
  // ========================================

  const handleSetPrimary = async (
    imageId
  ) => {
    if (
      uploading ||
      actionLoading
    ) {
      return;
    }

    try {
      setActionLoading(
        `primary-${imageId}`
      );

      setError("");

      const response =
        await fetch(
          `${API_URL}/${room.id}/images/${imageId}/primary`,
          {
            method: "PATCH",
            credentials: "include",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to set primary image."
        );
      }

      await loadImages();

      toast.success(
        "Primary image updated.",
        {
          description:
            "This image is now the main image for the room.",
        }
      );
    } catch (error) {
      console.error(
        "Set primary image error:",
        error
      );

      const message =
        error.message ||
        "Failed to set primary image.";

      setError(message);

      toast.error(
        "Could not update primary image.",
        {
          description: message,
        }
      );
    } finally {
      setActionLoading("");
    }
  };

  // ========================================
  // Delete Image
  // ========================================

  const handleDelete = async (
    imageId
  ) => {
    if (
      uploading ||
      actionLoading
    ) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this image?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(
        `delete-${imageId}`
      );

      setError("");

      const response =
        await fetch(
          `${API_URL}/${room.id}/images/${imageId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete image."
        );
      }

      await loadImages();

      toast.success(
        "Image deleted successfully.",
        {
          description:
            "The room gallery has been updated.",
        }
      );
    } catch (error) {
      console.error(
        "Delete image error:",
        error
      );

      const message =
        error.message ||
        "Failed to delete image.";

      setError(message);

      toast.error(
        "Could not delete image.",
        {
          description: message,
        }
      );
    } finally {
      setActionLoading("");
    }
  };

  // ========================================
  // Close Modal
  // ========================================

  const handleClose = () => {
    if (
      uploading ||
      actionLoading
    ) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl
      );
    }

    setSelectedFile(null);
    setPreviewUrl("");
    setError("");
    setImages([]);

    onClose();
  };

  // ========================================
  // Do Not Render
  // ========================================

  if (!isOpen || !room) {
    return null;
  }

  const hasActionLoading =
    Boolean(actionLoading);

  // ========================================
  // Render
  // ========================================

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/65 px-4 py-6 backdrop-blur-md sm:py-10"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          if (
            !uploading &&
            !hasActionLoading
          ) {
            handleClose();
          }
        }
      }}
    >
      <div
        className="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.28)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-images-title"
      >
        {/* ========================================
            HEADER
        ======================================== */}

        <div className="relative overflow-hidden bg-[#171717] px-6 py-7 sm:px-8">
          <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full border border-[#C89B3C]/15" />

          <div className="absolute -bottom-28 left-1/3 h-48 w-48 rounded-full border border-[#C89B3C]/10" />

          <div className="relative flex items-start justify-between gap-5">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#C89B3C]/25 bg-[#C89B3C]/10 text-[#C89B3C]">
                <ImagePlus
                  size={21}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-px w-6 shrink-0 bg-[#C89B3C]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.27em] text-[#C89B3C]">
                    Room Management
                  </p>
                </div>

                <h2
                  id="room-images-title"
                  className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                  Room Images
                </h2>

                <p className="mt-1.5 truncate text-sm text-gray-300">
                  {room.name}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={
                uploading ||
                hasActionLoading
              }
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition duration-300 hover:border-[#C89B3C]/40 hover:bg-[#C89B3C]/10 hover:text-[#C89B3C] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close room images"
            >
              <X
                size={19}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>

        {/* ========================================
            BODY
        ======================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-8">
          {/* ========================================
              ERROR MESSAGE
          ======================================== */}

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
                <X size={16} />
              </div>

              <div className="min-w-0">
                <p className="font-semibold">
                  Image action failed
                </p>

                <p className="mt-1 leading-5 text-red-600">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* ========================================
              UPLOAD SECTION
          ======================================== */}

          <section>
            <div className="mb-5">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#171717]">
                Add Room Image
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#737373]">
                Upload high-quality images to
                showcase this room to your guests.
              </p>
            </div>

            <div className="rounded-[24px] border border-dashed border-[#D6D3CC] bg-[#FAF9F6] p-5 sm:p-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F5EAD2] bg-white text-[#C89B3C] shadow-sm">
                  <ImagePlus
                    size={25}
                    strokeWidth={1.7}
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold tracking-tight text-[#171717]">
                  Upload Room Image
                </h3>

                <p className="mt-1.5 text-sm text-[#737373]">
                  JPG, PNG, or WEBP
                  <span className="mx-2 text-[#C89B3C]">
                    ·
                  </span>
                  Maximum 5 MB
                </p>

                {/* Choose File */}

                <label
                  className={`mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#C89B3C] hover:shadow-lg hover:shadow-black/10 ${
                    uploading ||
                    hasActionLoading
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }`}
                >
                  <Upload
                    size={16}
                    strokeWidth={2}
                  />

                  Choose Image

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={
                      handleFileChange
                    }
                    disabled={
                      uploading ||
                      hasActionLoading
                    }
                    className="hidden"
                  />
                </label>

                {/* Selected File */}

                {selectedFile && (
                  <div className="mt-6 w-full max-w-lg overflow-hidden rounded-[22px] border border-[#E7E5E1] bg-white p-4 text-left shadow-[0_8px_30px_rgba(0,0,0,0.05)] sm:p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#171717]">
                          {selectedFile.name}
                        </p>

                        <p className="mt-1 text-xs text-[#737373]">
                          {(
                            selectedFile.size /
                            1024 /
                            1024
                          ).toFixed(2)}{" "}
                          MB
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-[#F5EAD2] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#A77D25]">
                        Ready
                      </span>
                    </div>

                    {/* Preview */}

                    {previewUrl && (
                      <div className="mt-4 overflow-hidden rounded-2xl bg-[#F5F4F1]">
                        <img
                          src={previewUrl}
                          alt="Selected preview"
                          className="h-52 w-full object-cover sm:h-64"
                        />
                      </div>
                    )}

                    {/* Upload Button */}

                    <button
                      type="button"
                      onClick={
                        handleUpload
                      }
                      disabled={
                        uploading ||
                        hasActionLoading
                      }
                      className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#C89B3C] hover:shadow-lg hover:shadow-black/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {uploading ? (
                        <>
                          <Loader2
                            size={17}
                            className="animate-spin"
                          />

                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload
                            size={17}
                            strokeWidth={2}
                          />

                          Upload Image
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ========================================
              EXISTING IMAGES
          ======================================== */}

          <section className="mt-9">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#171717]">
                  Uploaded Images
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#737373]">
                  Manage your room gallery and
                  primary image.
                </p>
              </div>

              <div className="w-fit shrink-0 rounded-full border border-[#E7E5E1] bg-[#FAF9F6] px-3.5 py-1.5">
                <span className="text-xs font-semibold text-[#555555]">
                  {images.length}{" "}
                  {images.length === 1
                    ? "image"
                    : "images"}
                </span>
              </div>
            </div>

            {/* Loading */}

            {loading && (
              <div className="flex min-h-48 items-center justify-center rounded-[24px] border border-[#E7E5E1] bg-[#FAF9F6]">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#C89B3C] shadow-sm">
                    <Loader2
                      size={24}
                      className="animate-spin"
                    />
                  </div>

                  <p className="mt-3 text-sm font-medium text-[#737373]">
                    Loading room images...
                  </p>
                </div>
              </div>
            )}

            {/* No Images */}

            {!loading &&
              images.length === 0 && (
                <div className="rounded-[24px] border border-[#E7E5E1] bg-[#FAF9F6] px-6 py-14 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#C89B3C] shadow-sm">
                    <ImagePlus
                      size={25}
                      strokeWidth={1.7}
                    />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-[#171717]">
                    No images uploaded yet.
                  </p>

                  <p className="mx-auto mt-1.5 max-w-sm text-xs leading-5 text-[#737373]">
                    Choose an image above to start
                    building the gallery for this
                    room.
                  </p>
                </div>
              )}

            {/* Images */}

            {!loading &&
              images.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {images.map(
                    (image) => {
                      const isPrimary =
                        Number(
                          image.is_primary
                        ) === 1;

                      const primaryLoading =
                        actionLoading ===
                        `primary-${image.id}`;

                      const deleteLoading =
                        actionLoading ===
                        `delete-${image.id}`;

                      const imageActionBusy =
                        primaryLoading ||
                        deleteLoading ||
                        uploading ||
                        hasActionLoading;

                      return (
                        <div
                          key={image.id}
                          className="group overflow-hidden rounded-[22px] border border-[#E7E5E1] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#DDD9D0] hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
                        >
                          {/* Image */}

                          <div className="relative overflow-hidden bg-[#F5F4F1]">
                            <img
                              src={getImageUrl(
                                image.image_url
                              )}
                              alt={
                                image.alt_text ||
                                room.name
                              }
                              className="h-56 w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                            />

                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                            {isPrimary && (
                              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#C89B3C] px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">
                                <Star
                                  size={13}
                                  fill="currentColor"
                                  strokeWidth={1.8}
                                />

                                Primary
                              </div>
                            )}
                          </div>

                          {/* Image Information */}

                          <div className="p-4">
                            <p className="truncate text-sm font-semibold text-[#171717]">
                              {image.alt_text ||
                                "Room image"}
                            </p>

                            <p className="mt-1 text-[11px] text-[#8A8882]">
                              Room gallery image
                            </p>

                            {/* Actions */}

                            <div className="mt-4 flex gap-2">
                              {!isPrimary && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSetPrimary(
                                      image.id
                                    )
                                  }
                                  disabled={
                                    imageActionBusy
                                  }
                                  className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E7E5E1] bg-[#FAF9F6] px-3 py-2 text-xs font-semibold text-[#555555] transition duration-300 hover:border-[#C89B3C] hover:bg-[#F5EAD2] hover:text-[#A77D25] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {primaryLoading ? (
                                    <>
                                      <Loader2
                                        size={14}
                                        className="animate-spin"
                                      />

                                      Updating
                                    </>
                                  ) : (
                                    <>
                                      <Star
                                        size={14}
                                        strokeWidth={1.8}
                                      />

                                      Primary
                                    </>
                                  )}
                                </button>
                              )}

                              {isPrimary && (
                                <div className="flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-full border border-[#F5EAD2] bg-[#F5EAD2] px-3 py-2 text-xs font-semibold text-[#A77D25]">
                                  <Check
                                    size={14}
                                    strokeWidth={2}
                                  />

                                  Primary
                                </div>
                              )}

                              {/* Delete */}

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    image.id
                                  )
                                }
                                disabled={
                                  imageActionBusy
                                }
                                className="flex min-h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-600 transition duration-300 hover:border-red-200 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                aria-label={`Delete ${
                                  image.alt_text ||
                                  "room image"
                                }`}
                              >
                                {deleteLoading ? (
                                  <Loader2
                                    size={15}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Trash2
                                    size={15}
                                    strokeWidth={1.8}
                                  />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
          </section>
        </div>

        {/* ========================================
            FOOTER
        ======================================== */}

        <div className="border-t border-[#E7E5E1] bg-white px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={handleClose}
            disabled={
              uploading ||
              hasActionLoading
            }
            className="w-full min-h-12 rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#C89B3C] hover:shadow-lg hover:shadow-black/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomImageModal;

