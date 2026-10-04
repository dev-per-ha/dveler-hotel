import { useEffect, useState } from "react";
import {
  AlertCircle,
  Hotel,
  Loader2,
  Save,
  Settings,
  X,
} from "lucide-react";
import { toast } from "sonner";

// ========================================
// Room Management Modal
// ========================================

const RoomManagementModal = ({
  isOpen,
  onClose,
  room,
  onSaved,
}) => {
  const [available, setAvailable] =
    useState("");

  const [status, setStatus] =
    useState("available");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // ========================================
  // Initialize Form
  // ========================================

  useEffect(() => {
    if (!isOpen || !room) {
      return;
    }

    setAvailable(
      room.available ??
        room.available_rooms ??
        ""
    );

    setStatus(
      room.status || "available"
    );

    setError("");
  }, [isOpen, room]);

  // ========================================
  // Handle Submit
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!room || loading) {
      return;
    }

    setError("");

    // ----------------------------------------
    // Prepare Values
    // ----------------------------------------

    const numericAvailable =
      Number(available);

    const totalRooms =
      Number(room.total_rooms || 0);

    // ----------------------------------------
    // Validation
    // ----------------------------------------

    if (available === "") {
      setError(
        "Please enter the number of available rooms."
      );
      return;
    }

    if (
      !Number.isFinite(
        numericAvailable
      )
    ) {
      setError(
        "Available rooms must be a valid number."
      );
      return;
    }

    if (numericAvailable < 0) {
      setError(
        "Available rooms cannot be negative."
      );
      return;
    }

    if (
      numericAvailable >
      totalRooms
    ) {
      setError(
        "Available rooms cannot exceed total rooms."
      );
      return;
    }

    try {
      setLoading(true);

      // ========================================
      // UPDATE AVAILABILITY
      // ========================================

      const availabilityResponse =
        await fetch(
          `http://localhost:5000/api/admin/rooms/${room.id}/availability`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            credentials: "include",

            body: JSON.stringify({
              available:
                numericAvailable,
            }),
          }
        );

      const availabilityData =
        await availabilityResponse.json();

      if (!availabilityResponse.ok) {
        throw new Error(
          availabilityData.message ||
            "Failed to update room availability."
        );
      }

      // ========================================
      // UPDATE STATUS
      // ========================================

      const statusResponse =
        await fetch(
          `http://localhost:5000/api/admin/rooms/${room.id}/status`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            credentials: "include",

            body: JSON.stringify({
              status,
            }),
          }
        );

      const statusData =
        await statusResponse.json();

      if (!statusResponse.ok) {
        throw new Error(
          statusData.message ||
            "Failed to update room status."
        );
      }

      // ========================================
      // Success
      // ========================================

      console.log(
        "Room management updated:",
        {
          availability:
            availabilityData,
          status: statusData,
        }
      );

      // AdminRooms is responsible for:
      // 1. Success toast
      // 2. Closing this modal
      // 3. Silently refreshing the room list
      onSaved?.();

      onClose?.();
    } catch (updateError) {
      console.error(
        "Room management error:",
        updateError
      );

      const message =
        updateError.message ||
        "Unable to update room.";

      setError(message);

      toast.error(
        "Unable to update room.",
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

  if (!isOpen || !room) {
    return null;
  }

  // ========================================
  // Availability Calculations
  // ========================================

  const totalRooms =
    Number(room.total_rooms || 0);

  const numericAvailable =
    Number(available || 0);

  const availabilityPercentage =
    totalRooms > 0
      ? Math.round(
          (numericAvailable /
            totalRooms) *
            100
        )
      : 0;

  const safeAvailabilityPercentage =
    Math.min(
      Math.max(
        availabilityPercentage,
        0
      ),
      100
    );

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
        className="relative w-full max-w-xl overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.28)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-management-title"
      >
        {/* ========================================
            HEADER
        ======================================== */}

        <div className="relative overflow-hidden bg-[#171717] px-6 py-7 sm:px-8">
          {/* Decorative Elements */}

          <div className="absolute -right-20 -top-24 h-52 w-52 rounded-full border border-[#C89B3C]/15" />

          <div className="absolute -bottom-28 left-1/3 h-48 w-48 rounded-full border border-[#C89B3C]/10" />

          <div className="relative flex items-start justify-between gap-5">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#C89B3C]/25 bg-[#C89B3C]/10 text-[#C89B3C]">
                <Settings
                  size={21}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-px w-6 bg-[#C89B3C]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C89B3C]">
                    Room Management
                  </p>
                </div>

                <h2
                  id="room-management-title"
                  className="mt-2 text-2xl font-semibold tracking-tight text-white"
                >
                  Manage Room
                </h2>

                <p className="mt-1.5 truncate text-sm text-gray-300">
                  {room.name}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition duration-300 hover:border-[#C89B3C]/40 hover:bg-[#C89B3C]/10 hover:text-[#C89B3C] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close room management"
            >
              <X
                size={19}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>

        {/* ========================================
            CONTENT
        ======================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-7 p-6 sm:p-8"
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

              <div className="min-w-0">
                <p className="font-semibold">
                  Unable to update room
                </p>

                <p className="mt-1 break-words leading-5 text-red-600">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* ========================================
              ROOM SUMMARY
          ======================================== */}

          <div className="rounded-2xl border border-[#E7E5E1] bg-[#FAF9F6] p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#C89B3C] shadow-sm">
                  <Hotel
                    size={19}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#171717]">
                    {room.name}
                  </p>

                  <p className="mt-1 text-xs text-[#737373]">
                    Total rooms:{" "}
                    <span className="font-semibold text-[#555555]">
                      {totalRooms}
                    </span>
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-2xl font-semibold tracking-tight text-[#171717]">
                  {numericAvailable}
                </p>

                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#737373]">
                  Available
                </p>
              </div>
            </div>

            {/* Availability Progress */}

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-[11px]">
                <span className="font-medium text-[#737373]">
                  Current availability
                </span>

                <span className="font-semibold text-[#A77D25]">
                  {safeAvailabilityPercentage}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#E7E5E1]">
                <div
                  className="h-full rounded-full bg-[#C89B3C] transition-all duration-300"
                  style={{
                    width: `${safeAvailabilityPercentage}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ========================================
              AVAILABILITY
          ======================================== */}

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                htmlFor="managed-room-availability"
                className="block text-sm font-semibold text-[#333333]"
              >
                Available Rooms
              </label>

              <span className="rounded-full bg-[#F5EAD2] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#A77D25]">
                Max {totalRooms}
              </span>
            </div>

            <input
              id="managed-room-availability"
              type="number"
              min="0"
              max={totalRooms}
              value={available}
              onChange={(event) => {
                setAvailable(
                  event.target.value
                );

                if (error) {
                  setError("");
                }
              }}
              disabled={loading}
              className="w-full rounded-xl border border-[#DAD8D2] bg-white px-4 py-3.5 text-sm text-[#171717] placeholder:text-[#A3A3A3] outline-none transition duration-300 focus:border-[#C89B3C] focus:ring-4 focus:ring-[#C89B3C]/10 disabled:cursor-not-allowed disabled:bg-[#F5F4F1]"
            />

            <p className="mt-2 text-xs leading-5 text-[#8A8882]">
              Set the number of rooms currently
              available for booking.
            </p>
          </div>

          {/* ========================================
              STATUS
          ======================================== */}

          <div>
            <label
              htmlFor="managed-room-status"
              className="mb-2 block text-sm font-semibold text-[#333333]"
            >
              Room Status
            </label>

            <select
              id="managed-room-status"
              value={status}
              onChange={(event) => {
                setStatus(
                  event.target.value
                );

                if (error) {
                  setError("");
                }
              }}
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

            <p className="mt-2 text-xs leading-5 text-[#8A8882]">
              Maintenance rooms will appear as
              unavailable to guests.
            </p>
          </div>

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

                  Saving...
                </>
              ) : (
                <>
                  <Save
                    size={17}
                    strokeWidth={2}
                  />

                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomManagementModal;
