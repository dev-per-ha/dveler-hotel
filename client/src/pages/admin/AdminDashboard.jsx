import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Hotel,
  Loader2,
  RefreshCw,
  Settings,
  TrendingUp,
  Home,
} from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // ========================================
  // Go To Public Home
  // ========================================

  const handleGoToHome = () => {
    navigate("/");
  };

  // ========================================
  // Get Dashboard Data
  // ========================================

  const getDashboard = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        "https://dveler-hotel-backend.onrender.com/api/admin/dashboard",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to retrieve dashboard data."
        );
      }

      setDashboard(data.data);

      // ========================================
      // Refresh Success Toast
      // ========================================

      if (isRefresh) {
        toast.success("Dashboard refreshed", {
          description:
            "The latest hotel information has been loaded.",
        });
      }
    } catch (dashboardError) {
      console.error("Dashboard error:", dashboardError);

      const message =
        dashboardError.message ||
        "Unable to load dashboard data.";

      setError(message);

      // ========================================
      // Error Toast
      // ========================================

      toast.error("Unable to load dashboard", {
        description: message,
      });

      // ========================================
      // Authentication Error
      // ========================================

      if (
        message.toLowerCase().includes("authentication") ||
        message.toLowerCase().includes("unauthorized") ||
        response?.status === 401
      ) {
        localStorage.removeItem("admin");

        toast.error("Session expired", {
          description:
            "Please sign in again to continue.",
        });

        navigate("/admin/login", {
          replace: true,
        });
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ========================================
  // Load Dashboard
  // ========================================

  useEffect(() => {
    getDashboard();
  }, []);

  // ========================================
  // Loading State
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
            Loading dashboard...
          </p>

          <p className="mt-1 text-xs text-[#A3A3A3]">
            Please wait a moment
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // Room Data
  // ========================================

  const rooms = dashboard?.rooms || {};

  const totalRoomTypes =
    Number(rooms.totalRoomTypes) || 0;

  const availableRoomTypes =
    Number(rooms.availableRoomTypes) || 0;

  const maintenanceRoomTypes =
    Number(rooms.maintenanceRoomTypes) || 0;

  const totalRoomUnits =
    Number(rooms.totalRoomUnits) || 0;

  const availableRoomUnits =
    Number(rooms.availableRoomUnits) || 0;

  // ========================================
  // Availability Percentage
  // ========================================

  const roomAvailabilityPercentage =
    totalRoomUnits > 0
      ? Math.round(
          (availableRoomUnits / totalRoomUnits) * 100
        )
      : 0;

  const unavailableRoomUnits = Math.max(
    totalRoomUnits - availableRoomUnits,
    0
  );

  // ========================================
  // Dashboard
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
            Dashboard
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#737373]">
            A clear overview of your hotel rooms,
            inventory, and current availability.
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
            onClick={() => getDashboard(true)}
            disabled={refreshing}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#E7E5E1] bg-white px-5 text-sm font-semibold text-[#555555] shadow-sm transition duration-300 hover:border-[#C89B3C] hover:bg-[#FAF9F6] hover:text-[#A77D25] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={
                refreshing ? "animate-spin" : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh Dashboard"}
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

          <div>
            <p className="font-semibold">
              Unable to load dashboard
            </p>

            <p className="mt-1 text-sm leading-6 text-red-600">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* ========================================
          ROOM STATISTICS
      ======================================== */}

      <section>
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp
              size={16}
              className="text-[#C89B3C]"
            />

            <h2 className="text-lg font-semibold text-[#171717]">
              Room Overview
            </h2>
          </div>

          <p className="mt-1 text-sm text-[#737373]">
            Current room inventory and manually
            controlled availability.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Room Types */}

          <div className="group rounded-3xl border border-[#E7E5E1] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#DED9CC] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">
                  Room Types
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-tight text-[#171717]">
                  {totalRoomTypes}
                </p>

                <p className="mt-2 text-xs text-[#737373]">
                  Total room categories
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

          {/* Available Room Types */}

          <div className="group rounded-3xl border border-[#E7E5E1] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#DED9CC] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">
                  Available Types
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-tight text-[#171717]">
                  {availableRoomTypes}
                </p>

                <p className="mt-2 text-xs text-emerald-600">
                  Currently available
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition duration-300 group-hover:bg-emerald-100">
                <CheckCircle2
                  size={22}
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </div>

          {/* Maintenance Room Types */}

          <div className="group rounded-3xl border border-[#E7E5E1] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#DED9CC] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">
                  Maintenance
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-tight text-[#171717]">
                  {maintenanceRoomTypes}
                </p>

                <p className="mt-2 text-xs text-[#737373]">
                  Currently under maintenance
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F5F4F1] text-[#737373] transition duration-300 group-hover:bg-[#E7E5E1]">
                <Settings
                  size={22}
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </div>

          {/* Total Room Units */}

          <div className="group rounded-3xl border border-[#E7E5E1] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-[#DED9CC] hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#737373]">
                  Room Units
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-tight text-[#171717]">
                  {totalRoomUnits}
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
        </div>
      </section>

      {/* ========================================
          AVAILABILITY SUMMARY
      ======================================== */}

      <section className="grid gap-6 lg:grid-cols-2">
        {/* Room Availability */}

        <div className="rounded-3xl border border-[#E7E5E1] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-[#171717]">
                Room Availability
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#737373]">
                Current manually controlled room
                availability.
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FAF9F6] text-[#C89B3C]">
              <Hotel
                size={20}
                strokeWidth={1.8}
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-semibold tracking-tight text-[#171717]">
                  {availableRoomUnits}
                </p>

                <p className="mt-1 text-sm text-[#737373]">
                  of {totalRoomUnits} rooms available
                </p>
              </div>

              <p className="text-xl font-semibold text-[#C89B3C]">
                {roomAvailabilityPercentage}%
              </p>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#F1F0ED]">
              <div
                className="h-full rounded-full bg-[#C89B3C] transition-all duration-700"
                style={{
                  width: `${roomAvailabilityPercentage}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-600">
                Available
              </p>

              <p className="mt-2 text-2xl font-semibold text-emerald-700">
                {availableRoomUnits}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E7E5E1] bg-[#FAF9F6] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#737373]">
                Unavailable
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#555555]">
                {unavailableRoomUnits}
              </p>
            </div>
          </div>
        </div>

        {/* Room Type Status */}

        <div className="rounded-3xl border border-[#E7E5E1] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-[#171717]">
                Room Type Status
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#737373]">
                Current status of your room
                categories.
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F5F4F1] text-[#737373]">
              <Settings
                size={20}
                strokeWidth={1.8}
              />
            </div>
          </div>

          <div className="mt-7 space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-sm font-medium text-[#555555]">
                  Available Types
                </span>
              </div>

              <span className="font-semibold text-emerald-700">
                {availableRoomTypes}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-[#E7E5E1] bg-[#FAF9F6] p-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#A3A3A3]" />

                <span className="text-sm font-medium text-[#555555]">
                  Maintenance Types
                </span>
              </div>

              <span className="font-semibold text-[#555555]">
                {maintenanceRoomTypes}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-[#F5EAD2] bg-[#F5EAD2]/60 p-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C89B3C]" />

                <span className="text-sm font-medium text-[#555555]">
                  Total Types
                </span>
              </div>

              <span className="font-semibold text-[#A77D25]">
                {totalRoomTypes}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          ROOM MANAGEMENT INFORMATION
      ======================================== */}

      <section className="overflow-hidden rounded-3xl border border-[#E7E5E1] bg-[#171717] shadow-[0_15px_45px_rgba(0,0,0,0.08)]">
        <div className="relative p-6 sm:p-7">
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border border-[#C89B3C]/15" />

          <div className="relative flex items-start gap-4 sm:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#C89B3C]/20 bg-[#C89B3C]/10 text-[#C89B3C]">
              <Settings
                size={21}
                strokeWidth={1.8}
              />
            </div>

            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C89B3C]">
                Availability Control
              </p>

              <h2 className="mt-2 text-lg font-semibold text-white">
                Manual Room Availability
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Room availability is controlled
                manually by the hotel administrator.
                Booking requests do not automatically
                decrease the available room count.
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                To change the number of available rooms
                or place a room type under maintenance,
                open the Rooms page and use the room
                management controls.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
