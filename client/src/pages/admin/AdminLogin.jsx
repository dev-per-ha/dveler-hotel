import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import toast from "../../utils/toast";

// ========================================
// Admin Login
// ========================================

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ========================================
  // Handle Input Change
  // ========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ========================================
  // Handle Login
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ========================================
    // Client-side Validation
    // ========================================

    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      toast.warning("Please enter your email address.");
      return;
    }

    if (!password) {
      toast.warning("Please enter your password.");
      return;
    }

    // ========================================
    // Email Format Validation
    // ========================================

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      toast.warning(
        "Please enter a valid email address."
      );
      return;
    }

    try {
      setLoading(true);

      // ========================================
      // Login Request
      // ========================================

      const response = await fetch(
        "https://dveler-hotel-backend.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      // ========================================
      // Safely Read Response
      // ========================================

      let data = {};

      try {
        data = await response.json();
      } catch (parseError) {
        console.error(
          "Failed to parse login response:",
          parseError
        );
      }

      // ========================================
      // Handle Failed Login
      // ========================================

      if (!response.ok) {
        const errorMessage =
          data.message ||
          "Invalid email or password.";

        toast.error(errorMessage);

        return;
      }

      // ========================================
      // Store Admin Information
      // ========================================

      if (data.data?.admin) {
        localStorage.setItem(
          "admin",
          JSON.stringify(data.data.admin)
        );
      }

      // ========================================
      // Success
      // ========================================

      toast.success(
        `Welcome back, ${
          data.data?.admin?.name ||
          "Administrator"
        }!`
      );

      // Small delay allows the toast to be visible
      // before navigating to the dashboard.
      setTimeout(() => {
        navigate("/admin/dashboard", {
          replace: true,
        });
      }, 400);

    } catch (loginError) {
      console.error(
        "Admin login error:",
        loginError
      );

      // ========================================
      // Network / Server Error
      // ========================================

      if (
        loginError instanceof TypeError
      ) {
        toast.error(
          "Unable to connect to the server. Please try again."
        );
      } else {
        toast.error(
          loginError.message ||
            "Unable to log in. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // Admin Login UI
  // ========================================

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#11110f] px-4 py-8 sm:px-6 sm:py-12">

      {/* ========================================
          Background
      ======================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Large Glow */}

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c89b3c]/[0.035] blur-[110px]" />

        {/* Top Decorative Circles */}

        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full border border-[#c89b3c]/10" />

        <div className="absolute -left-20 -top-20 h-[280px] w-[280px] rounded-full border border-[#c89b3c]/[0.07]" />

        {/* Bottom Decorative Circles */}

        <div className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full border border-[#c89b3c]/10" />

        <div className="absolute -bottom-20 -right-10 h-[300px] w-[300px] rounded-full border border-[#c89b3c]/[0.07]" />

        {/* Top Gold Line */}

        <div className="absolute left-1/2 top-0 h-px w-64 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c89b3c]/70 to-transparent" />

        {/* Bottom Gold Line */}

        <div className="absolute bottom-0 left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c89b3c]/40 to-transparent" />
      </div>

      {/* ========================================
          Main Content
      ======================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.2, 0.7, 0.2, 1],
        }}
        className="relative z-10 w-full max-w-[440px]"
      >

        {/* ========================================
            Brand
        ======================================== */}

        <div className="mb-8 text-center">

          <motion.button
            type="button"
            onClick={() => navigate("/")}
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="group inline-flex items-baseline gap-2"
            aria-label="Go to DevPer Hotel website"
          >
            <span className="text-[2rem] font-semibold tracking-[-0.05em] text-white transition-colors duration-300 group-hover:text-[#d7b45d] sm:text-[2.2rem]">
              DevPer
            </span>

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c89b3c]">
              Hotel
            </span>
          </motion.button>

          {/* Shield */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            className="mx-auto mt-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c89b3c]/20 bg-[#c89b3c]/[0.08] text-[#d7b45d] shadow-[0_0_35px_rgba(200,155,60,0.08)]"
          >
            <ShieldCheck
              size={25}
              strokeWidth={1.5}
            />
          </motion.div>

          <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.32em] text-[#c89b3c]">
            Hotel Administration
          </p>

          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-white sm:text-3xl">
            Welcome back
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/45">
            Sign in to manage your hotel operations.
          </p>
        </div>

        {/* ========================================
            Login Card
        ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="overflow-hidden rounded-[28px] border border-white/10 bg-[#faf9f6] shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
        >

          {/* Top Accent */}

          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#c89b3c] to-transparent" />

          <div className="p-6 sm:p-8">

            {/* Card Header */}

            <div className="mb-7">
              <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#20201e]">
                Admin sign in
              </h2>

              <p className="mt-1.5 text-sm text-[#85827a]">
                Enter your credentials to continue.
              </p>
            </div>

            {/* ========================================
                Form
            ======================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#55524c]"
                >
                  Email Address
                </label>

                <div className="group relative">

                  <Mail
                    size={17}
                    strokeWidth={1.7}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa69e] transition-colors duration-300 group-focus-within:text-[#b58a32]"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@dvelerhotel.com"
                    autoComplete="email"
                    disabled={loading}
                    className="h-13 w-full rounded-2xl border border-[#e1ded6] bg-white pl-11 pr-4 text-sm text-[#20201e] outline-none transition-all duration-300 placeholder:text-[#aaa69e] focus:border-[#c89b3c] focus:ring-4 focus:ring-[#c89b3c]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2.5 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#55524c]"
                >
                  Password
                </label>

                <div className="group relative">

                  <LockKeyhole
                    size={17}
                    strokeWidth={1.7}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa69e] transition-colors duration-300 group-focus-within:text-[#b58a32]"
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                    className="h-13 w-full rounded-2xl border border-[#e1ded6] bg-white pl-11 pr-12 text-sm text-[#20201e] outline-none transition-all duration-300 placeholder:text-[#aaa69e] focus:border-[#c89b3c] focus:ring-4 focus:ring-[#c89b3c]/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#99958c] transition-all duration-300 hover:bg-[#f5ead2] hover:text-[#a77d25] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={17}
                        strokeWidth={1.7}
                      />
                    ) : (
                      <Eye
                        size={17}
                        strokeWidth={1.7}
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}

              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#20201e] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c89b3c] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={17}
                      strokeWidth={2}
                      className="animate-spin"
                    />

                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>

                    <ArrowRight
                      size={16}
                      strokeWidth={1.8}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Security Note */}

            <div className="mt-7 flex items-center justify-center gap-2 border-t border-[#e5e2da] pt-5">
              <LockKeyhole
                size={12}
                strokeWidth={1.8}
                className="text-[#b58a32]"
              />

              <p className="text-[10px] font-medium text-[#85827a]">
                Secure administrator access
              </p>
            </div>
          </div>
        </motion.div>

        {/* ========================================
            Back To Website
        ======================================== */}

        <motion.button
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 0.45,
          }}
          type="button"
          onClick={() => navigate("/")}
          className="group mx-auto mt-6 flex items-center gap-2 text-sm text-white/40 transition-colors duration-300 hover:text-[#c89b3c]"
        >
          <ArrowLeft
            size={15}
            strokeWidth={1.7}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          Back to website
        </motion.button>

        {/* Footer */}

        <p className="mt-7 text-center text-[9px] font-medium uppercase tracking-[0.22em] text-white/20">
          DevPer Hotel · Administration
        </p>
      </motion.div>
    </main>
  );
};

export default AdminLogin;

