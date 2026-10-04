import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Hotel,
  ArrowRight,
  CalendarCheck,
} from "lucide-react";

// ========================================
// Navigation Items
// ========================================

const navItems = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Rooms",
    href: "#rooms",
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

// ========================================
// Navbar
// ========================================

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ========================================
  // Detect Scroll
  // ========================================

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ========================================
  // Close Mobile Menu
  // ========================================

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // ========================================
  // Scroll To Section
  // ========================================

  const handleNavigation = (event, href) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();

    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    closeMenu();
  };

  // ========================================
  // Book Now
  // ========================================

  const handleBookNow = (event) => {
    event.preventDefault();

    const roomsSection = document.getElementById("rooms");

    if (roomsSection) {
      roomsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    closeMenu();
  };

  // ========================================
  // Render
  // ========================================

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto transition-all duration-500 ${
          isScrolled
            ? "px-3 pt-3 sm:px-5"
            : "px-0 pt-0"
        }`}
      >
        <nav
          className={`mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-10 ${
            isScrolled
              ? "rounded-2xl border border-[#E7E5E1]/80 bg-white/95 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl"
              : "border-b border-black/[0.05] bg-white/90 backdrop-blur-md"
          }`}
        >
          {/* ========================================
              Logo
          ======================================== */}

          <a
            href="#home"
            onClick={(event) =>
              handleNavigation(event, "#home")
            }
            className="group flex items-center gap-3"
            aria-label="DevPer Hotel home"
          >
            {/* Logo Mark */}

            <div
              className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl transition-all duration-500 ${
                isScrolled
                  ? "bg-[#171717] shadow-md"
                  : "bg-[#171717]"
              }`}
            >
              <Hotel
                size={21}
                strokeWidth={1.7}
                className="text-white transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gold Accent */}

              <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#C89B3C]" />
            </div>

            {/* Logo Text */}

            <div className="leading-none">
              <span className="block text-[21px] font-semibold tracking-[0.015em] text-[#171717]">
                DevPer
              </span>

              <span className="mt-1.5 block text-[8px] font-bold uppercase tracking-[0.42em] text-[#A77D25]">
                Hotel
              </span>
            </div>
          </a>

          {/* ========================================
              Desktop Navigation
          ======================================== */}

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) =>
                  handleNavigation(event, item.href)
                }
                className="group relative mx-1 px-4 py-3 text-[13px] font-semibold tracking-wide text-[#555555] transition-colors duration-300 hover:text-[#171717]"
              >
                {item.label}

                {/* Active/Hover Indicator */}

                <span className="absolute bottom-1.5 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#C89B3C] transition-all duration-300 group-hover:w-5" />
              </a>
            ))}
          </div>

          {/* ========================================
              Desktop CTA
          ======================================== */}

          <button
            type="button"
            onClick={handleBookNow}
            className="group hidden min-h-11 items-center gap-2.5 rounded-full bg-[#171717] px-5 text-[13px] font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C89B3C] hover:shadow-[0_12px_25px_rgba(200,155,60,0.22)] lg:flex"
          >
            <CalendarCheck
              size={16}
              strokeWidth={1.8}
            />

            <span>Book Your Stay</span>

            <ArrowRight
              size={15}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {/* ========================================
              Mobile Menu Button
          ======================================== */}

          <button
            type="button"
            onClick={() =>
              setIsMenuOpen((previous) => !previous)
            }
            className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 lg:hidden ${
              isMenuOpen
                ? "border-[#C89B3C] bg-[#FAF9F6] text-[#A77D25]"
                : "border-[#E7E5E1] bg-white text-[#171717] hover:border-[#C89B3C] hover:text-[#A77D25]"
            }`}
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X
                size={21}
                strokeWidth={1.8}
              />
            ) : (
              <Menu
                size={21}
                strokeWidth={1.8}
              />
            )}
          </button>
        </nav>

        {/* ========================================
            Mobile Navigation
        ======================================== */}

        <div
          className={`mx-auto max-w-7xl overflow-hidden transition-all duration-500 lg:hidden ${
            isMenuOpen
              ? "max-h-[520px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`border border-t-0 border-[#E7E5E1] bg-white px-5 pb-6 pt-2 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:px-8 ${
              isScrolled
                ? "rounded-b-2xl"
                : "rounded-b-none"
            }`}
          >
            {/* Mobile Links */}

            <div className="divide-y divide-[#F0EFEC]">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) =>
                    handleNavigation(
                      event,
                      item.href
                    )
                  }
                  className="group flex items-center justify-between py-4 text-sm font-semibold text-[#555555] transition-colors duration-300 hover:text-[#A77D25]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold tracking-[0.15em] text-[#C89B3C]">
                      0{index + 1}
                    </span>

                    <span>{item.label}</span>
                  </div>

                  <ArrowRight
                    size={15}
                    className="text-[#D6D3CD] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#C89B3C]"
                  />
                </a>
              ))}
            </div>

            {/* Mobile CTA */}

            <button
              type="button"
              onClick={handleBookNow}
              className="group mt-5 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#171717] px-5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#C89B3C] hover:shadow-[0_12px_25px_rgba(200,155,60,0.2)]"
            >
              <CalendarCheck
                size={17}
                strokeWidth={1.8}
              />

              <span>Book Your Stay</span>

              <ArrowRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
