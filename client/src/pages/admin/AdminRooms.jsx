import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Edit3,
  Hotel,
  Loader2,
  Image as ImageIcon,
  Plus,
  RefreshCw,
  Settings,
  Trash2,
  Users,
  Home,
} from "lucide-react";
import { toast } from "sonner";

import RoomFormModal from "../../components/admin/RoomFormModal";
import RoomManagementModal from "../../components/admin/RoomManagementModal";
import RoomImagesModal from "../../components/admin/RoomImagesModal";

const API_URL =
  "http://localhost:5000/api/admin/rooms";

const AdminRooms = () => {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // ========================================
  // Add / Edit Room
  // ========================================

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [selectedRoom, setSelectedRoom] =
    useState(null);

  // ========================================
  // Manage Room
  // ========================================

  const [isManagementOpen, setIsManagementOpen] =
    useState(false);

  const [managementRoom, setManagementRoom] =
    useState(null);

  // ========================================
  // Manage Images
  // ========================================

  const [isImagesOpen, setIsImagesOpen] =
    useState(false);

  const [imagesRoom, setImagesRoom] =
    useState(null);

  // ========================================
  // Go To Public Home
  // ========================================

  const handleGoToHome = () => {
    navigate("/");
  };

  // ========================================
  // Manage Images
  // ========================================

  const handleManageImages = (room) => {
    setImagesRoom(room);
    setIsImagesOpen(true);
  };

  const handleCloseImages = () => {
    setIsImagesOpen(false);
    setImagesRoom(null);
  };

  // ========================================
  // Get Rooms
  // ========================================

  const getRooms = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to retrieve rooms."
        );
      }

      console.log("Admin rooms:", data);

      setRooms(data.data || []);

      // --------------------------------
      // Refresh Success Toast
      // --------------------------------

      if (isRefresh) {
        toast.success(
          "Room inventory refreshed successfully."
        );
      }
    } catch (roomsError) {
      console.error(
        "Admin rooms error:",
        roomsError
      );

      const message =
        roomsError.message ||
        "Unable to load rooms.";

      setError(message);

      // --------------------------------
      // Refresh Error Toast
      // --------------------------------

      if (isRefresh) {
        toast.error(
          "Unable to refresh rooms.",
          {
            description: message,
          }
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ========================================
  // Silent Room Refresh
  // ========================================
  // Used after creating, editing, or managing
  // a room so the page updates without showing
  // another refresh loading message/toast.

  const refreshRoomsSilently = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to refresh room data."
        );
      }

      setRooms(data.data || []);
      setError("");
    } catch (refreshError) {
      console.error(
        "Silent room refresh error:",
        refreshError
      );

      // Do not replace the successful update
      // toast with a second refresh toast.
      // Show a small error only if the background
      // refresh itself fails.

      toast.error(
        "Room was saved, but the list could not be refreshed.",
        {
          description:
            "Please use the Refresh button to reload the latest room data.",
        }
      );
    }
  };

  // ========================================
  // Add Room
  // ========================================

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setIsFormOpen(true);
  };

  // ========================================
  // Edit Room
  // ========================================

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    setIsFormOpen(true);
  };

  // ========================================
  // Close Add / Edit Modal
  // ========================================

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRoom(null);
  };

  // ========================================
  // Room Saved
  // ========================================

  const handleRoomSaved = (savedRoom) => {
    const wasEditing = Boolean(selectedRoom);

    handleCloseForm();

    // --------------------------------
    // Show ONLY the save success toast.
    // The room list refresh happens silently.
    // --------------------------------

    toast.success(
      wasEditing
        ? "Room updated successfully."
        : "Room created successfully.",
      {
        description: savedRoom?.name
          ? savedRoom.name
          : undefined,
      }
    );

    // --------------------------------
    // Silent background refresh
    // --------------------------------

    refreshRoomsSilently();
  };

  // ========================================
  // Manage Room
  // ========================================

  const handleManageRoom = (room) => {
    setManagementRoom(room);
    setIsManagementOpen(true);
  };

  // ========================================
  // Close Management Modal
  // ========================================

  const handleCloseManagement = () => {
    setIsManagementOpen(false);
    setManagementRoom(null);
  };

  // ========================================
  // Management Saved
  // ========================================

  const handleManagementSaved = () => {
    handleCloseManagement();

    // --------------------------------
    // Show ONLY the management success toast
    // --------------------------------

    toast.success(
      "Room settings updated successfully."
    );

    // --------------------------------
    // Silent background refresh
    // --------------------------------

    refreshRoomsSilently();
  };

  // ========================================
  // Load Rooms
  // ========================================

  useEffect(() => {
    getRooms();
  }, []);

  // ========================================
  // Delete Room
  // ========================================

  const handleDeleteRoom = async (room) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${room.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/${room.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete room."
        );
      }

      setRooms((previousRooms) =>
        previousRooms.filter(
          (item) => item.id !== room.id
        )
      );

      // --------------------------------
      // Delete Success Toast
      // --------------------------------

      toast.success(
        "Room deleted successfully.",
        {
          description: `"${room.name}" has been removed from your room inventory.`,
        }
      );
    } catch (deleteError) {
      console.error(
        "Delete room error:",
        deleteError
      );

      const message =
        deleteError.message ||
        "Unable to delete room.";

      setError(message);

      // --------------------------------
      // Delete Error Toast
      // --------------------------------

      toast.error(
        "Unable to delete room.",
        {
          description: message,
        }
      );
    }
  };

  // ========================================
  // Loading
  // ========================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF9F6] text-[#C89B3C]">
            <Loader2
              size={28}
              className="animate-spin"
            />
          </div>

          <p className="mt-4 text-sm font-medium text-[#737373]">
            Loading rooms...
          </p>

          <p className="mt-1 text-xs text-[#A3A3A3]">
            Preparing your room inventory
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // Summary Calculations
  // ========================================

  const totalUnits = rooms.reduce(
    (total, room) =>
      total +
      Number(room.total_rooms || 0),
    0
  );

  const availableUnits = rooms.reduce(
    (total, room) =>
      total +
      Number(room.available || 0),
    0
  );

  const maintenanceRooms = rooms.filter(
    (room) =>
      String(room.status).toLowerCase() ===
      "maintenance"
  ).length;

  // ========================================
  // Render
  // ========================================

  return (
    <div className="space-y-8">
      {/* ========================================
          PAGE HEADER
      ======================================== */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C89B3C]" />

            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A77D25]">
              Hotel Management
            </p>
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#171717] sm:text-4xl">
            Rooms
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#737373]">
            Manage your hotel's rooms,
            inventory, availability, and room
            images.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Go To Home */}

          <button
            type="button"
            onClick={handleGoToHome}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#E7E5E1] bg-white px-5 text-sm font-semibold text-[#555555] shadow-sm transition duration-300 hover:border-[#C89B3C] hover:bg-[#FAF9F6] hover:text-[#A77D25]"
          >
            <Home size={16} />
            Go to Home
          </button>

          {/* Refresh */}

          <button
            type="button"
            onClick={() => getRooms(true)}
            disabled={refreshing}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#E7E5E1] bg-white px-5 text-sm font-semibold text-[#555555] shadow-sm transition duration-300 hover:border-[#C89B3C] hover:bg-[#FAF9F6] hover:text-[#A77D25] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>

          {/* Add Room */}

          <button
            type="button"
            onClick={handleAddRoom}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#171717] px-5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#C89B3C] hover:shadow-lg hover:shadow-black/10 active:translate-y-0"
          >
            <Plus size={17} />
            Add Room
          </button>
        </div>
      </div>

      {/* ========================================
          ERROR
      ======================================== */}

      {error && (
        <div
          role="alert"
          className="flex items-start gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm">
            <AlertCircle size={20} />
          </div>

          <div className="min-w-0">
            <p className="font-semibold">
              Room operation failed
            </p>

            <p className="mt-1 text-sm leading-6 text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => {
                setError("");
                getRooms();
              }}
              className="mt-3 text-xs font-semibold text-red-700 underline underline-offset-4 transition hover:text-red-900"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* ========================================
          SUMMARY CARDS
      ======================================== */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* Room Types */}

        <div className="group rounded-3xl border border-[#E7E5E1] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#DED9CC] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">
                Room Types
              </p>

              <p className="mt-3 text-3xl font-semibold tracking-tight text-[#171717]">
                {rooms.length}
              </p>

              <p className="mt-2 text-xs text-[#737373]">
                Room categories
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FAF9F6] text-[#C89B3C] transition duration-300 group-hover:bg-[#F5EAD2]">
              <Hotel
                size={22}
                strokeWidth={1.8}
              />
            </div>
          </div>
        </div>

        {/* Total Units */}

        <div className="group rounded-3xl border border-[#E7E5E1] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#DED9CC] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">
                Total Units
              </p>

              <p className="mt-3 text-3xl font-semibold tracking-tight text-[#171717]">
                {totalUnits}
              </p>

              <p className="mt-2 text-xs text-[#737373]">
                Physical rooms
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FAF9F6] text-[#A77D25] transition duration-300 group-hover:bg-[#F5EAD2]">
              <Hotel
                size={22}
                strokeWidth={1.8}
              />
            </div>
          </div>
        </div>

        {/* Available Units */}

        <div className="group rounded-3xl border border-[#E7E5E1] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#DED9CC] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">
                Available Units
              </p>

              <p className="mt-3 text-3xl font-semibold tracking-tight text-[#171717]">
                {availableUnits}
              </p>

              <p className="mt-2 text-xs text-emerald-600">
                Currently available
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition duration-300 group-hover:bg-emerald-100">
              <Hotel
                size={22}
                strokeWidth={1.8}
              />
            </div>
          </div>
        </div>

        {/* Maintenance */}

        <div className="group rounded-3xl border border-[#E7E5E1] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#DED9CC] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">
                Maintenance
              </p>

              <p className="mt-3 text-3xl font-semibold tracking-tight text-[#171717]">
                {maintenanceRooms}
              </p>

              <p className="mt-2 text-xs text-[#737373]">
                Room types under maintenance
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F4F1] text-[#737373] transition duration-300 group-hover:bg-[#E7E5E1]">
              <Settings
                size={22}
                strokeWidth={1.8}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================
          ROOM LIST
      ======================================== */}

      {rooms.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#D6D3CD] bg-white px-6 py-20 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAF9F6] text-[#C89B3C]">
            <Hotel
              size={32}
              strokeWidth={1.5}
            />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-[#171717]">
            No rooms found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#737373]">
            Add your first room to begin
            managing your hotel's room
            inventory.
          </p>

          <button
            type="button"
            onClick={handleAddRoom}
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#171717] px-5 text-sm font-semibold text-white transition duration-300 hover:bg-[#C89B3C]"
          >
            <Plus size={17} />
            Add First Room
          </button>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => {
            const totalRooms =
              Number(room.total_rooms || 0);

            const availableRooms =
              Number(room.available || 0);

            const availabilityPercentage =
              totalRooms > 0
                ? Math.round(
                    (availableRooms /
                      totalRooms) *
                      100
                  )
                : 0;

            const isMaintenance =
              String(room.status).toLowerCase() ===
              "maintenance";

            return (
              <article
                key={room.id}
                className="group overflow-hidden rounded-3xl border border-[#E7E5E1] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#DED9CC] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              >
                {/* IMAGE */}

                <div className="relative h-56 overflow-hidden bg-[#F5F4F1]">
                  {room.primary_image ||
                  room.image_url ||
                  room.image ? (
                    <img
                      src={
                        room.primary_image ||
                        room.image_url ||
                        room.image
                      }
                      alt={
                        room.name ||
                        "Hotel room"
                      }
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#C9C7C2]">
                      <Hotel
                        size={46}
                        strokeWidth={1.2}
                      />
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent" />

                  <div className="absolute left-4 top-4">
                    <span
                      className={`rounded-full border px-3.5 py-1.5 text-[11px] font-bold capitalize tracking-wide shadow-sm backdrop-blur ${
                        isMaintenance
                          ? "border-white/10 bg-[#171717]/90 text-white"
                          : "border-white/20 bg-emerald-500/90 text-white"
                      }`}
                    >
                      {room.status ||
                        "available"}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-5 sm:p-6">
                  {/* Name + Price */}

                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-semibold tracking-tight text-[#171717]">
                        {room.name}
                      </h2>

                      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A77D25]">
                        {room.room_type ||
                          "Room"}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xl font-semibold tracking-tight text-[#171717]">
                        $
                        {Number(
                          room.price_per_night ||
                            0
                        ).toFixed(2)}
                      </p>

                      <p className="text-[11px] text-[#737373]">
                        per night
                      </p>
                    </div>
                  </div>

                  {/* Description */}

                  {room.description && (
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#737373]">
                      {room.description}
                    </p>
                  )}

                  {/* Details */}

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-[#E7E5E1] bg-[#FAF9F6] p-3.5">
                      <div className="flex items-center gap-2">
                        <Users
                          size={15}
                          className="text-[#C89B3C]"
                          strokeWidth={1.8}
                        />

                        <span className="text-[11px] font-medium text-[#737373]">
                          Capacity
                        </span>
                      </div>

                      <p className="mt-1.5 text-sm font-semibold text-[#171717]">
                        {room.capacity ||
                          0}{" "}
                        guests
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#E7E5E1] bg-[#FAF9F6] p-3.5">
                      <div className="flex items-center gap-2">
                        <Hotel
                          size={15}
                          className="text-[#C89B3C]"
                          strokeWidth={1.8}
                        />

                        <span className="text-[11px] font-medium text-[#737373]">
                          Units
                        </span>
                      </div>

                      <p className="mt-1.5 text-sm font-semibold text-[#171717]">
                        {availableRooms} /{" "}
                        {totalRooms}
                      </p>
                    </div>
                  </div>

                  {/* Availability */}

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold uppercase tracking-[0.1em] text-[#737373]">
                        Availability
                      </span>

                      <span className="font-semibold text-[#555555]">
                        {
                          availabilityPercentage
                        }
                        %
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#F1F0ED]">
                      <div
                        className="h-full rounded-full bg-[#C89B3C] transition-all duration-700"
                        style={{
                          width: `${availabilityPercentage}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="mt-6 grid grid-cols-2 gap-2 border-t border-[#E7E5E1] pt-5 sm:grid-cols-4">
                    {/* Manage */}

                    <button
                      type="button"
                      onClick={() =>
                        handleManageRoom(
                          room
                        )
                      }
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-[#E7E5E1] bg-white px-2 py-2 text-xs font-semibold text-[#555555] transition duration-300 hover:border-[#C89B3C] hover:bg-[#FAF9F6] hover:text-[#A77D25]"
                    >
                      <Settings
                        size={15}
                        strokeWidth={1.8}
                      />

                      Manage
                    </button>

                    {/* Edit */}

                    <button
                      type="button"
                      onClick={() =>
                        handleEditRoom(
                          room
                        )
                      }
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-[#E7E5E1] bg-white px-2 py-2 text-xs font-semibold text-[#555555] transition duration-300 hover:border-[#C89B3C] hover:bg-[#FAF9F6] hover:text-[#A77D25]"
                    >
                      <Edit3
                        size={15}
                        strokeWidth={1.8}
                      />

                      Edit
                    </button>

                    {/* Images */}

                    <button
                      type="button"
                      onClick={() =>
                        handleManageImages(
                          room
                        )
                      }
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-[#E7E5E1] bg-white px-2 py-2 text-xs font-semibold text-[#555555] transition duration-300 hover:border-[#C89B3c] hover:bg-[#FAF9F6] hover:text-[#A77D25]"
                    >
                      <ImageIcon
                        size={15}
                        strokeWidth={1.8}
                      />

                      Images
                    </button>

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteRoom(
                          room
                        )
                      }
                      className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-white px-2 py-2 text-xs font-semibold text-red-500 transition duration-300 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2
                        size={15}
                        strokeWidth={1.8}
                      />

                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ========================================
          ADD / EDIT ROOM MODAL
      ======================================== */}

      <RoomFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        room={selectedRoom}
        onSaved={handleRoomSaved}
      />

      {/* ========================================
          MANAGE ROOM MODAL
      ======================================== */}

      <RoomManagementModal
        isOpen={isManagementOpen}
        onClose={handleCloseManagement}
        room={managementRoom}
        onSaved={handleManagementSaved}
      />

      {/* ========================================
          ROOM IMAGES MODAL
      ======================================== */}

      <RoomImagesModal
        isOpen={isImagesOpen}
        onClose={handleCloseImages}
        room={imagesRoom}
      />
    </div>
  );
};

export default AdminRooms;
