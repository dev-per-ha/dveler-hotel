import {
  Mail,
  MapPin,
  Phone,
  Clock3,
  ArrowUp,
  ArrowRight,
  Hotel,
} from "lucide-react";

// ========================================
// Footer
// ========================================

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // ========================================
  // Scroll Helpers
  // ========================================

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ========================================
  // Footer Data
  // ========================================

  const quickLinks = [
    { label: "Home", section: "home" },
    { label: "About Us", section: "about" },
    { label: "Rooms", section: "rooms" },
    { label: "Services", section: "services" },
    { label: "Contact", section: "contact" },
  ];

  const services = [
    "Free Wi-Fi",
    "Restaurant & Dining",
    "Airport Transfer",
    "Swimming Pool",
    "Fitness Center",
    "24/7 Reception",
  ];

  return (
    <footer className="overflow-hidden bg-[#171717] text-white">

      {/* ========================================
          Main Footer
          ======================================== */}

      <div className="dveler-container py-16 sm:py-20 lg:py-24">

        {/* ========================================
            Top Brand / CTA Area
            ======================================== */}

        <div className="mb-14 flex flex-col gap-8 border-b border-white/10 pb-12 lg:mb-16 lg:flex-row lg:items-end lg:justify-between lg:pb-14">

          {/* Brand */}

          <div className="max-w-2xl">
            <button
              type="button"
              onClick={handleBackToTop}
              className="group flex items-center gap-3 text-left"
              aria-label="Back to DevPer Hotel home"
            >
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-[#171717] transition-transform duration-300 group-hover:scale-105">
                <Hotel
                  size={20}
                  strokeWidth={1.7}
                />

                <span className="absolute bottom-0 left-0 h-1 w-full bg-[#c89b3c]" />
              </span>

              <span className="leading-none">
                <span className="block text-[22px] font-semibold tracking-[0.02em]">
                  DevPer
                </span>

                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.38em] text-[#d7b45d]">
                  Hotel
                </span>
              </span>
            </button>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
              A comfortable and welcoming hotel experience
              designed to make every stay relaxing,
              convenient, and memorable.
            </p>
          </div>

          {/* Small Brand Statement */}

          <div className="flex items-center gap-3 lg:pb-1">
            <span className="h-px w-10 bg-[#c89b3c]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Stay · Relax · Experience
            </span>
          </div>
        </div>

        {/* ========================================
            Footer Columns
            ======================================== */}

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_0.7fr_0.9fr_1.1fr] lg:gap-10">

          {/* ========================================
              Brand / Social
              ======================================== */}

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d7b45d]">
              About DevPer
            </p>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/45">
              Thoughtful hospitality, modern comfort,
              and warm service in Addis Ababa.
            </p>

            {/* Social Links */}

            <div className="mt-7 flex gap-2.5">
              <a
                href="#"
                aria-label="Facebook"
                onClick={(event) =>
                  event.preventDefault()
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-white/45 transition-all duration-300 hover:border-[#c89b3c] hover:bg-[#c89b3c] hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                onClick={(event) =>
                  event.preventDefault()
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[11px] font-semibold text-white/45 transition-all duration-300 hover:border-[#c89b3c] hover:bg-[#c89b3c] hover:text-white"
              >
                IG
              </a>
            </div>
          </div>

          {/* ========================================
              Quick Links
              ======================================== */}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.section}>
                  <button
                    type="button"
                    onClick={() =>
                      handleScroll(link.section)
                    }
                    className="group flex items-center gap-2 text-sm text-white/45 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#c89b3c] transition-all duration-300 group-hover:w-4" />

                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================
              Services
              ======================================== */}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Our Services
            </h3>

            <ul className="mt-5 space-y-3.5">
              {services.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-2 text-sm text-white/45"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[#c89b3c]" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================
              Contact
              ======================================== */}

          <div>
            <h3 className="text-sm font-semibold text-white">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">

              {/* Address */}

              <div className="flex gap-3">
                <MapPin
                  size={17}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0 text-[#d7b45d]"
                />

                <p className="text-sm leading-6 text-white/45">
                  Addis Ababa, Ethiopia
                </p>
              </div>

              {/* Phone */}

              <div className="flex gap-3">
                <Phone
                  size={17}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0 text-[#d7b45d]"
                />

                <a
                  href="tel:+251900000000"
                  className="text-sm text-white/45 transition-colors duration-300 hover:text-[#d7b45d]"
                >
                  +251 900 000 000
                </a>
              </div>

              {/* Email */}

              <div className="flex gap-3">
                <Mail
                  size={17}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0 text-[#d7b45d]"
                />

                <a
                  href="mailto:booking@dvelerhotel.com"
                  className="break-all text-sm text-white/45 transition-colors duration-300 hover:text-[#d7b45d]"
                >
                  booking@devperhotel.com
                </a>
              </div>

              {/* Reception */}

              <div className="flex gap-3">
                <Clock3
                  size={17}
                  strokeWidth={1.7}
                  className="mt-0.5 shrink-0 text-[#d7b45d]"
                />

                <p className="text-sm leading-6 text-white/45">
                  Open 24 hours, 7 days a week
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
            Bottom Footer
            ======================================== */}

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-7 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs leading-5 text-white/30">
            © {currentYear} DevPer Hotel. All rights
            reserved.
          </p>

          <button
            type="button"
            onClick={handleBackToTop}
            className="group inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/40 transition-colors duration-300 hover:text-white"
          >
            <span>Back to top</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-[#c89b3c] group-hover:bg-[#c89b3c] group-hover:text-white">
              <ArrowUp
                size={14}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
