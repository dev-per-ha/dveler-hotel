import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuthentication = async () => {
      try {
        const response = await fetch(
          "https://dveler-hotel-backend.onrender.com/api/admin/test-auth",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!mounted) return;

        if (response.ok) {
          const data = await response.json();

          if (data.success) {
            setAuthenticated(true);

            // Keep admin information available to the UI.
            if (data.data?.admin) {
              localStorage.setItem(
                "admin",
                JSON.stringify(data.data.admin)
              );
            }
          } else {
            setAuthenticated(false);
            localStorage.removeItem("admin");
          }
        } else {
          setAuthenticated(false);
          localStorage.removeItem("admin");
        }
      } catch (error) {
        console.error(
          "Admin authentication check failed:",
          error
        );

        if (mounted) {
          setAuthenticated(false);
          localStorage.removeItem("admin");
        }
      } finally {
        if (mounted) {
          setChecking(false);
        }
      }
    };

    checkAuthentication();

    return () => {
      mounted = false;
    };
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500" />

          <p className="mt-4 text-sm text-gray-500">
            Checking admin session...
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
