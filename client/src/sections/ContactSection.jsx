import {
  Mail,
  MapPin,
  Phone,
  Clock3,
  ArrowUpRight,
  Navigation,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";

// ========================================
// Contact Items
// ========================================

const contactItems = [
  {
    icon: MapPin,
    label: "Visit Us",
    title: "Addis Ababa",
    description:
      "Ethiopia's capital city, where your DevPer stay begins.",
    href: null,
  },
  {
    icon: Phone,
    label: "Call Us",
    title: "+251 900 000 000",
    description:
      "Speak directly with our team for assistance.",
    href: "tel:+251900000000",
  },
  {
    icon: Mail,
    label: "Email Us",
    title: "booking@dvelerhotel.com",
    description:
      "For reservations, questions, and enquiries.",
    href: "mailto:booking@dvelerhotel.com",
  },
  {
    icon: Clock3,
    label: "Reception",
    title: "Open 24 Hours",
    description:
      "Our reception team is available every day.",
    href: null,
  },
];

// ========================================
// Contact Card
// ========================================

const ContactCard = ({ item, index }) => {
  const Icon = item.icon;

  const cardContent = (
    <>
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <motion.div
          whileHover={{
            rotate: 5,
            scale: 1.08,
          }}
          transition={{
            duration: 0.25,
          }}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#c89b3c]/20 bg-[#c89b3c]/10 text-[#d7b45d]"
        >
          <Icon
            size={20}
            strokeWidth={1.6}
          />
        </motion.div>

        {item.href && (
          <ArrowUpRight
            size={18}
            strokeWidth={1.6}
            className="text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#d7b45d]"
          />
        )}
      </div>

      {/* Content */}
      <div className="mt-7">
        <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#d7b45d]">
          {item.label}
        </p>

        <h3 className="mt-2 break-words text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
          {item.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-white/45">
          {item.description}
        </p>
      </div>

      {/* Bottom hint */}
      {item.href && (
        <div className="mt-6 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-white/25 transition-colors duration-300 group-hover:text-[#d7b45d]">
          <span className="h-1 w-1 rounded-full bg-current" />
          Connect with us
        </div>
      )}
    </>
  );

  if (item.href) {
    return (
      <motion.a
        href={item.href}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        whileHover={{
          y: -6,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.65,
          delay: index * 0.08,
          ease: [0.2, 0.7, 0.2, 1],
        }}
        className="group relative flex min-h-[245px] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.045] p-6 transition-all duration-500 hover:border-[#c89b3c]/30 hover:bg-white/[0.075] hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] sm:p-7"
      >
        {cardContent}

        <div className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-[#c89b3c] transition-transform duration-500 group-hover:scale-x-100" />

        <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full border border-[#c89b3c]/0 transition-all duration-700 group-hover:border-[#c89b3c]/15" />
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -6,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      className="group relative flex min-h-[245px] flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.045] p-6 transition-all duration-500 hover:border-[#c89b3c]/30 hover:bg-white/[0.075] hover:shadow-[0_20px_45px_rgba(0,0,0,0.18)] sm:p-7"
    >
      {cardContent}

      <div className="absolute bottom-0 left-6 right-6 h-px origin-left scale-x-0 bg-[#c89b3c] transition-transform duration-500 group-hover:scale-x-100" />

      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full border border-[#c89b3c]/0 transition-all duration-700 group-hover:border-[#c89b3c]/15" />
    </motion.div>
  );
};

// ========================================
// Contact Section
// ========================================

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#faf9f6]"
    >
      {/* ========================================
          Background Details
      ======================================== */}

      <div className="pointer-events-none absolute -right-48 top-10 h-[500px] w-[500px] rounded-full border border-[#c89b3c]/10" />

      <div className="pointer-events-none absolute -right-24 top-36 h-[320px] w-[320px] rounded-full border border-[#c89b3c]/10" />

      <div className="pointer-events-none absolute -left-56 bottom-0 h-[480px] w-[480px] rounded-full border border-[#c89b3c]/10" />

      <div className="dveler-container dveler-section relative z-10">

        {/* ========================================
            Section Header
        ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.75,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Eyebrow */}

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#c89b3c]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#a77d25]">
              Contact DevPer
            </span>

            <span className="h-px w-9 bg-[#c89b3c]" />
          </div>

          {/* Heading */}

          <h2 className="mt-6 text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-[#1f1f1f] sm:text-5xl lg:text-[4.5rem]">
            Stay connected.
            <span className="block font-semibold text-[#a77d25]">
              Feel at home.
            </span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#737373] sm:text-base sm:leading-8">
            Whether you're planning your next stay,
            looking for more information, or simply
            need assistance, our team is ready to
            make connecting with DevPer easy.
          </p>
        </motion.div>

        {/* ========================================
            Main Contact Panel
        ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.12,
          }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="relative mt-14 overflow-hidden rounded-[32px] bg-[#171717] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.10)] sm:mt-16 sm:p-7 lg:p-9"
        >
          {/* ========================================
              Decorative Circles
          ======================================== */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border border-[#c89b3c]/10"
          />

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 55,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute -right-16 -top-16 h-[280px] w-[280px] rounded-full border border-[#c89b3c]/10"
          />

          <div className="relative z-10">

            {/* ========================================
                Intro
            ======================================== */}

            <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">

                <div className="flex items-center gap-2">
                  <Sparkles
                    size={13}
                    strokeWidth={1.7}
                    className="text-[#c89b3c]"
                  />

                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d7b45d]">
                    DevPer Hotel
                  </p>
                </div>

                <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl lg:text-[2.15rem]">
                  We're never far away.
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-white/45 sm:text-[15px]">
                  Choose the contact option that works
                  best for you. Whether you need help
                  with a reservation, directions, or a
                  simple question, our team is ready to
                  assist.
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="h-px w-8 bg-[#c89b3c]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                  Always here
                </span>
              </div>
            </div>

            {/* ========================================
                Contact Cards
            ======================================== */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {contactItems.map((item, index) => (
                <ContactCard
                  key={item.label}
                  item={item}
                  index={index}
                />
              ))}
            </div>

            {/* ========================================
                Contact Footer
            ======================================== */}

            <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c89b3c]/10 text-[#d7b45d]">
                  <MessageCircle
                    size={15}
                    strokeWidth={1.7}
                  />
                </div>

                <p className="text-xs leading-5 text-white/40">
                  Have a question? Our team is ready
                  to help.
                </p>
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/25">
                Hospitality starts with connection
              </span>
            </div>
          </div>
        </motion.div>

        {/* ========================================
            Location Panel
        ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.75,
            delay: 0.15,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="mt-6 overflow-hidden rounded-[32px] border border-[#e7e5e1] bg-white shadow-[0_15px_45px_rgba(0,0,0,0.035)]"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">

            {/* ========================================
                Location Visual
            ======================================== */}

            <div className="relative min-h-[300px] overflow-hidden bg-[#f1eee7] sm:min-h-[360px] lg:min-h-[410px]">

              {/* Map Pattern */}

              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(30deg, transparent 47%, rgba(167,125,37,0.08) 48%, transparent 49%), linear-gradient(120deg, transparent 47%, rgba(167,125,37,0.06) 48%, transparent 49%)",
                  backgroundSize:
                    "85px 85px",
                }}
              />

              {/* Decorative Rings */}

              <div className="absolute left-[12%] top-[18%] h-36 w-36 rounded-full border border-[#c89b3c]/20" />

              <div className="absolute right-[10%] bottom-[8%] h-56 w-56 rounded-full border border-[#c89b3c]/15" />

              <div className="absolute right-[25%] top-[15%] h-16 w-16 rounded-full bg-[#c89b3c]/5 blur-2xl" />

              {/* Center Location */}

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">

                <motion.div
                  animate={{
                    y: [0, -7, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#171717] text-[#d7b45d] shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                >
                  <MapPin
                    size={28}
                    strokeWidth={1.5}
                  />

                  <span className="absolute inset-[-9px] rounded-full border border-[#c89b3c]/30" />

                  <span className="absolute inset-[-18px] rounded-full border border-[#c89b3c]/10" />
                </motion.div>

                <div className="mt-4 rounded-full border border-[#dfd7c5] bg-white/90 px-5 py-2.5 shadow-sm backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#555555]">
                    DevPer Hotel
                  </span>
                </div>
              </div>

              {/* Location Label */}

              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-md">
                <Navigation
                  size={13}
                  className="text-[#a77d25]"
                  strokeWidth={1.8}
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#737373]">
                  Addis Ababa
                </span>
              </div>

              {/* Decorative Label */}

              <div className="absolute right-5 top-5 rounded-full border border-[#d9cfb9] bg-white/70 px-4 py-2 backdrop-blur-md">
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8a877f]">
                  Ethiopia
                </span>
              </div>
            </div>

            {/* ========================================
                Location Details
            ======================================== */}

            <div className="flex flex-col justify-center bg-[#faf9f6] p-7 sm:p-10 lg:p-12">

              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#a77d25]">
                Find Us
              </p>

              <h3 className="mt-4 text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-[#1f1f1f] sm:text-[2.35rem]">
                Your stay begins
                <span className="block font-semibold text-[#a77d25]">
                  here.
                </span>
              </h3>

              <p className="mt-5 text-sm leading-7 text-[#737373] sm:text-[15px] sm:leading-8">
                Located in Addis Ababa, Ethiopia,
                DevPer Hotel offers a welcoming base
                for travelers looking for comfort,
                convenience, and thoughtful hospitality.
              </p>

              <p className="mt-3 text-sm leading-7 text-[#737373] sm:text-[15px] sm:leading-8">
                From the moment you arrive, our team
                is here to help make your stay simple,
                comfortable, and memorable.
              </p>

              {/* Location Info */}

              <div className="mt-7 rounded-2xl border border-[#e5e1d7] bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5ead2] text-[#a77d25]">
                    <MapPin
                      size={15}
                      strokeWidth={1.7}
                    />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#99958c]">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#282824]">
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <span className="h-px w-10 bg-[#c89b3c]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#999999]">
                  Easy to reach. Easy to stay.
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================
            Bottom CTA
        ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="mt-10 flex flex-col gap-5 border-t border-[#e5e2db] pt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#a77d25]">
              Ready when you are
            </p>

            <p className="mt-1 text-xs text-[#85827a]">
              Explore our rooms and find the right
              space for your stay.
            </p>
          </div>

          <a
            href="#rooms"
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#20201e] px-6 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c89b3c] hover:shadow-[0_12px_25px_rgba(0,0,0,0.12)]"
          >
            Explore Our Rooms

            <ArrowUpRight
              size={15}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

