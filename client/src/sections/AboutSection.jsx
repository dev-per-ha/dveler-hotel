import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  HeartHandshake,
  Sparkles,
  MoveUpRight,
} from "lucide-react";

// ========================================
// About Image
// ========================================

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=90";

// ========================================
// Statistics
// ========================================

const stats = [
  {
    value: "10+",
    label: "Years of Hospitality",
  },
  {
    value: "50+",
    label: "Comfortable Rooms",
  },
  {
    value: "98%",
    label: "Guest Satisfaction",
  },
];

// ========================================
// Experience Features
// ========================================

const features = [
  {
    number: "01",
    icon: Award,
    title: "Thoughtful Hospitality",
    description:
      "Every detail is considered to make your stay comfortable, calm, and memorable.",
  },
  {
    number: "02",
    icon: HeartHandshake,
    title: "Warm Service",
    description:
      "Our team is here to welcome you with genuine care and attentive service.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Modern Comfort",
    description:
      "Thoughtfully designed spaces combine contemporary comfort with a relaxed atmosphere.",
  },
];

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
      ease: [0.2, 0.7, 0.2, 1],
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.2, 0.7, 0.2, 1],
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 45,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.2, 0.7, 0.2, 1],
    },
  },
};

// ========================================
// About Section
// ========================================

const AboutSection = () => {
  const scrollToRooms = () => {
    document.getElementById("rooms")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#faf9f6]"
    >
      {/* ========================================
          Decorative Background
      ======================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-40 h-80 w-80 rounded-full bg-[#c89b3c]/[0.06] blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#a77d25]/[0.05] blur-3xl"
        />

        <div className="absolute right-[8%] top-[12%] hidden h-24 w-24 rounded-full border border-[#c89b3c]/20 lg:block" />

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-[9%] top-[13%] hidden h-20 w-20 rounded-full border border-dashed border-[#c89b3c]/20 lg:block"
        />
      </div>

      <div className="devper-container relative dveler-section">
        {/* ========================================
            Intro Header
        ======================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="mb-16 max-w-4xl sm:mb-20 lg:mb-24"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-[#c89b3c]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a77d25]">
              The Devper Story
            </span>
          </div>

          <h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-[#171717] sm:text-5xl md:text-6xl lg:text-[4.5rem]">
            Hospitality with
            <span className="relative ml-2 inline-block text-[#a77d25]">
              intention.
              <motion.span
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: "100%",
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                }}
                className="absolute -bottom-1 left-0 h-[2px] bg-[#c89b3c]"
              />
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#666] sm:text-lg sm:leading-8">
            We believe a hotel should be more than somewhere
            you sleep. It should be a place where the pace
            slows down, comfort feels natural, and every
            detail has a purpose.
          </p>
        </motion.div>

        {/* ========================================
            Main Story
        ======================================== */}

        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* ========================================
              Image Side
          ======================================== */}

          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="relative mx-auto w-full max-w-xl lg:mx-0"
          >
            {/* Floating Number */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-3 top-8 z-30 hidden sm:block"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#c89b3c]/40 bg-[#faf9f6] shadow-xl">
                <div className="text-center">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#a77d25]">
                    Est.
                  </p>

                  <p className="mt-0.5 text-lg font-semibold tracking-tight text-[#171717]">
                    DEVPER
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Frame */}

            <div className="absolute -bottom-6 -left-6 hidden h-36 w-36 border-b border-l border-[#c89b3c]/40 sm:block" />

            <div className="absolute -right-5 -top-5 hidden h-32 w-32 border-r border-t border-[#c89b3c]/40 sm:block" />

            {/* Image */}

            <motion.div
              whileHover={{
                y: -5,
              }}
              transition={{
                duration: 0.4,
              }}
              className="relative overflow-hidden rounded-[30px] shadow-[0_30px_80px_rgba(0,0,0,0.13)]"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              <img
                src={ABOUT_IMAGE}
                alt="Elegant DevPer Hotel interior"
                className="h-[430px] w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.04] sm:h-[520px] lg:h-[590px]"
                loading="lazy"
              />

              {/* Image Label */}

              <div className="absolute bottom-6 left-6 z-20 sm:bottom-8 sm:left-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#e2bd6b]">
                  Devper Hotel
                </p>

                <p className="mt-2 text-xl font-medium tracking-tight text-white">
                  Stay beautifully.
                </p>
              </div>
            </motion.div>

            {/* Floating Experience Card */}

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
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
              animate={{
                boxShadow: [
                  "0 18px 45px rgba(0,0,0,0.10)",
                  "0 24px 55px rgba(0,0,0,0.15)",
                  "0 18px 45px rgba(0,0,0,0.10)",
                ],
              }}
              className="absolute -bottom-8 right-3 z-30 w-[200px] rounded-2xl border border-white bg-white p-5 sm:-right-7 sm:w-[220px]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5ead2] text-[#a77d25]">
                  <Sparkles
                    size={18}
                    strokeWidth={1.7}
                  />
                </div>

                <MoveUpRight
                  size={16}
                  className="text-[#c89b3c]"
                />
              </div>

              <p className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#171717]">
                10+
              </p>

              <p className="mt-1 text-xs leading-5 text-[#737373]">
                Years of creating memorable stays.
              </p>
            </motion.div>
          </motion.div>

          {/* ========================================
              Story Content
          ======================================== */}

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >
            {/* Small Label */}

            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#171717] text-[#e2bd6b]">
                <Sparkles
                  size={15}
                  strokeWidth={1.7}
                />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#737373]">
                What makes us different
              </span>
            </div>

            {/* Heading */}

            <h3 className="mt-6 max-w-xl text-3xl font-medium leading-[1.1] tracking-[-0.04em] text-[#171717] sm:text-4xl lg:text-[3.2rem]">
              Designed around
              <span className="block text-[#a77d25]">
                how you want to feel.
              </span>
            </h3>

            {/* Story */}

            <div className="mt-7 max-w-xl space-y-5">
              <p className="text-[15px] leading-7 text-[#5f5f5f] sm:text-base sm:leading-8">
                From the moment you arrive, DevPer is
                designed to feel effortless. Our spaces
                are calm, our service is personal, and
                the little details are never overlooked.
              </p>

              <p className="text-[15px] leading-7 text-[#737373] sm:text-base sm:leading-8">
                Whether you are visiting Addis Ababa for
                business, relaxation, or simply a change
                of pace, we create an environment where
                you can settle in, breathe, and feel at
                home.
              </p>
            </div>

            {/* ========================================
                Feature List
            ======================================== */}

            <div className="mt-10 border-t border-[#e3e0d9]">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    initial={{
                      opacity: 0,
                      x: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.65,
                      delay: 0.12 * index,
                    }}
                    className="group border-b border-[#e3e0d9] py-5"
                  >
                    <div className="flex gap-4 sm:gap-5">
                      {/* Number */}

                      <span className="pt-1 text-[10px] font-bold tracking-[0.15em] text-[#c89b3c]">
                        {feature.number}
                      </span>

                      {/* Icon */}

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e3e0d9] bg-white text-[#a77d25] shadow-sm transition-all duration-300 group-hover:border-[#c89b3c] group-hover:bg-[#f5ead2]">
                        <Icon
                          size={18}
                          strokeWidth={1.7}
                        />
                      </div>

                      {/* Text */}

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <h4 className="text-sm font-semibold text-[#171717] sm:text-[15px]">
                            {feature.title}
                          </h4>

                          <ArrowUpRight
                            size={15}
                            className="shrink-0 text-[#c89b3c] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          />
                        </div>

                        <p className="mt-1.5 max-w-lg text-sm leading-6 text-[#737373]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}

            <motion.button
              type="button"
              onClick={scrollToRooms}
              whileHover={{
                x: 5,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold text-[#171717]"
            >
              <span className="relative">
                Explore our rooms

                <span className="absolute -bottom-1 left-0 h-px w-full bg-[#c89b3c]" />
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9d6cf] transition-all duration-300 group-hover:border-[#c89b3c] group-hover:bg-[#c89b3c] group-hover:text-white">
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.8}
                />
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* ========================================
            Statistics
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative mt-28 overflow-hidden border-y border-[#dedbd3] py-9 sm:mt-32 sm:py-11"
        >
          {/* Moving Gold Line */}

          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-0 top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-[#c89b3c] to-transparent"
          />

          <div className="grid grid-cols-1 divide-y divide-[#dedbd3] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
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
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}
                className="flex items-center gap-5 px-2 py-5 sm:justify-center sm:px-6 sm:py-2"
              >
                <span className="text-4xl font-semibold tracking-[-0.05em] text-[#171717] sm:text-5xl">
                  {stat.value}
                </span>

                <span className="max-w-[145px] text-[10px] font-semibold uppercase leading-5 tracking-[0.15em] text-[#737373]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========================================
            Closing Statement
        ======================================== */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.9,
          }}
          className="relative mx-auto mt-24 max-w-4xl text-center sm:mt-28"
        >
          <span className="text-5xl font-serif leading-none text-[#c89b3c]/40 sm:text-6xl">
            “
          </span>

          <p className="mt-1 text-2xl font-medium leading-[1.25] tracking-[-0.025em] text-[#292929] sm:text-3xl lg:text-4xl">
            A stay should not simply be remembered.
            <span className="text-[#a77d25]">
              {" "}
              It should be felt.
            </span>
          </p>

          <div className="mx-auto mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#c89b3c]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#888]">
              Devper Hotel
            </span>

            <span className="h-px w-8 bg-[#c89b3c]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;