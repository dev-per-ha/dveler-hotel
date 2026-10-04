import { useEffect, useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone,
  User,
  Users,
  BedDouble,
  Baby,
  X,
  MessageSquare,
  ArrowLeft,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { toast } from "sonner";

// ========================================
// Server URL
// ========================================

const SERVER_URL = "http://localhost:5000";

// ========================================
// Image URL Helper
// ========================================

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return "";

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
// Booking Form
// ========================================

const BookingForm = ({
  isOpen,
  onClose,
  room,
  onSubmitBooking,
}) => {
  // ========================================
  // Booking Information
  // ========================================

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [kids, setKids] = useState(0);
  const [numberOfRooms, setNumberOfRooms] = useState(1);

  // ========================================
  // Guest Information
  // ========================================

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  // ========================================
  // Form State
  // ========================================

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ========================================
  // Today's Date
  // ========================================

  const getToday = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getToday();

  // ========================================
  // Reset Form
  // ========================================

  useEffect(() => {
    if (isOpen) {
      setCheckIn("");
      setCheckOut("");
      setGuests(1);
      setKids(0);
      setNumberOfRooms(1);
      setGuestName("");
      setGuestEmail("");
      setGuestPhone("");
      setSpecialRequest("");
      setError("");
      setLoading(false);
    }
  }, [isOpen, room]);

  // ========================================
  // Close / Guard
  // ========================================

  if (!isOpen || !room) {
    return null;
  }

  // ========================================
  // Room Availability
  // ========================================

  const availableRooms = Number(
    room.available || 0
  );

  const roomCapacity = Number(
    room.capacity || 0
  );

  const roomImage =
    room.images?.find(
      (image) =>
        Number(image.is_primary) === 1
    ) || room.images?.[0];

  const roomImageUrl = roomImage
    ? getImageUrl(roomImage.image_url)
    : "";

  // ========================================
  // Check-in Change
  // ========================================

  const handleCheckInChange = (event) => {
    const value = event.target.value;

    setCheckIn(value);

    if (
      checkOut &&
      value >= checkOut
    ) {
      setCheckOut("");
    }

    setError("");
  };

  // ========================================
  // Check-out Change
  // ========================================

  const handleCheckOutChange = (event) => {
    setCheckOut(event.target.value);
    setError("");
  };

  // ========================================
  // Full Name Change
  // ========================================
  // Allow:
  // - Letters from any language
  // - Spaces
  // - Hyphens
  // - Apostrophes
  //
  // Prevent:
  // - Numbers
  // - Special symbols
  // ========================================

  const handleGuestNameChange = (event) => {
    const value = event.target.value;

    const cleanedValue = value.replace(
      /[^\p{L}\p{M}\s'-]/gu,
      ""
    );

    setGuestName(cleanedValue);
    setError("");
  };

  // ========================================
  // Submit
  // ========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent duplicate submission
    if (loading) {
      return;
    }

    setError("");

    // --------------------------------
    // Trim Text
    // --------------------------------

    const trimmedName = guestName.trim();
    const trimmedEmail = guestEmail.trim();
    const trimmedPhone = guestPhone.trim();
    const trimmedRequest =
      specialRequest.trim();

    // --------------------------------
    // Convert Numbers
    // --------------------------------

    const guestCount = Number(guests);
    const kidsCount = Number(kids);
    const roomCount = Number(numberOfRooms);

    const totalGuests =
      guestCount + kidsCount;

    // --------------------------------
    // Validate Dates
    // --------------------------------

    if (!checkIn) {
      setError(
        "Please select your check-in date."
      );
      return;
    }

    if (!checkOut) {
      setError(
        "Please select your check-out date."
      );
      return;
    }

    if (checkIn < today) {
      setError(
        "Check-in date cannot be before today."
      );
      return;
    }

    if (checkOut <= checkIn) {
      setError(
        "Check-out date must be after check-in date."
      );
      return;
    }

    // --------------------------------
    // Validate Room Availability
    // --------------------------------

    if (
      room.status !== "available" ||
      availableRooms <= 0
    ) {
      setError(
        "This room is currently unavailable. Please choose another room."
      );
      return;
    }

    if (
      !Number.isInteger(roomCount) ||
      roomCount < 1
    ) {
      setError(
        "Please select a valid number of rooms."
      );
      return;
    }

    if (roomCount > availableRooms) {
      setError(
        `Only ${availableRooms} room${
          availableRooms === 1
            ? ""
            : "s"
        } are currently available.`
      );
      return;
    }

    // --------------------------------
    // Validate Guests
    // --------------------------------

    if (
      !Number.isInteger(guestCount) ||
      guestCount < 1
    ) {
      setError(
        "Please select at least 1 guest."
      );
      return;
    }

    // --------------------------------
    // Validate Kids
    // --------------------------------

    if (
      !Number.isInteger(kidsCount) ||
      kidsCount < 0
    ) {
      setError(
        "Please enter a valid number of kids."
      );
      return;
    }

    // --------------------------------
    // Validate Room Capacity
    // --------------------------------

    const totalCapacity =
      roomCapacity * roomCount;

    if (
      totalGuests >
      totalCapacity
    ) {
      setError(
        `The selected room${
          roomCount === 1
            ? ""
            : "s"
        } can accommodate up to ${totalCapacity} guest${
          totalCapacity === 1
            ? ""
            : "s"
        } in total.`
      );
      return;
    }

    // --------------------------------
    // Validate Name
    // --------------------------------

    if (!trimmedName) {
      setError(
        "Please enter your full name."
      );
      return;
    }

    if (trimmedName.length < 2) {
      setError(
        "Your full name must contain at least 2 characters."
      );
      return;
    }

    // Final name validation.
    // This prevents numbers or unsupported
    // characters from being submitted even
    // if the value somehow bypasses the input.
    const namePattern =
      /^[\p{L}\p{M}]+(?:[\s'-][\p{L}\p{M}]+)*$/u;

    if (!namePattern.test(trimmedName)) {
      setError(
        "Full name can contain only letters, spaces, hyphens, and apostrophes."
      );
      return;
    }

    // --------------------------------
    // Validate Email
    // --------------------------------

    if (!trimmedEmail) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(trimmedEmail)
    ) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    // --------------------------------
    // Validate Phone
    // --------------------------------

    if (!trimmedPhone) {
      setError(
        "Please enter your phone number."
      );
      return;
    }

    if (trimmedPhone.length < 7) {
      setError(
        "Please enter a valid phone number."
      );
      return;
    }

    // --------------------------------
    // Submit
    // --------------------------------

    try {
      setLoading(true);

      await onSubmitBooking?.({
        roomId: room.id,
        room,
        checkIn,
        checkOut,
        guests: guestCount,
        kids: kidsCount,
        numberOfRooms: roomCount,
        guestName: trimmedName,
        guestEmail: trimmedEmail,
        guestPhone: trimmedPhone,
        specialRequest:
          trimmedRequest || null,
      });

      // --------------------------------
      // Successful Booking Toast
      // --------------------------------

      toast.success(
        "Booking request submitted successfully.",
        {
          description:
            "Your request has been received. The hotel will contact you for confirmation.",
        }
      );
    } catch (submissionError) {
      console.error(
        "Booking form submission error:",
        submissionError
      );

      const message =
        submissionError?.message ||
        "Unable to submit your booking request.";

      setError(message);

      // --------------------------------
      // Unexpected Submission Error
      // --------------------------------

      toast.error(
        "Booking request could not be submitted.",
        {
          description: message,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // Shared Input Classes
  // ========================================

  const inputClasses =
    "w-full rounded-xl border border-[#ddd9d1] bg-[#faf9f6] py-3.5 text-sm text-[#1f1f1f] outline-none transition-all duration-200 placeholder:text-[#a3a3a3] focus:border-[#c89b3c] focus:bg-white focus:ring-4 focus:ring-[#c89b3c]/10 disabled:cursor-not-allowed disabled:opacity-60";

  const iconClasses =
    "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]";

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-5 backdrop-blur-md sm:py-8"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          if (!loading) {
            onClose();
          }
        }
      }}
    >
      <div className="relative my-auto w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.3)]">

        {/* ========================================
            Close Button
        ======================================== */}

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-black/50 disabled:cursor-not-allowed disabled:opacity-50 sm:right-5 sm:top-5"
          aria-label="Close booking form"
        >
          <X
            size={19}
            strokeWidth={1.8}
          />
        </button>

        <div className="grid lg:grid-cols-[0.82fr_1.18fr]">

          {/* ========================================
              Booking Summary
          ======================================== */}

          <div className="relative overflow-hidden bg-[#171717] px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-8 lg:py-10">

            {/* Decorative Elements */}

            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#c89b3c]/15" />

            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#c89b3c]/10" />

            <div className="relative z-10">

              {/* Header */}

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d7b45d]">
                Your Stay
              </p>

              <h2 className="mt-3 text-3xl font-medium tracking-[-0.025em] sm:text-4xl">
                Book your room
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-white/55">
                Complete the form to send
                your booking request directly
                to the hotel.
              </p>

              {/* Room Card */}

              <div className="mt-8 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.06]">

                {roomImageUrl ? (
                  <div className="relative h-44 overflow-hidden">

                    <img
                      src={roomImageUrl}
                      alt={
                        roomImage?.alt_text ||
                        room.name
                      }
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                    <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                      {room.room_type}
                    </span>
                  </div>
                ) : (
                  <div className="flex h-44 items-center justify-center bg-white/5 text-sm text-white/40">
                    No image available
                  </div>
                )}

                <div className="p-5">

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <h3 className="text-lg font-semibold tracking-[-0.015em]">
                        {room.name}
                      </h3>

                      <p className="mt-1 text-xs text-white/40">
                        {room.bed_type ||
                          "Comfortable bedding"}
                      </p>

                    </div>

                    <div className="shrink-0 text-right">

                      <p className="text-xl font-semibold">
                        $
                        {Number(
                          room.price_per_night ||
                            0
                        ).toFixed(2)}
                      </p>

                      <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-white/35">
                        Per night
                      </p>

                    </div>

                  </div>

                  {/* Availability */}

                  <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">

                    <p className="text-[10px] uppercase tracking-[0.12em] text-white/35">
                      Current availability
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#d7b45d]">
                      {availableRooms}{" "}
                      {availableRooms === 1
                        ? "room"
                        : "rooms"}{" "}
                      available
                    </p>

                  </div>

                  {/* Selected Information */}

                  <div className="mt-5 space-y-4 border-t border-white/10 pt-5">

                    {/* Check-in */}

                    {checkIn && (
                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c89b3c]/10 text-[#d7b45d]">
                          <CalendarDays
                            size={15}
                            strokeWidth={1.7}
                          />
                        </div>

                        <div>

                          <p className="text-[9px] uppercase tracking-[0.12em] text-white/30">
                            Check-in
                          </p>

                          <p className="mt-0.5 text-sm text-white/80">
                            {checkIn}
                          </p>

                        </div>

                      </div>
                    )}

                    {/* Check-out */}

                    {checkOut && (
                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c89b3c]/10 text-[#d7b45d]">
                          <CalendarDays
                            size={15}
                            strokeWidth={1.7}
                          />
                        </div>

                        <div>

                          <p className="text-[9px] uppercase tracking-[0.12em] text-white/30">
                            Check-out
                          </p>

                          <p className="mt-0.5 text-sm text-white/80">
                            {checkOut}
                          </p>

                        </div>

                      </div>
                    )}

                    {/* Guests */}

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c89b3c]/10 text-[#d7b45d]">
                        <Users
                          size={15}
                          strokeWidth={1.7}
                        />
                      </div>

                      <div>

                        <p className="text-[9px] uppercase tracking-[0.12em] text-white/30">
                          Guests
                        </p>

                        <p className="mt-0.5 text-sm text-white/80">
                          {guests}{" "}
                          {Number(guests) ===
                          1
                            ? "Guest"
                            : "Guests"}
                        </p>

                      </div>

                    </div>

                    {/* Kids */}

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c89b3c]/10 text-[#d7b45d]">
                        <Baby
                          size={15}
                          strokeWidth={1.7}
                        />
                      </div>

                      <div>

                        <p className="text-[9px] uppercase tracking-[0.12em] text-white/30">
                          Kids
                        </p>

                        <p className="mt-0.5 text-sm text-white/80">
                          {kids}{" "}
                          {Number(kids) ===
                          1
                            ? "Kid"
                            : "Kids"}
                        </p>

                      </div>

                    </div>

                    {/* Rooms */}

                    <div className="flex items-center gap-3">

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c89b3c]/10 text-[#d7b45d]">
                        <BedDouble
                          size={15}
                          strokeWidth={1.7}
                        />
                      </div>

                      <div>

                        <p className="text-[9px] uppercase tracking-[0.12em] text-white/30">
                          Rooms
                        </p>

                        <p className="mt-0.5 text-sm text-white/80">
                          {numberOfRooms}{" "}
                          {Number(
                            numberOfRooms
                          ) === 1
                            ? "Room"
                            : "Rooms"}
                        </p>

                      </div>

                    </div>

                  </div>
                </div>
              </div>

              {/* Notice */}

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#c89b3c]/15 bg-[#c89b3c]/5 p-4">

                <CheckCircle2
                  size={18}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-[#d7b45d]"
                />

                <p className="text-xs leading-5 text-white/55">
                  No payment is required
                  online. Your request will be
                  sent to the hotel for
                  confirmation.
                </p>

              </div>

            </div>
          </div>

          {/* ========================================
              Form
          ======================================== */}

          <div className="max-h-[calc(100svh-40px)] overflow-y-auto bg-white px-6 py-8 sm:px-8 sm:py-10 lg:px-10">

            {/* Form Header */}

            <div className="mb-8">

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a77d25]">
                Booking Information
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[#1f1f1f] sm:text-3xl">
                Complete your request
              </h3>

              <p className="mt-2 max-w-lg text-sm leading-6 text-[#737373]">
                Choose your dates and provide
                your contact information.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* ========================================
                  Dates
              ======================================== */}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Check-in */}

                <div>

                  <label
                    htmlFor="check-in"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#555555]"
                  >
                    Check-in
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={18}
                      strokeWidth={1.7}
                      className={iconClasses}
                    />

                    <input
                      id="check-in"
                      type="date"
                      value={checkIn}
                      min={today}
                      onChange={
                        handleCheckInChange
                      }
                      disabled={loading}
                      className={`${inputClasses} pl-11 pr-4`}
                    />

                  </div>
                </div>

                {/* Check-out */}

                <div>

                  <label
                    htmlFor="check-out"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#555555]"
                  >
                    Check-out
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={18}
                      strokeWidth={1.7}
                      className={iconClasses}
                    />

                    <input
                      id="check-out"
                      type="date"
                      value={checkOut}
                      min={
                        checkIn
                          ? new Date(
                              new Date(
                                `${checkIn}T00:00:00`
                              ).getTime() +
                                24 *
                                  60 *
                                  60 *
                                  1000
                            )
                              .toISOString()
                              .split("T")[0]
                          : today
                      }
                      onChange={
                        handleCheckOutChange
                      }
                      disabled={
                        loading ||
                        !checkIn
                      }
                      className={`${inputClasses} pl-11 pr-4`}
                    />

                  </div>

                  {!checkIn && (
                    <p className="mt-1.5 text-xs text-[#999999]">
                      Select check-in first.
                    </p>
                  )}

                </div>

              </div>

              {/* ========================================
                  Guests / Kids / Rooms
              ======================================== */}

              <div className="grid gap-5 sm:grid-cols-3">

                {/* Guests */}

                <div>

                  <label
                    htmlFor="guests"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#555555]"
                  >
                    Guests
                  </label>

                  <div className="relative">

                    <Users
                      size={18}
                      strokeWidth={1.7}
                      className={iconClasses}
                    />

                    <input
                      id="guests"
                      type="number"
                      min="1"
                      max={
                        roomCapacity ||
                        undefined
                      }
                      value={guests}
                      onChange={(event) =>
                        setGuests(
                          Number(
                            event.target.value
                          )
                        )
                      }
                      disabled={loading}
                      className={`${inputClasses} pl-11 pr-3`}
                    />

                  </div>
                </div>

                {/* Kids */}

                <div>

                  <label
                    htmlFor="kids"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#555555]"
                  >
                    Kids
                  </label>

                  <div className="relative">

                    <Baby
                      size={18}
                      strokeWidth={1.7}
                      className={iconClasses}
                    />

                    <input
                      id="kids"
                      type="number"
                      min="0"
                      value={kids}
                      onChange={(event) =>
                        setKids(
                          Number(
                            event.target.value
                          )
                        )
                      }
                      disabled={loading}
                      className={`${inputClasses} pl-11 pr-3`}
                    />

                  </div>
                </div>

                {/* Rooms */}

                <div>

                  <label
                    htmlFor="number-of-rooms"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#555555]"
                  >
                    Rooms
                  </label>

                  <div className="relative">

                    <BedDouble
                      size={18}
                      strokeWidth={1.7}
                      className={iconClasses}
                    />

                    <select
                      id="number-of-rooms"
                      value={numberOfRooms}
                      onChange={(event) =>
                        setNumberOfRooms(
                          Number(
                            event.target.value
                          )
                        )
                      }
                      disabled={
                        loading ||
                        availableRooms <= 0
                      }
                      className={`${inputClasses} appearance-none pl-11 pr-3`}
                    >

                      {Array.from(
                        {
                          length: Math.max(
                            availableRooms,
                            1
                          ),
                        },
                        (_, index) =>
                          index + 1
                      ).map(
                        (roomNumber) => (
                          <option
                            key={
                              roomNumber
                            }
                            value={
                              roomNumber
                            }
                          >
                            {roomNumber}{" "}
                            {roomNumber === 1
                              ? "Room"
                              : "Rooms"}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  <p className="mt-1.5 text-xs text-[#999999]">
                    {availableRooms}{" "}
                    {availableRooms === 1
                      ? "room"
                      : "rooms"}{" "}
                    available
                  </p>

                </div>

              </div>

              {/* ========================================
                  Full Name
              ======================================== */}

              <div>

                <label
                  htmlFor="guest-name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#555555]"
                >
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    strokeWidth={1.7}
                    className={iconClasses}
                  />

                  <input
                    id="guest-name"
                    type="text"
                    value={guestName}
                    onChange={
                      handleGuestNameChange
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                    disabled={loading}
                    inputMode="text"
                    maxLength={100}
                    className={`${inputClasses} pl-11 pr-4`}
                  />

                </div>

                <p className="mt-1.5 text-xs text-[#999999]">
                  Letters, spaces, hyphens, and
                  apostrophes only.
                </p>

              </div>

              {/* ========================================
                  Email
              ======================================== */}

              <div>

                <label
                  htmlFor="guest-email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#555555]"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    strokeWidth={1.7}
                    className={iconClasses}
                  />

                  <input
                    id="guest-email"
                    type="email"
                    value={guestEmail}
                    onChange={(event) =>
                      setGuestEmail(
                        event.target.value
                      )
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading}
                    className={`${inputClasses} pl-11 pr-4`}
                  />

                </div>
              </div>

              {/* ========================================
                  Phone
              ======================================== */}

              <div>

                <label
                  htmlFor="guest-phone"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#555555]"
                >
                  Phone Number
                </label>

                <div className="relative">

                  <Phone
                    size={18}
                    strokeWidth={1.7}
                    className={iconClasses}
                  />

                  <input
                    id="guest-phone"
                    type="tel"
                    value={guestPhone}
                    onChange={(event) =>
                      setGuestPhone(
                        event.target.value
                      )
                    }
                    placeholder="+251 9XX XXX XXX"
                    autoComplete="tel"
                    disabled={loading}
                    className={`${inputClasses} pl-11 pr-4`}
                  />

                </div>
              </div>

              {/* ========================================
                  Special Request
              ======================================== */}

              <div>

                <label
                  htmlFor="special-request"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#555555]"
                >
                  Special Request

                  <span className="ml-2 font-normal normal-case tracking-normal text-[#999999]">
                    Optional
                  </span>
                </label>

                <div className="relative">

                  <MessageSquare
                    size={18}
                    strokeWidth={1.7}
                    className="pointer-events-none absolute left-4 top-4 text-[#999999]"
                  />

                  <textarea
                    id="special-request"
                    value={specialRequest}
                    onChange={(event) =>
                      setSpecialRequest(
                        event.target.value
                      )
                    }
                    placeholder="Anything we should know about your stay?"
                    rows={4}
                    disabled={loading}
                    className={`${inputClasses} resize-none py-3.5 pl-11 pr-4 leading-6`}
                  />

                </div>
              </div>

              {/* ========================================
                  Error
              ======================================== */}

              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5">

                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                  <p className="text-sm leading-6 text-red-700">
                    {error}
                  </p>

                </div>
              )}

              {/* ========================================
                  Buttons
              ======================================== */}

              <div className="flex flex-col gap-3 border-t border-[#e7e5e1] pt-6 sm:flex-row">

                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#ddd9d1] px-5 text-sm font-semibold text-[#555555] transition-all duration-300 hover:border-[#cfc9bd] hover:bg-[#faf9f6] hover:text-[#1f1f1f] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowLeft
                    size={16}
                    strokeWidth={1.8}
                  />

                  Back
                </button>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    availableRooms <= 0
                  }
                  className="group flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#171717] px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c89b3c] hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={17}
                        strokeWidth={1.8}
                        className="animate-spin"
                      />

                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Booking Request

                      <ArrowRight
                        size={16}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

              </div>

              {/* Notice */}

              <p className="text-center text-xs leading-5 text-[#999999]">
                By submitting this request,
                you agree that the hotel may
                contact you regarding your
                stay.
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

