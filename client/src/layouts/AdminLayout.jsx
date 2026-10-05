import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Hotel,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminLayout = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // ========================================
  // Load Admin Information
  // ========================================

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (error) {
        console.error(
          "Failed to read admin information:",
          error
        );

        localStorage.removeItem("admin");
      }
    }
  }, []);

  // ========================================
  // Admin Navigation
  // ========================================

  const navigationItems = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Rooms",
      path: "/admin/rooms",
      icon: Hotel,
    },
  ];

  // ========================================
  // Logout
  // ========================================

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }

    try {
      setLoggingOut(true);

      const response = await fetch(
        "https://dveler-hotel-backend.onrender.com/api/admin/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to complete logout request."
        );
      }

      // Clear local admin information.
      localStorage.removeItem("admin");
      setAdmin(null);

      // Close mobile sidebar if open.
      setSidebarOpen(false);

      // Success toast.
      toast.success("Logged out successfully.", {
        description:
          "Your administrator session has been securely ended.",
        duration: 3000,
      });

      // Redirect to login.
      navigate("/admin/login", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Logout request failed:",
        error
      );

      // Even if the server request fails,
      // remove the local session.
      localStorage.removeItem("admin");
      setAdmin(null);
      setSidebarOpen(false);

      toast.error("Logout completed locally.", {
        description:
          "The server could not be reached, but your local admin session was removed.",
        duration: 4000,
      });

      navigate("/admin/login", {
        replace: true,
      });
    } finally {
      setLoggingOut(false);
    }
  };

  // ========================================
  // Close Mobile Sidebar
  // ========================================

  const handleNavigation = () => {
    setSidebarOpen(false);
  };

  // ========================================
  // Admin Initial
  // ========================================

  const adminInitial = (
    admin?.name || "Administrator"
  )
    .charAt(0)
    .toUpperCase();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f6f2] text-[#20201e]">

      {/* ========================================
          Mobile Header
      ======================================== */}

      <header className="sticky top-0 z-30 flex h-[64px] items-center justify-between border-b border-[#e7e4dc] bg-white/95 px-3 shadow-[0_2px_15px_rgba(0,0,0,0.04)] backdrop-blur-md sm:h-[68px] sm:px-5 lg:hidden">

        {/* Mobile Menu Button */}

        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e5e2da] bg-white text-[#55534d] transition-all duration-300 active:scale-95 hover:border-[#c89b3c] hover:bg-[#faf7ef] hover:text-[#a77d25]"
          aria-label="Open admin menu"
        >
          <Menu
            size={20}
            strokeWidth={1.8}
          />
        </button>

        {/* Mobile Logo */}

        <div className="min-w-0 flex-1 px-3 text-center">
          <p className="truncate text-[17px] font-semibold tracking-[-0.03em] text-[#20201e] sm:text-lg">
            DevPer
          </p>

          <div className="mt-0.5 flex items-center justify-center gap-1.5">
            <span className="h-px w-3 bg-[#c89b3c]" />

            <span className="text-[7px] font-bold uppercase tracking-[0.25em] text-[#a77d25] sm:text-[8px]">
              Admin
            </span>

            <span className="h-px w-3 bg-[#c89b3c]" />
          </div>
        </div>

        {/* Mobile Avatar */}

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f5ead2] text-sm font-semibold text-[#a77d25]">
          {adminInitial}
        </div>
      </header>

      {/* ========================================
          Mobile Overlay
      ======================================== */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close admin menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#111]/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* ========================================
          Sidebar
      ======================================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[#e5e2da] bg-white shadow-[15px_0_45px_rgba(0,0,0,0.08)] transition-all duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          collapsed
            ? "lg:w-[82px]"
            : "w-[min(86vw,300px)] lg:w-[270px]"
        } ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* ========================================
            Sidebar Header
        ======================================== */}

        <div
          className={`flex h-[76px] shrink-0 items-center border-b border-[#e9e6df] ${
            collapsed
              ? "justify-center px-3"
              : "justify-between px-4 sm:px-5"
          }`}
        >

          {/* Logo */}

          {!collapsed ? (
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#20201e] text-[#d7b45d]">
                  <Hotel
                    size={18}
                    strokeWidth={1.7}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xl font-semibold tracking-[-0.04em] text-[#20201e]">
                    DevPer
                  </p>

                  <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#a77d25]">
                    Hotel Admin
                  </p>
                </div>

              </div>
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#20201e] text-[#d7b45d]">
              <Hotel
                size={19}
                strokeWidth={1.7}
              />
            </div>
          )}

          {/* Desktop Collapse / Mobile Close */}

          <button
            type="button"
            onClick={() => {
              if (collapsed) {
                setCollapsed(false);
                return;
              }

              setSidebarOpen(false);
            }}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#e7e4dc] bg-white text-[#77746d] transition-all duration-300 active:scale-95 hover:border-[#c89b3c] hover:bg-[#faf7ef] hover:text-[#a77d25] ${
              collapsed
                ? "lg:hidden"
                : ""
            }`}
            aria-label="Close admin menu"
          >
            <X
              size={18}
              strokeWidth={1.8}
              className="lg:hidden"
            />

            {!collapsed && (
              <ChevronLeft
                size={18}
                strokeWidth={1.8}
                className="hidden lg:block"
              />
            )}
          </button>

        </div>

        {/* ========================================
            Desktop Expand Button
        ======================================== */}

        {collapsed && (
          <div className="hidden justify-center border-b border-[#e9e6df] py-3 lg:flex">
            <button
              type="button"
              onClick={() => setCollapsed(false)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e7e4dc] bg-white text-[#77746d] transition-all duration-300 hover:border-[#c89b3c] hover:bg-[#faf7ef] hover:text-[#a77d25]"
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <ChevronRight
                size={18}
                strokeWidth={1.8}
              />
            </button>
          </div>
        )}

        {/* ========================================
            Navigation Label
        ======================================== */}

        {!collapsed && (
          <div className="px-5 pb-2 pt-6 sm:pt-7">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#aaa79f]">
              Management
            </p>
          </div>
        )}

        {/* ========================================
            Navigation
        ======================================== */}

        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                title={
                  collapsed
                    ? item.label
                    : undefined
                }
                className={({ isActive }) =>
                  `group relative flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                    collapsed
                      ? "justify-center"
                      : ""
                  } ${
                    isActive
                      ? "bg-[#faf7ef] text-[#a77d25]"
                      : "text-[#6f6d67] hover:bg-[#f8f7f3] hover:text-[#20201e]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active Indicator */}

                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#c89b3c]" />
                    )}

                    {/* Icon */}

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-[#f2e6c9] text-[#a77d25]"
                          : "bg-transparent text-[#85827a] group-hover:bg-white group-hover:text-[#20201e]"
                      }`}
                    >
                      <Icon
                        size={18}
                        strokeWidth={
                          isActive
                            ? 1.9
                            : 1.7
                        }
                      />
                    </span>

                    {/* Label */}

                    {!collapsed && (
                      <>
                        <span className="flex-1">
                          {item.label}
                        </span>

                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#c89b3c]" />
                        )}
                      </>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* ========================================
            Admin Profile
        ======================================== */}

        <div className="border-t border-[#e9e6df] p-3">

          {/* Full Profile */}

          {!collapsed && admin && (
            <div className="mb-3 rounded-2xl border border-[#ebe8e1] bg-[#faf9f6] p-3">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#20201e] text-sm font-semibold text-[#d7b45d]">
                  {adminInitial}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#20201e]">
                    {admin.name ||
                      "Administrator"}
                  </p>

                  <p className="mt-0.5 truncate text-[11px] text-[#8a8780]">
                    {admin.email ||
                      "Admin account"}
                  </p>
                </div>

              </div>

              <div className="mt-3 flex items-center gap-2 border-t border-[#e8e5de] pt-3">
                <ShieldCheck
                  size={13}
                  className="text-[#a77d25]"
                  strokeWidth={1.8}
                />

                <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#8a8780]">
                  {admin.role ||
                    "Administrator"}
                </span>
              </div>

            </div>
          )}

          {/* Collapsed Admin */}

          {collapsed && (
            <div className="mb-3 flex justify-center">
              <div
                title={
                  admin?.name ||
                  "Administrator"
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#20201e] text-sm font-semibold text-[#d7b45d]"
              >
                {adminInitial}
              </div>
            </div>
          )}

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            title={
              collapsed
                ? "Logout"
                : undefined
            }
            className={`group flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#9b5550] transition-all duration-300 active:scale-[0.98] hover:bg-[#fff5f4] hover:text-[#b94c45] disabled:cursor-not-allowed disabled:opacity-60 ${
              collapsed
                ? "justify-center"
                : ""
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:bg-[#fbe9e7]">
              <LogOut
                size={18}
                strokeWidth={1.8}
                className={
                  loggingOut
                    ? "animate-pulse"
                    : ""
                }
              />
            </span>

            {!collapsed && (
              <span>
                {loggingOut
                  ? "Logging out..."
                  : "Logout"}
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* ========================================
          Main Content
      ======================================== */}

      <div
        className={`min-h-screen overflow-x-hidden transition-all duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          collapsed
            ? "lg:pl-[82px]"
            : "lg:pl-[270px]"
        }`}
      >

        {/* ========================================
            Desktop Topbar
        ======================================== */}

        <header className="sticky top-0 z-20 hidden h-[82px] items-center justify-between border-b border-[#e7e4dc] bg-white/95 px-7 shadow-[0_2px_15px_rgba(0,0,0,0.025)] backdrop-blur-md lg:flex xl:px-9">

          {/* Welcome */}

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a7a39a]">
              Dveler Hotel
            </p>

            <h1 className="mt-1 truncate text-xl font-semibold tracking-[-0.025em] text-[#20201e]">
              Welcome back,{" "}
              {admin?.name
                ?.split(" ")[0] ||
                "Administrator"}
            </h1>
          </div>

          {/* Admin Profile */}

          <div className="flex shrink-0 items-center gap-3">

            <div className="hidden text-right xl:block">
              <p className="text-sm font-semibold text-[#20201e]">
                {admin?.name ||
                  "Administrator"}
              </p>

              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[#96938b]">
                {admin?.role || "Admin"}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5ead2] text-sm font-semibold text-[#a77d25] ring-4 ring-[#faf7ef]">
              {adminInitial}
            </div>

          </div>
        </header>

        {/* ========================================
            Page Content
        ======================================== */}

        <main className="min-h-[calc(100vh-64px)] w-full px-3 py-4 sm:min-h-[calc(100vh-68px)] sm:px-5 sm:py-6 lg:min-h-[calc(100vh-82px)] lg:px-7 lg:py-7 xl:px-9 xl:py-9">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
