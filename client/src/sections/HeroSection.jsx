import { motion } from "framer-motion";
import {
  ArrowRight,
  Hotel,
  MapPin,
  Sparkles,
} from "lucide-react";

// ========================================
// Hero Image
// ========================================

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2200&q=90";

// ========================================
// Animation Variants
// ========================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// ========================================
// Hero Section
// ========================================

const HeroSection = () => {
  // ========================================
  // Scroll Helper
  // ========================================

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // ========================================
  // Render
  // ========================================

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-[#151515]"
    >
      {/* ========================================
          Background Image
      ======================================== */}

      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0"
      >
        <img
          src={HERO_IMAGE}
          alt="DevPer Hotel"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* ========================================
          Image Overlay
          Keep Image Visible
      ======================================== */}

      <div className="absolute inset-0 bg-black/20" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/5" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

      {/* ========================================
          Elegant Gold Glow
      ======================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.8,
          delay: 0.5,
        }}
        className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[#c89b3c]/10 blur-[130px]"
      />

      {/* ========================================
          Main Content
      ======================================== */}

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-5 pb-20 pt-32 sm:px-8 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full max-w-3xl"
        >
          {/* ========================================
              Small Brand Label
          ======================================== */}

          <motion.div
            variants={fadeUp}
            className="mb-7 flex items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[#e5c16b] backdrop-blur-md">
              <Hotel
                size={16}
                strokeWidth={1.7}
              />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80 sm:text-xs">
              DevPer Hotel
            </span>

            <span className="h-px w-8 bg-[#c89b3c]" />

            <span className="hidden items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 sm:flex">
              <MapPin size={12} />
              Addis Ababa
            </span>
          </motion.div>

          {/* ========================================
              Main Heading
          ======================================== */}

          <motion.h1
            variants={fadeUp}
            className="max-w-3xl text-[3.7rem] font-medium leading-[0.94] tracking-[-0.055em] text-white sm:text-6xl md:text-7xl lg:text-[6.3rem]"
          >
            Stay somewhere
            <span className="mt-2 block font-semibold italic text-[#e4bd62]">
              extraordinary.
            </span>
          </motion.h1>

          {/* ========================================
              Minimal Description
          ======================================== */}

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-lg text-sm leading-7 text-white/75 sm:text-base sm:leading-8"
          >
            Refined comfort, thoughtful hospitality,
            and a memorable stay in Addis Ababa.
          </motion.p>

          {/* ========================================
              CTA Buttons
          ======================================== */}

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            {/* Primary */}

            <button
              type="button"
              onClick={() =>
                scrollToSection("rooms")
              }
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#c89b3c] px-7 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#a77d25] hover:shadow-[0_20px_45px_rgba(0,0,0,0.3)]"
            >
              <span>Explore Rooms</span>

              <ArrowRight
                size={17}
                strokeWidth={1.9}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {/* Secondary */}

            <button
              type="button"
              onClick={() =>
                scrollToSection("about")
              }
              className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/15"
            >
              <span>Discover DevPer</span>

              <span className="h-1.5 w-1.5 rounded-full bg-[#c89b3c] transition-transform duration-300 group-hover:scale-150" />
            </button>
          </motion.div>

          {/* ========================================
              Bottom Feature
          ======================================== */}

          <motion.div
            variants={fadeUp}
            className="mt-12 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/30 bg-white/15 backdrop-blur-md">
                <Sparkles
                  size={13}
                  className="text-[#e4bd62]"
                />
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/30 bg-black/20 backdrop-blur-md">
                <Hotel
                  size={13}
                  className="text-white"
                />
              </span>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                Comfort · Style · Hospitality
              </p>

              <p className="mt-1 text-xs text-white/50">
                Your stay, thoughtfully designed.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================
          Floating Location Card
      ======================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: 40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.9,
          delay: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-8 right-5 z-20 hidden rounded-2xl border border-white/20 bg-black/20 px-5 py-4 backdrop-blur-xl sm:block lg:right-10"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c89b3c] text-white">
            <MapPin
              size={15}
              strokeWidth={1.8}
            />
          </span>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/50">
              Located in
            </p>

            <p className="mt-1 text-sm font-medium text-white">
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </motion.div>

      {/* ========================================
          Scroll Indicator
      ======================================== */}

      <motion.button
        type="button"
        onClick={() =>
          scrollToSection("about")
        }
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-white sm:flex"
        aria-label="Scroll to discover DevPer"
      >
        <span className="text-[8px] font-semibold uppercase tracking-[0.35em]">
          Scroll
        </span>

        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/25 p-1">
          <motion.span
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-[#c89b3c]"
          />
        </span>
      </motion.button>

      {/* ========================================
          Bottom Gold Line
      ======================================== */}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 1.2,
          delay: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-[#c89b3c] to-transparent"
      />
    </section>
  );
};

export default HeroSection;

