import { useEffect, useState } from "react";
import {
  AlertCircle,
  BedDouble,
  DollarSign,
  Loader2,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";

// ========================================
// Empty Form
// ========================================

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  roomType: "Standard",
  pricePerNight: "",
  capacity: "",
  sizeSqm: "",
  bedType: "",
  totalRooms: "",
  available: "",
  status: "available",
};

// ========================================
// Create Slug
// ========================================

const createSlug = (value) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// ========================================
// Room Form Modal
// ========================================

const RoomFormModal = ({
  isOpen,
  onClose,
  room,
  onSaved,
}) => {
  const isEditing = Boolean(room);

  const [formData, setFormData] =
    useState(emptyForm);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ========================================
  // Initialize Form
  // ========================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (room) {
      setFormData({
        name: room.name || "",

        slug:
          room.slug ||
          createSlug(room.name || ""),

        description:
          room.description || "",

        roomType:
          room.room_type ||
          room.roomType ||
          "Standard",

        pricePerNight:
          room.price_per_night ??
          room.pricePerNight ??
          "",

        capacity:
          room.capacity ?? "",

        sizeSqm:
          room.size_sqm ??
          room.sizeSqm ??
          "",

        bedType:
          room.bed_type ||
          room.bedType ||
          "",

        totalRooms:
          room.total_rooms ??
          room.totalRooms ??
          "",

        available:
          room.available ??
          "",

        status:
          room.status ||
          "available",
      });
    } else {
      setFormData(emptyForm);
    }

    setError("");
  }, [isOpen, room]);

  // ========================================
  // Handle Input Change
  // ========================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // ========================================
  // Handle Room Name Change
  // ========================================

  const handleNameChange = (event) => {
    const value = event.target.value;

    setFormData((previous) => ({
      ...previous,
      name: value,

      // Automatically generate slug
      // only when creating a new room.
      ...(isEditing
        ? {}
        : {
            slug: createSlug(value),
          }),
    }));

    if (error) {
      setError("");
    }
  };

  // ========================================
  // Handle Submit
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    // ----------------------------------------
    // Prepare Values
    // ----------------------------------------

    const trimmedName =
      formData.name.trim();

    const trimmedSlug =
      formData.slug.trim();

    const numericPrice =
      Number(formData.pricePerNight);

    const numericCapacity =
      Number(formData.capacity);

    const numericSize =
      formData.sizeSqm === ""
        ? null
        : Number(formData.sizeSqm);

    const numericTotalRooms =
      Number(formData.totalRooms);

    const numericAvailable =
      formData.available === ""
        ? numericTotalRooms
        : Number(formData.available);

    // ----------------------------------------
    // Validation
    // ----------------------------------------

    if (!trimmedName) {
      setError(
        "Please enter a room name."
      );
      return;
    }

    if (!trimmedSlug) {
      setError(
        "Please enter a room slug."
      );
      return;
    }

    if (!/^[a-z0-9-]+$/.test(trimmedSlug)) {
      setError(
        "Slug can only contain lowercase letters, numbers, and hyphens."
      );
      return;
    }

    if (
      formData.pricePerNight === ""
    ) {
      setError(
        "Please enter the price per night."
      );
      return;
    }

    if (
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      setError(
        "Price must be a valid number and cannot be negative."
      );
      return;
    }

    if (formData.capacity === "") {
      setError(
        "Please enter the room capacity."
      );
      return;
    }

    if (
      !Number.isFinite(numericCapacity) ||
      numericCapacity < 1
    ) {
      setError(
        "Capacity must be at least 1."
      );
      return;
    }

    if (
      formData.sizeSqm !== "" &&
      (!Number.isFinite(numericSize) ||
        numericSize < 0)
    ) {
      setError(
        "Room size must be a valid number and cannot be negative."
      );
      return;
    }

    if (formData.totalRooms === "") {
      setError(
        "Please enter the total number of rooms."
      );
      return;
    }

    if (
      !Number.isFinite(numericTotalRooms) ||
      numericTotalRooms < 1
    ) {
      setError(
        "Total rooms must be at least 1."
      );
      return;
    }

    if (
      formData.available !== "" &&
      (!Number.isFinite(numericAvailable) ||
        numericAvailable < 0)
    ) {
      setError(
        "Available rooms cannot be negative."
      );
      return;
    }

    if (
      numericAvailable >
      numericTotalRooms
    ) {
      setError(
        "Available rooms cannot exceed total rooms."
      );
      return;
    }

    // ----------------------------------------
    // Save Room
    // ----------------------------------------

    try {
      setLoading(true);

      const payload = {
        name: trimmedName,

        slug: trimmedSlug,

        description:
          formData.description.trim(),

        roomType:
          formData.roomType,

        pricePerNight:
          numericPrice,

        capacity:
          numericCapacity,

        sizeSqm:
          numericSize,

        bedType:
          formData.bedType.trim() ||
          null,

        totalRooms:
          numericTotalRooms,

        available:
          numericAvailable,

        status:
          formData.status,
      };

      const url = isEditing
        ? `http://localhost:5000/api/admin/rooms/${room.id}`
        : "http://localhost:5000/api/admin/rooms";

      const method = isEditing
        ? "PUT"
        : "POST";

      const response = await fetch(
        url,
        {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify(payload),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to ${
              isEditing
                ? "update"
                : "create"
            } room.`
        );
      }

      console.log(
        isEditing
          ? "Room updated:"
          : "Room created:",
        data
      );

      // Parent AdminRooms handles
      // the success toast and silent refresh.
      onSaved?.(data);

      onClose?.();
    } catch (saveError) {
      console.error(
        "Room save error:",
        saveError
      );

      const message =
        saveError.message ||
        "Unable to save room.";

      setError(message);

      toast.error(
        isEditing
          ? "Unable to update room."
          : "Unable to create room.",
        {
          description: message,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // Don't Render When Closed
  // ========================================

  if (!isOpen) {
    return null;
  }

  // ========================================
  // Render
  // ========================================

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/65 px-4 py-6 backdrop-blur-md sm:py-10"
      onMouseDown={(event) => {
        if (
          event.target ===
            event.currentTarget &&
          !loading
        ) {
          onClose?.();
        }
      }}
    >
      <div
        className="relative max-h-[94vh] w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.28)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-form-title"
      >
        {/* ========================================
            HEADER
        ======================================== */}

        <div className="sticky top-0 z-20 overflow-hidden border-b border-[#E7E5E1] bg-[#171717] px-6 py-6 sm:px-8">
          {/* Decorative Elements */}

          <div className="absolute -right-16 -top-24 h-48 w-48 rounded-full border border-[#C89B3C]/15" />

          <div className="absolute -bottom-28 left-1/3 h-48 w-48 rounded-full border border-[#C89B3C]/10" />

          <div className="relative flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-px w-7 bg-[#C89B3C]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#C89B3C]">
                  Room Management
                </p>
              </div>

              <h2
                id="room-form-title"
                className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              >
                {isEditing
                  ? "Edit Room"
                  : "Add Room"}
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-gray-300">
                {isEditing
                  ? "Update the room information, pricing, inventory, and availability."
                  : "Create a new room type and add it to your hotel's inventory."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition duration-300 hover:border-[#C89B3C]/40 hover:bg-[#C89B3C]/10 hover:text-[#C89B3C] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close room form"
            >
              <X
                size={20}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>

        {/* ========================================
            FORM CONTENT
        ======================================== */}

        <div className="max-h-[calc(94vh-150px)] overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-8 p-6 sm:p-8"
          >
            {/* ========================================
                ERROR
            ======================================== */}

            {error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
                  <AlertCircle
                    size={17}
                  />
                </div>

                <div>
                  <p className="font-semibold">
                    Unable to save room
                  </p>

                  <p className="mt-1 leading-5 text-red-600">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* ========================================
                BASIC INFORMATION
            ======================================== */}

            <section>
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF9F6] text-[#C89B3C]">
                  <BedDouble
                    size={19}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#171717]">
                    Basic Information
                  </h3>

                  <p className="mt-1 text-xs text-[#737373]">
                    Define the room identity and description.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Room Name */}

                <div>
                  <label
                    htmlFor="room-name"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Room Name
                  </label>

                  <input
                    id="room-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="e.g. Deluxe Room"
                    disabled={loading}
                    autoComplete="off"
                    className="w-full rounded-xl border border-[#DAD8D2] bg-white px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#A3A3A3] outline-none transition duration-300 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
                  />
                </div>

                {/* Slug */}

                <div>
                  <label
                    htmlFor="room-slug"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Slug
                  </label>

                  <input
                    id="room-slug"
                    name="slug"
                    type="text"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="e.g. deluxe-room"
                    disabled={loading}
                    autoComplete="off"
                    className="w-full rounded-xl border border-[#DAD8D2] bg-white px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#A3A3A3] outline-none transition duration-300 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
                  />

                  <p className="mt-2 text-xs leading-5 text-[#8A8882]">
                    Used as the room's unique,
                    URL-friendly identifier.
                  </p>
                </div>

                {/* Description */}

                <div>
                  <label
                    htmlFor="room-description"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Description
                  </label>

                  <textarea
                    id="room-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the room, its atmosphere, features, and guest experience..."
                    disabled={loading}
                    className="w-full resize-none rounded-xl border border-[#DAD8D2] bg-white px-4 py-3.5 text-sm leading-6 text-[#171717] placeholder:text-[#A3A3A3] outline-none transition duration-300 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
                  />
                </div>

                {/* Room Type */}

                <div>
                  <label
                    htmlFor="room-type"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Room Type
                  </label>

                  <select
                    id="room-type"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full rounded-xl border border-[#DAD8D2] bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition duration-300 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
                  >
                    <option value="Standard">
                      Standard
                    </option>

                    <option value="Deluxe">
                      Deluxe
                    </option>

                    <option value="Suite">
                      Suite
                    </option>
                  </select>
                </div>
              </div>
            </section>

            <div className="h-px bg-[#E7E5E1]" />

            {/* ========================================
                ROOM DETAILS
            ======================================== */}

            <section>
              <div className="mb-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#171717]">
                  Room Details
                </h3>

                <p className="mt-1 text-xs text-[#737373]">
                  Configure pricing, capacity, size,
                  bed type, and inventory.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Price */}

                <div>
                  <label
                    htmlFor="room-price"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Price Per Night
                  </label>

                  <div className="relative">
                    <DollarSign
                      size={17}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8882]"
                    />

                    <input
                      id="room-price"
                      name="pricePerNight"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.pricePerNight}
                      onChange={handleChange}
                      placeholder="45"
                      disabled={loading}
                      className="w-full rounded-xl border border-[#DAD8D2] bg-white py-3.5 pl-10 pr-4 text-sm text-[#171717] placeholder:text-[#A3A3A3] outline-none transition duration-300 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
                    />
                  </div>
                </div>

                {/* Capacity */}

                <div>
                  <label
                    htmlFor="room-capacity"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Capacity
                  </label>

                  <div className="relative">
                    <Users
                      size={17}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8882]"
                    />

                    <input
                      id="room-capacity"
                      name="capacity"
                      type="number"
                      min="1"
                      value={formData.capacity}
                      onChange={handleChange}
                      placeholder="2"
                      disabled={loading}
                      className="w-full rounded-xl border border-[#DAD8D2] bg-white py-3.5 pl-10 pr-4 text-sm text-[#171717] placeholder:text-[#A3A3A3] outline-none transition duration-300 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
                    />
                  </div>
                </div>

                {/* Size */}

                <div>
                  <label
                    htmlFor="room-size"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Size (m²)
                  </label>

                  <input
                    id="room-size"
                    name="sizeSqm"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.sizeSqm}
                    onChange={handleChange}
                    placeholder="24"
                    disabled={loading}
                    className="w-full rounded-xl border border-[#DAD8D2] bg-white px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#A3A3A3] outline-none transition duration-300 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
                  />
                </div>

                {/* Bed Type */}

                <div>
                  <label
                    htmlFor="room-bed"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Bed Type
                  </label>

                  <div className="relative">
                    <BedDouble
                      size={17}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8882]"
                    />

                    <input
                      id="room-bed"
                      name="bedType"
                      type="text"
                      value={formData.bedType}
                      onChange={handleChange}
                      placeholder="Queen Bed"
                      disabled={loading}
                      className="w-full rounded-xl border border-[#DAD8D2] bg-white py-3.5 pl-10 pr-4 text-sm text-[#171717] placeholder:text-[#A3A3A3] outline-none transition duration-300 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
                    />
                  </div>
                </div>

                {/* Total Rooms */}

                <div>
                  <label
                    htmlFor="room-total"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Total Rooms
                  </label>

                  <input
                    id="room-total"
                    name="totalRooms"
                    type="number"
                    min="1"
                    value={formData.totalRooms}
                    onChange={handleChange}
                    placeholder="5"
                    disabled={loading}
                    className="w-full rounded-xl border border-[#DAD8D2] bg-white px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#A3A3A3] outline-none transition duration-300 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
                  />
                </div>

                {/* Available Rooms */}

                <div>
                  <label
                    htmlFor="room-available"
                    className="mb-2 block text-sm font-semibold text-[#333333]"
                  >
                    Available Rooms
                  </label>

                  <input
                    id="room-available"
                    name="available"
                    type="number"
                    min="0"
                    value={formData.available}
                    onChange={handleChange}
                    placeholder="5"
                    disabled={loading}
                    className="w-full rounded-xl border border-[#DAD8D2] bg-white px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#A3A3A3] outline-none transition duration-300 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
                  />

                  <p className="mt-2 text-xs text-[#8A8882]">
                    Cannot be greater than total rooms.
                  </p>
                </div>
              </div>
            </section>

            <div className="h-px bg-[#E7E5E1]" />

            {/* ========================================
                STATUS
            ======================================== */}

            <section>
              <div className="mb-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[#171717]">
                  Status
                </h3>

                <p className="mt-1 text-xs text-[#737373]">
                  Control whether this room type can
                  currently be booked.
                </p>
              </div>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={loading}
                className="w-full rounded-xl border border-[#DAD8D2] bg-white px-4 py-3.5 text-sm text-[#171717] outline-none transition duration-300 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
              >
                <option value="available">
                  Available
                </option>

                <option value="maintenance">
                  Maintenance
                </option>
              </select>
            </section>

            {/* ========================================
                ACTIONS
            ======================================== */}

            <div className="flex flex-col-reverse gap-3 border-t border-[#E7E5E1] pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="min-h-12 rounded-full border border-[#DAD8D2] bg-white px-6 text-sm font-semibold text-[#555555] transition duration-300 hover:border-[#C89B3C] hover:bg-[#FAF9F6] hover:text-[#171717] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#171717] px-7 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#C89B3C] hover:shadow-lg hover:shadow-black/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    {isEditing
                      ? "Updating..."
                      : "Creating..."}
                  </>
                ) : isEditing ? (
                  "Update Room"
                ) : (
                  "Create Room"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomFormModal;

