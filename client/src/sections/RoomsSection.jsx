import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Check,
  Users,
  Sparkles,
  RefreshCw,
} from "lucide-react";

import { getRooms } from "../services/roomService";

const SERVER_URL = "http://localhost:5000";

// ========================================
// Get Image URL
// ========================================

const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return "";
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/")) {
    return `${SERVER_URL}${imageUrl}`;
  }

  return `${SERVER_URL}/${imageUrl}`;
};

// ========================================
// Rooms Section
// ========================================

const RoomsSection = ({ onBookRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ========================================
  // Current Image For Each Room
  // ========================================

  const [currentImageIndexes, setCurrentImageIndexes] =
    useState({});

  // ========================================
  // Load Rooms
  // ========================================

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await getRooms();

      setRooms(response.data || []);
    } catch (error) {
      console.error("Failed to load rooms:", error);

      // Keep technical error details away from guests.
      setError(true);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // Initial Load
  // ========================================

  useEffect(() => {
    loadRooms();
  }, []);

  // ========================================
  // Change Room Image
  // ========================================

  const changeRoomImage = (
    roomId,
    direction,
    imageCount
  ) => {
    if (!imageCount || imageCount <= 1) {
      return;
    }

    setCurrentImageIndexes((previous) => {
      const currentIndex =
        previous[roomId] ?? 0;

      let nextIndex;

      if (direction === "next") {
        nextIndex =
          (currentIndex + 1) % imageCount;
      } else {
        nextIndex =
          (currentIndex - 1 + imageCount) %
          imageCount;
      }

      return {
        ...previous,
        [roomId]: nextIndex,
      };
    });
  };

  return (
    <section
      id="rooms"
      className="relative overflow-hidden bg-[#f8f7f3]"
    >
      {/* ========================================
          Decorative Background
      ======================================== */}

      <div className="pointer-events-none absolute -right-40 top-[15%] h-[350px] w-[350px] rounded-full bg-[#c89b3c]/[0.055] blur-[100px]" />

      <div className="pointer-events-none absolute -left-40 bottom-[10%] h-[350px] w-[350px] rounded-full bg-[#c89b3c]/[0.04] blur-[100px]" />

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
          className="mx-auto mb-14 max-w-3xl text-center lg:mb-20"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#c89b3c]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a77d25]">
              Stay at DevPer
            </span>

            <span className="h-px w-8 bg-[#c89b3c]" />
          </div>

          <h2 className="text-4xl font-medium leading-[1.06] tracking-[-0.04em] text-[#20201e] sm:text-5xl lg:text-[3.8rem]">
            Rooms designed for
            <span className="block font-semibold text-[#a77d25]">
              better stays.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#73716b] sm:text-base sm:leading-8">
            From comfortable rooms for everyday stays
            to spacious suites for something special,
            find a space that feels right for you.
          </p>
        </motion.div>

        {/* ========================================
            Loading
        ======================================== */}

        {loading && (
          <div className="space-y-8 lg:space-y-12">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[26px] border border-[#e5e2da] bg-white"
              >
                <div className="grid lg:grid-cols-2">
                  <div className="h-[300px] animate-pulse bg-[#e9e7e1] lg:h-[390px]" />

                  <div className="space-y-4 p-7 sm:p-9">
                    <div className="h-4 w-28 animate-pulse rounded bg-[#e9e7e1]" />

                    <div className="h-8 w-2/3 animate-pulse rounded bg-[#e9e7e1]" />

                    <div className="h-4 w-full animate-pulse rounded bg-[#e9e7e1]" />

                    <div className="h-4 w-4/5 animate-pulse rounded bg-[#e9e7e1]" />

                    <div className="h-11 w-full animate-pulse rounded-full bg-[#e9e7e1]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================
            Error
        ======================================== */}

        {!loading && error && (
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
              duration: 0.6,
              ease: [0.2, 0.7, 0.2, 1],
            }}
            className="mx-auto max-w-xl rounded-[26px] border border-[#e5e2da] bg-white p-8 text-center shadow-[0_10px_35px_rgba(0,0,0,0.035)] sm:p-10"
          >
            {/* Icon */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.1,
              }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f5ead2] text-[#a77d25]"
            >
              <BedDouble
                size={23}
                strokeWidth={1.6}
              />
            </motion.div>

            {/* Message */}

            <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#20201e]">
              Sorry, we couldn't load our rooms.
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#73716b]">
              Please check your connection and try
              again.
            </p>

            {/* Try Again */}

            <button
              type="button"
              onClick={loadRooms}
              disabled={loading}
              className="group mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#20201e] px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c89b3c] hover:shadow-[0_12px_25px_rgba(0,0,0,0.12)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={15}
                strokeWidth={1.8}
                className="transition-transform duration-500 group-hover:rotate-180"
              />

              Try Again
            </button>
          </motion.div>
        )}

        {/* ========================================
            Rooms
        ======================================== */}

        {!loading &&
          !error &&
          rooms.length > 0 && (
            <div className="space-y-8 lg:space-y-12">
              {rooms.map((room, index) => {
                // ========================================
                // Room Images
                // ========================================

                const roomImages =
                  Array.isArray(room.images)
                    ? room.images
                    : [];

                const primaryImage =
                  roomImages.find(
                    (image) =>
                      Number(image.is_primary) === 1
                  ) ||
                  roomImages[0];

                const imageCount =
                  roomImages.length;

                const currentImageIndex =
                  currentImageIndexes[room.id] ?? 0;

                const currentImage =
                  roomImages[
                    currentImageIndex
                  ] || primaryImage;

                const imageUrl = currentImage
                  ? getImageUrl(
                      currentImage.image_url
                    )
                  : "";

                // ========================================
                // Availability
                // ========================================

                const availableRooms = Number(
                  room.available || 0
                );

                const isAvailable =
                  room.status === "available" &&
                  availableRooms > 0;

                // ========================================
                // Alternate Layout
                // ========================================

                const reverseLayout =
                  index % 2 !== 0;

                return (
                  <motion.article
                    key={room.id}
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
                      duration: 0.7,
                      delay: index * 0.08,
                      ease: [0.2, 0.7, 0.2, 1],
                    }}
                    className={`group overflow-hidden rounded-[26px] border border-[#e5e2da] bg-white shadow-[0_10px_35px_rgba(0,0,0,0.035)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] lg:grid lg:grid-cols-[0.92fr_1.08fr] ${
                      reverseLayout
                        ? "lg:[&>*:first-child]:order-2"
                        : ""
                    }`}
                  >
                    {/* ========================================
                        Image
                    ======================================== */}

                    <div className="relative h-[280px] overflow-hidden bg-[#e9e7e1] sm:h-[330px] lg:h-[390px]">
                      {imageUrl ? (
                        <motion.img
                          key={imageUrl}
                          src={imageUrl}
                          alt={
                            currentImage?.alt_text ||
                            room.name
                          }
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                          initial={{
                            opacity: 0,
                            scale: 1.04,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.45,
                            ease: [0.2, 0.7, 0.2, 1],
                          }}
                          className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.035]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-[#77746d]">
                          No image available
                        </div>
                      )}

                      {/* ========================================
                          Image Overlay
                      ======================================== */}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                      {/* ========================================
                          Room Number
                      ======================================== */}

                      <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/20 text-[10px] font-semibold text-white backdrop-blur-md">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      {/* ========================================
                          Room Type
                      ======================================== */}

                      <div className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/20 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                        {room.room_type}
                      </div>

                      {/* ========================================
                          Image Navigation
                      ======================================== */}

                      {imageCount > 1 && (
                        <>
                          {/* Previous */}

                          <button
                            type="button"
                            aria-label={`Previous image for ${room.name}`}
                            onClick={() =>
                              changeRoomImage(
                                room.id,
                                "previous",
                                imageCount
                              )
                            }
                            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white opacity-100 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#c89b3c] hover:bg-[#c89b3c] sm:left-5"
                          >
                            <ArrowLeft
                              size={16}
                              strokeWidth={1.8}
                            />
                          </button>

                          {/* Next */}

                          <button
                            type="button"
                            aria-label={`Next image for ${room.name}`}
                            onClick={() =>
                              changeRoomImage(
                                room.id,
                                "next",
                                imageCount
                              )
                            }
                            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white opacity-100 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#c89b3c] hover:bg-[#c89b3c] sm:right-5"
                          >
                            <ArrowRight
                              size={16}
                              strokeWidth={1.8}
                            />
                          </button>

                          {/* Image Counter */}

                          <div className="absolute bottom-5 right-5 rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-[10px] font-semibold tracking-[0.08em] text-white backdrop-blur-md">
                            {currentImageIndex + 1} /{" "}
                            {imageCount}
                          </div>
                        </>
                      )}

                      {/* ========================================
                          Image Bottom
                      ======================================== */}

                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#e2bd6b]">
                            DevPer Hotel
                          </p>

                          <p className="mt-1 text-xs font-medium text-white/90">
                            Designed for comfort
                          </p>
                        </div>

                        {imageCount <= 1 && (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#c89b3c] group-hover:bg-[#c89b3c]">
                            <ArrowRight
                              size={14}
                              strokeWidth={1.8}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ========================================
                        Room Information
                    ======================================== */}

                    <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                      {/* Top Row */}

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Sparkles
                            size={14}
                            strokeWidth={1.6}
                            className="text-[#c89b3c]"
                          />

                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a77d25]">
                            {room.bed_type ||
                              "Comfortable stay"}
                          </span>
                        </div>

                        <div
                          className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] ${
                            isAvailable
                              ? "text-[#8a6c2c]"
                              : "text-[#8b8982]"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isAvailable
                                ? "bg-[#c89b3c]"
                                : "bg-[#aaa8a1]"
                            }`}
                          />

                          {isAvailable
                            ? "Available"
                            : "Unavailable"}
                        </div>
                      </div>

                      {/* Title */}

                      <h3 className="mt-5 text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[#20201e] sm:text-[2.2rem]">
                        {room.name}
                      </h3>

                      {/* Description */}

                      <p className="mt-4 max-w-xl text-sm leading-6 text-[#73716b] sm:text-[15px] sm:leading-7">
                        {room.description ||
                          "A thoughtfully prepared room designed for a comfortable and relaxing stay."}
                      </p>

                      {/* Details */}

                      <div className="mt-6 grid grid-cols-3 border-y border-[#e7e4dc] py-5">
                        {/* Guests */}

                        <div className="flex flex-col gap-1.5 border-r border-[#e7e4dc] px-2 first:pl-0 sm:px-3">
                          <Users
                            size={17}
                            strokeWidth={1.6}
                            className="text-[#a77d25]"
                          />

                          <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#99968e]">
                            Guests
                          </span>

                          <span className="text-sm font-semibold text-[#252522]">
                            {room.capacity}
                          </span>
                        </div>

                        {/* Availability */}

                        <div className="flex flex-col gap-1.5 border-r border-[#e7e4dc] px-2 sm:px-3">
                          <Check
                            size={17}
                            strokeWidth={1.6}
                            className="text-[#a77d25]"
                          />

                          <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#99968e]">
                            Available
                          </span>

                          <span className="text-sm font-semibold text-[#252522]">
                            {availableRooms}
                          </span>
                        </div>

                        {/* Bed */}

                        <div className="flex min-w-0 flex-col gap-1.5 px-2 sm:px-3 sm:pr-0">
                          <BedDouble
                            size={17}
                            strokeWidth={1.6}
                            className="text-[#a77d25]"
                          />

                          <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#99968e]">
                            Bed
                          </span>

                          <span className="truncate text-sm font-semibold text-[#252522]">
                            {room.bed_type || "—"}
                          </span>
                        </div>
                      </div>

                      {/* Facilities */}

                      {room.facilities?.length > 0 && (
                        <div className="mt-5">
                          <p className="mb-2.5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#99968e]">
                            Included
                          </p>

                          <div className="flex flex-wrap gap-1.5">
                            {room.facilities
                              .slice(0, 4)
                              .map((facility) => (
                                <span
                                  key={facility.id}
                                  className="inline-flex items-center gap-1 rounded-full border border-[#e7e4dc] bg-[#faf9f6] px-2.5 py-1 text-[11px] text-[#68665f]"
                                >
                                  <Check
                                    size={10}
                                    strokeWidth={2}
                                    className="text-[#b28a32]"
                                  />

                                  {facility.name}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Bottom */}

                      <div className="mt-6 flex flex-col gap-4 border-t border-[#e7e4dc] pt-5 sm:flex-row sm:items-center sm:justify-between">
                        {/* Price */}

                        <div>
                          <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#99968e]">
                            From
                          </p>

                          <div className="mt-0.5 flex items-baseline gap-1.5">
                            <span className="text-2xl font-semibold tracking-[-0.035em] text-[#20201e]">
                              {room.price_per_night} BIRR
                            </span>

                            <span className="text-[11px] text-[#88857d]">
                              / night
                            </span>
                          </div>
                        </div>

                        {/* Button */}

                        <button
                          type="button"
                          disabled={!isAvailable}
                          onClick={() =>
                            isAvailable &&
                            onBookRoom?.(room)
                          }
                          className={`group/button inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-xs font-semibold transition-all duration-300 ${
                            isAvailable
                              ? "bg-[#20201e] text-white hover:-translate-y-0.5 hover:bg-[#c89b3c] hover:shadow-[0_12px_25px_rgba(0,0,0,0.12)]"
                              : "cursor-not-allowed bg-[#e9e8e4] text-[#999791]"
                          }`}
                        >
                          {isAvailable
                            ? "Reserve Room"
                            : "Not Available"}

                          {isAvailable && (
                            <ArrowRight
                              size={14}
                              strokeWidth={1.8}
                              className="transition-transform duration-300 group-hover/button:translate-x-1"
                            />
                          )}
                        </button>
                      </div>

                      {/* Availability */}

                      <div className="mt-4">
                        {isAvailable ? (
                          <div className="flex items-center gap-2 text-[11px] text-[#7d6a3d]">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eee3c9]">
                              <Check
                                size={10}
                                strokeWidth={2.2}
                              />
                            </span>

                            {availableRooms}{" "}
                            {availableRooms === 1
                              ? "room"
                              : "rooms"}{" "}
                            available now
                          </div>
                        ) : (
                          <p className="text-[11px] text-[#88857d]">
                            This room is currently
                            unavailable.
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

        {/* ========================================
            Empty State
        ======================================== */}

        {!loading &&
          !error &&
          rooms.length === 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mx-auto max-w-xl rounded-[26px] border border-[#e4e1d9] bg-white p-9 text-center shadow-sm"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f5ead2] text-[#a77d25]">
                <BedDouble
                  size={23}
                  strokeWidth={1.6}
                />
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#20201e]">
                No rooms available
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#73716b]">
                Please check back later for available
                rooms.
              </p>
            </motion.div>
          )}

        {/* ========================================
            Bottom Note
        ======================================== */}

        {!loading &&
          !error &&
          rooms.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
              className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#dedbd2] pt-6 sm:flex-row"
            >
              <p className="text-xs text-[#85827a]">
                Room availability is updated by the
                DevPer Hotel team.
              </p>

              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#a77d25]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c89b3c]" />

                Comfort comes first
              </div>
            </motion.div>
          )}
      </div>
    </section>
  );
};

export default RoomsSection;


