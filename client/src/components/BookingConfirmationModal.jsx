import {
  CheckCircle2,
  CalendarDays,
  Users,
  BedDouble,
  Mail,
  User,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ========================================
// Format Date
// ========================================

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "—";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// ========================================
// Detail Item
// ========================================

const DetailItem = ({
  icon: Icon,
  label,
  children,
  className = "",
}) => {
  return (
    <div
      className={`group flex min-w-0 gap-3.5 sm:gap-4 ${className}`}
    >
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#999999]">
          {label}
        </p>

        <div className="mt-1 text-sm font-semibold leading-5 text-[#171717]">
          {children}
        </div>
      </div>
    </div>
  );
};

// ========================================
// Booking Confirmation Modal
// ========================================

const BookingConfirmationModal = ({
  isOpen,
  onClose,
  booking,
}) => {
  if (!isOpen || !booking) {
    return null;
  }

  // ========================================
  // Booking Data
  // ========================================

  const roomName =
    booking.room_name ||
    booking.room?.name ||
    "Selected room";

  const guestName =
    booking.guest_name ||
    booking.guestName ||
    "Guest";

  const guestEmail =
    booking.guest_email ||
    booking.guestEmail ||
    "Email not provided";

  const checkIn =
    booking.check_in ||
    booking.checkIn;

  const checkOut =
    booking.check_out ||
    booking.checkOut;

  const guests = Number(
    booking.guests || 0
  );

  const kids = Number(
    booking.kids || 0
  );

  const numberOfRooms = Number(
    booking.number_of_rooms ??
    booking.numberOfRooms ??
    1
  );

  const status =
    booking.status || "pending";

  // ========================================
  // Status Label
  // ========================================

  const formattedStatus =
    status === "pending"
      ? "Pending Confirmation"
      : status.charAt(0).toUpperCase() +
        status.slice(1);

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center overflow-y-auto bg-[#111111]/75 px-3 py-4 backdrop-blur-md sm:px-5 sm:py-8"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      {/* ========================================
          Modal
      ======================================== */}

      <div className="relative my-auto w-full max-w-2xl overflow-hidden rounded-[26px] border border-white/10 bg-white shadow-[0_35px_120px_rgba(0,0,0,0.32)] sm:rounded-[32px]">
        {/* ========================================
            Close Button
        ======================================== */}

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-black/45 hover:text-[#F5EAD2] active:scale-95 sm:right-5 sm:top-5"
          aria-label="Close booking confirmation"
        >
          <X
            size={18}
            strokeWidth={1.8}
          />
        </button>

        {/* ========================================
            Success Hero
        ======================================== */}

        <div className="relative overflow-hidden bg-[#171717] px-5 pb-8 pt-9 text-center sm:px-10 sm:pb-10 sm:pt-11">
          <div className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full border border-[#C89B3C]/10" />

          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[#C89B3C]/10" />

          <div className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full border border-[#C89B3C]/10" />

          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-36 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent" />

          <div className="relative flex items-center justify-center gap-2">
            <Sparkles
              size={13}
              strokeWidth={1.7}
              className="text-[#C89B3C]"
            />

            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D7B45D] sm:text-[10px]">
              Dveler Hotel
            </p>

            <Sparkles
              size={13}
              strokeWidth={1.7}
              className="text-[#C89B3C]"
            />
          </div>

          <div className="relative mx-auto mt-6 flex h-[76px] w-[76px] items-center justify-center rounded-full border border-[#C89B3C]/35 bg-[#C89B3C]/10 text-[#D7B45D] shadow-[0_0_45px_rgba(200,155,60,0.1)] sm:h-[82px] sm:w-[82px]">
            <div className="absolute inset-1.5 rounded-full border border-[#C89B3C]/15" />

            <div className="absolute inset-3 rounded-full bg-[#C89B3C]/5" />

            <CheckCircle2
              size={40}
              strokeWidth={1.45}
              className="relative"
            />
          </div>

          <p className="relative mt-6 text-[9px] font-bold uppercase tracking-[0.28em] text-[#C89B3C] sm:text-[10px]">
            Request Received
          </p>

          <h2 className="relative mt-3 text-[25px] font-semibold tracking-[-0.035em] text-white sm:text-3xl">
            Your stay request is on its way
          </h2>

          <p className="relative mx-auto mt-3 max-w-md text-[13px] leading-6 text-white/55 sm:text-sm">
            Thank you for choosing Dveler Hotel.
            We have received your request and
            the hotel team will review it shortly.
          </p>

          <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-[#C89B3C]/20 bg-[#C89B3C]/10 px-3.5 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C89B3C] opacity-50" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C89B3C]" />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D7B45D]">
              {formattedStatus}
            </span>
          </div>
        </div>

        {/* ========================================
            Main Content
        ======================================== */}

        <div className="bg-white px-5 pb-6 pt-5 sm:px-9 sm:pb-9 sm:pt-7">
          {/* ========================================
              Email Response Message
          ======================================== */}

          <div className="relative overflow-hidden rounded-[20px] border border-[#E8D8B6] bg-[#FFFDF8] p-4 sm:p-5">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#C89B3C]/5" />

            <div className="relative flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5EAD2] text-[#A77D25]">
                <Mail
                  size={18}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#171717] sm:text-[15px]">
                  We’ll be in touch by email
                </p>

                <p className="mt-1.5 text-xs leading-5 text-[#666666] sm:text-[13px]">
                  Our hotel team will review your
                  request and contact you by email
                  with our response. Please check
                  your inbox and spam folder for
                  updates from Dveler Hotel.
                </p>

                <div className="mt-3 flex min-w-0 items-center gap-2">
                  <Mail
                    size={13}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#C89B3C]"
                  />

                  <span className="min-w-0 break-all text-[11px] font-medium text-[#A77D25] sm:text-xs">
                    {guestEmail}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================
              Reservation Details
          ======================================== */}

          <div className="mt-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A77D25]">
                  Your Reservation
                </p>

                <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.025em] text-[#171717] sm:text-xl">
                  Stay details
                </h3>
              </div>
            </div>

            <div className="mt-5 grid gap-x-6 gap-y-6 sm:grid-cols-2">
              <DetailItem
                icon={User}
                label="Guest"
              >
                <span className="block truncate">
                  {guestName}
                </span>
              </DetailItem>

              <DetailItem
                icon={BedDouble}
                label="Room"
              >
                <span className="block break-words">
                  {roomName}
                </span>

                {numberOfRooms > 0 && (
                  <span className="mt-0.5 block text-xs font-normal text-[#737373]">
                    {numberOfRooms}{" "}
                    {numberOfRooms === 1
                      ? "room"
                      : "rooms"}
                  </span>
                )}
              </DetailItem>

              <DetailItem
                icon={CalendarDays}
                label="Check-in"
              >
                {formatDate(checkIn)}
              </DetailItem>

              <DetailItem
                icon={CalendarDays}
                label="Check-out"
              >
                {formatDate(checkOut)}
              </DetailItem>

              <DetailItem
                icon={Users}
                label="Guests"
              >
                <span>
                  {guests}{" "}
                  {guests === 1
                    ? "Guest"
                    : "Guests"}
                </span>

                {kids > 0 && (
                  <span className="ml-1.5 font-normal text-[#737373]">
                    · {kids}{" "}
                    {kids === 1
                      ? "Child"
                      : "Children"}
                  </span>
                )}
              </DetailItem>

              <DetailItem
                icon={Mail}
                label="Confirmation Email"
              >
                <span className="block break-all text-[13px]">
                  {guestEmail}
                </span>
              </DetailItem>
            </div>
          </div>

          {/* ========================================
              Next Steps
          ======================================== */}

          <div className="my-7 h-px bg-[#E7E5E1]" />

          <div className="relative overflow-hidden rounded-[20px] border border-[#E7E5E1] bg-[#FAF9F6] p-4 sm:p-5">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-[#C89B3C]/10" />

            <div className="relative flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5EAD2] text-[#A77D25]">
                <CheckCircle2
                  size={17}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#171717]">
                  What happens next?
                </p>

                <p className="mt-1.5 text-xs leading-5 text-[#666666] sm:text-[13px]">
                  Your request is now with our hotel
                  team. Please keep an eye on your
                  email for our response and any
                  further information about your stay.
                </p>
              </div>
            </div>
          </div>

          {/* ========================================
              Close Button
          ======================================== */}

          <div className="mt-6">
            <button
              type="button"
              onClick={onClose}
              className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C89B3C] hover:shadow-[0_14px_35px_rgba(0,0,0,0.12)] active:translate-y-0"
            >
              Back to Dveler Hotel

              <ArrowRight
                size={17}
                strokeWidth={1.9}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* ========================================
              Footer Note
          ======================================== */}

          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-[#E7E5E1]" />

            <p className="text-center text-[10px] leading-5 text-[#999999]">
              No payment is required at this stage.
            </p>

            <div className="h-px w-8 bg-[#E7E5E1]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;