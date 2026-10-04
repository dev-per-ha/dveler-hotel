import {
  Wifi,
  Utensils,
  Car,
  Waves,
  Dumbbell,
  Clock3,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

// ========================================
// Services
// ========================================

const services = [
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    label: "Stay connected",
    description:
      "Enjoy complimentary high-speed Wi-Fi throughout the hotel, whether you are relaxing in your room, working, or staying connected with family and friends.",
  },
  {
    icon: Utensils,
    title: "Restaurant & Dining",
    label: "Taste & enjoy",
    description:
      "Enjoy a comfortable dining experience with carefully prepared meals, refreshing drinks, and a welcoming atmosphere for breakfast, lunch, dinner, or a relaxed moment.",
  },
  {
    icon: Car,
    title: "Airport Transfer",
    label: "Arrive with ease",
    description:
      "Make your arrival and departure easier with our convenient airport transfer service, helping you travel comfortably between the airport and DevPer Hotel.",
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    label: "Relax & refresh",
    description:
      "Take a break from your busy day and enjoy a refreshing moment by the swimming pool, created for relaxation and comfortable leisure.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    label: "Stay active",
    description:
      "Keep your routine while you travel with access to convenient fitness facilities designed to help you stay active during your stay.",
  },
  {
    icon: Clock3,
    title: "24/7 Reception",
    label: "Here when you need us",
    description:
      "Our reception team is available around the clock to assist with questions, requests, arrivals, departures, and other needs throughout your stay.",
  },
];

// ========================================
// Services Section
// ========================================

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#faf9f6]"
    >
      {/* ========================================
          Decorative Background
      ======================================== */}

      <div className="pointer-events-none absolute -right-40 top-24 h-[360px] w-[360px] rounded-full bg-[#c89b3c]/[0.045] blur-[110px]" />

      <div className="pointer-events-none absolute -left-48 bottom-20 h-[420px] w-[420px] rounded-full bg-[#c89b3c]/[0.035] blur-[120px]" />

      <div className="dveler-container dveler-section relative z-10">
        {/* ========================================
            Section Introduction
        ======================================== */}

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-24">
          {/* ========================================
              Left Introduction
          ======================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: [0.2, 0.7, 0.2, 1],
            }}
          >
            {/* Eyebrow */}

            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#c89b3c]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#a77d25]">
                Our Services
              </span>
            </div>

            {/* Heading */}

            <h2 className="mt-6 max-w-xl text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-[#20201e] sm:text-5xl lg:text-[4rem]">
              Everything you need
              <span className="block font-semibold text-[#a77d25]">
                for a better stay.
              </span>
            </h2>
          </motion.div>

          {/* ========================================
              Right Introduction
          ======================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              delay: 0.08,
              ease: [0.2, 0.7, 0.2, 1],
            }}
            className="max-w-2xl lg:ml-auto"
          >
            <p className="text-sm leading-7 text-[#73716b] sm:text-base sm:leading-8">
              At DevPer Hotel, we believe a comfortable
              stay is about more than a beautiful room.
              From staying connected and enjoying good
              food to relaxing, keeping active, and
              receiving assistance whenever you need it,
              our services are designed to make every part
              of your visit easier and more enjoyable.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c89b3c]" />

                <span className="h-px w-8 bg-[#d8c8a7]" />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8c8981]">
                Thoughtfully prepared for your comfort
              </span>
            </div>
          </motion.div>
        </div>

        {/* ========================================
            Services Layout
        ======================================== */}

        <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {/* ========================================
              Featured Service
          ======================================== */}

          {services.slice(0, 1).map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.75,
                  ease: [0.2, 0.7, 0.2, 1],
                }}
                className="group relative min-h-[380px] overflow-hidden rounded-[28px] bg-[#20201e] p-7 text-white shadow-[0_18px_45px_rgba(0,0,0,0.07)] sm:min-h-[400px] sm:p-9 lg:col-span-5 lg:min-h-[520px] lg:p-10"
              >
                {/* Decorative Circle */}

                <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full border border-white/[0.07]" />

                <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full border border-[#c89b3c]/20" />

                <div className="pointer-events-none absolute bottom-[-100px] left-[-100px] h-56 w-56 rounded-full bg-[#c89b3c]/[0.035] blur-3xl" />

                {/* Number */}

                <span className="absolute right-7 top-6 text-[10px] font-semibold tracking-[0.22em] text-white/20 transition-colors duration-500 group-hover:text-[#c89b3c]/70 sm:right-9">
                  01
                </span>

                {/* Icon */}

                <motion.div
                  whileHover={{
                    rotate: -6,
                    scale: 1.06,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c89b3c]/35 bg-[#c89b3c]/10 text-[#e1b957]"
                >
                  <Icon
                    size={23}
                    strokeWidth={1.6}
                  />
                </motion.div>

                {/* Content */}

                <div className="relative mt-10 max-w-lg">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles
                      size={12}
                      strokeWidth={1.7}
                      className="text-[#c89b3c]"
                    />

                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c89b3c]">
                      {service.label}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-[-0.025em] sm:text-[1.9rem]">
                    {service.title}
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-7 text-white/55 sm:text-[15px]">
                    {service.description}
                  </p>
                </div>

                {/* Feature Details */}

                <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                    <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
                      Included
                    </p>

                    <p className="mt-1.5 text-xs font-medium text-white/75">
                      Complimentary
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                    <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/30">
                      Available
                    </p>

                    <p className="mt-1.5 text-xs font-medium text-white/75">
                      Throughout your stay
                    </p>
                  </div>
                </div>

                {/* Bottom */}

                <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between border-t border-white/10 pt-5 sm:bottom-9 sm:left-9 sm:right-9">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Always included
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all duration-300 group-hover:border-[#c89b3c] group-hover:bg-[#c89b3c] group-hover:text-white">
                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.7}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>

                {/* Gold Accent */}

                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#c89b3c] transition-all duration-700 group-hover:w-full" />
              </motion.article>
            );
          })}

          {/* ========================================
              Remaining Services
          ======================================== */}

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-2 lg:gap-5">
            {services.slice(1).map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.title}
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
                    amount: 0.12,
                  }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.07,
                    ease: [0.2, 0.7, 0.2, 1],
                  }}
                  className="group relative min-h-[255px] overflow-hidden rounded-[24px] border border-[#e6e3dc] bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d9cfb9] hover:shadow-[0_18px_40px_rgba(0,0,0,0.055)] sm:min-h-[275px] sm:p-7"
                >
                  {/* Top */}

                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e8e1d2] bg-[#faf7ef] text-[#a77d25] transition-all duration-400 group-hover:border-[#c89b3c] group-hover:bg-[#c89b3c] group-hover:text-white">
                      <Icon
                        size={20}
                        strokeWidth={1.7}
                      />
                    </div>

                    <span className="text-[9px] font-bold tracking-[0.2em] text-[#d3d0c9] transition-colors duration-300 group-hover:text-[#c89b3c]">
                      {String(index + 2).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </div>

                  {/* Content */}

                  <div className="mt-6">
                    <div className="mb-2 text-[8px] font-bold uppercase tracking-[0.18em] text-[#a77d25]">
                      {service.label}
                    </div>

                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#20201e] sm:text-xl">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-6 text-[#77746d] sm:text-sm sm:leading-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom */}

                  <div className="mt-6 flex items-center justify-between border-t border-[#eeeae3] pt-4">
                    <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#aaa69e] transition-colors duration-300 group-hover:text-[#a77d25]">
                      DevPer service
                    </span>

                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.7}
                      className="text-[#aaa69e] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c89b3c]"
                    />
                  </div>

                  {/* Hover Line */}

                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#c89b3c] transition-all duration-500 group-hover:w-full" />
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ========================================
            Bottom Statement
        ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
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
            duration: 0.7,
            delay: 0.15,
          }}
          className="mt-14 flex flex-col gap-5 border-t border-[#e5e2db] pt-7 sm:mt-16 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5ead2] text-[#a77d25]">
              <Sparkles
                size={13}
                strokeWidth={1.7}
              />
            </div>

            <p className="max-w-xl text-xs leading-5 text-[#85827a] sm:text-sm">
              From practical conveniences to moments of
              relaxation, every service is thoughtfully
              prepared to help you feel comfortable,
              welcome, and well cared for throughout your
              stay.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c89b3c]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#77746d]">
              Hospitality, thoughtfully delivered
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
