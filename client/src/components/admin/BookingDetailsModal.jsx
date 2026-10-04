import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  User,
  Users,
  X,
  XCircle,
} from "lucide-react";

const BookingDetailsModal = ({
  isOpen,
  onClose,
  booking,
  onStatusChange,
  statusLoading,
}) => {
  // ========================================
  // Do Not Render
  // ========================================

  if (!isOpen || !booking) {
    return null;
  }

  // ========================================
  // Format Date
  // ========================================

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  // ========================================
  // Format Date + Time
  // ========================================

  const formatDateTime = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  // ========================================
  // Booking Status
  // ========================================

  const status = String(
    booking.status || "pending"
  ).toLowerCase();

  const statusConfig = {
    pending: {
      label: "Pending",
      className:
        "border-[#F2D7A0] bg-[#FFF8E8] text-[#A77D25]",
      dot: "bg-[#C89B3C]",
    },

    confirmed: {
      label: "Confirmed",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
      dot: "bg-emerald-500",
    },

    cancelled: {
      label: "Cancelled",
      className:
        "border-red-200 bg-red-50 text-red-700",
      dot: "bg-red-500",
    },

    completed: {
      label: "Completed",
      className:
        "border-blue-200 bg-blue-50 text-blue-700",
      dot: "bg-blue-500",
    },
  };

  const currentStatus =
    statusConfig[status] || {
      label:
        status.charAt(0).toUpperCase() +
        status.slice(1),
      className:
        "border-gray-200 bg-gray-50 text-gray-700",
      dot: "bg-gray-400",
    };

  // ========================================
  // Detail Item
  // ========================================

  const DetailItem = ({
    icon: Icon,
    label,
    value,
    iconClassName = "text-[#8A8882]",
    valueClassName = "",
  }) => {
    return (
      <div className="rounded-2xl border border-[#E7E5E1] bg-white p-4 transition duration-300 hover:border-[#D9D4C9] hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon
              size={15}
              strokeWidth={1.8}
              className={iconClassName}
            />
          )}

          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A8882]">
            {label}
          </p>
        </div>

        <p
          className={`mt-2 break-words text-sm font-semibold text-[#171717] ${valueClassName}`}
        >
          {value || "—"}
        </p>
      </div>
    );
  };

  // ========================================
  // Render
  // ========================================

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center overflow-y-auto bg-black/65 px-4 py-6 backdrop-blur-md sm:py-10"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          if (!statusLoading) {
            onClose?.();
          }
        }
      }}
    >
      <div
        className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.28)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-details-title"
      >
        {/* ========================================
            HEADER
        ======================================== */}

        <div className="relative shrink-0 overflow-hidden bg-[#171717] px-5 py-6 sm:px-8 sm:py-7">
          <div className="absolute -right-24 -top-28 h-64 w-64 rounded-full border border-[#C89B3C]/15" />

          <div className="absolute -bottom-32 left-1/3 h-52 w-52 rounded-full border border-[#C89B3C]/10" />

          <div className="relative flex items-start justify-between gap-5">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#C89B3C]/25 bg-[#C89B3C]/10 text-[#C89B3C]">
                <CalendarDays
                  size={21}
                  strokeWidth={1.8}
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-px w-6 shrink-0 bg-[#C89B3C]" />

                  <p className="text-[10px] font-bold uppercase tracking-[0.27em] text-[#C89B3C]">
                    Reservation
                  </p>
                </div>

                <h2
                  id="booking-details-title"
                  className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                  Booking Details
                </h2>

                <p className="mt-1.5 text-sm text-gray-400">
                  Booking #
                  <span className="ml-1 font-semibold text-gray-200">
                    {booking.id}
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={statusLoading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition duration-300 hover:border-[#C89B3C]/40 hover:bg-[#C89B3C]/10 hover:text-[#C89B3C] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close booking details"
            >
              <X
                size={19}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#FAF9F6] p-5 sm:p-8">
          {/* ========================================
              STATUS SUMMARY
          ======================================== */}

          <div className="rounded-[24px] border border-[#E7E5E1] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8882]">
                  Current Status
                </p>

                <div
                  className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold ${currentStatus.className}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${currentStatus.dot}`}
                  />

                  {currentStatus.label}
                </div>
              </div>

              <div className="sm:text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8882]">
                  Submitted
                </p>

                <p className="mt-2 text-sm font-semibold text-[#555555]">
                  {formatDateTime(
                    booking.created_at
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* ========================================
              GUEST INFORMATION
          ======================================== */}

          <section className="mt-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5EAD2] text-[#A77D25]">
                <User
                  size={17}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#171717]">
                  Guest Information
                </h3>

                <p className="mt-0.5 text-xs text-[#8A8882]">
                  Contact and guest details
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <DetailItem
                label="Full Name"
                value={
                  booking.guest_name
                }
                icon={User}
                iconClassName="text-[#C89B3C]"
              />

              <DetailItem
                label="Email"
                value={
                  booking.guest_email
                }
                icon={Mail}
                iconClassName="text-[#C89B3C]"
                valueClassName="break-all"
              />

              <DetailItem
                label="Phone"
                value={
                  booking.guest_phone
                }
                icon={Phone}
                iconClassName="text-[#C89B3C]"
              />

              <DetailItem
                label="Guests"
                value={`${booking.guests || 0} ${
                  Number(
                    booking.guests || 0
                  ) === 1
                    ? "guest"
                    : "guests"
                }`}
                icon={Users}
                iconClassName="text-[#C89B3C]"
              />
            </div>
          </section>

          {/* ========================================
              STAY INFORMATION
          ======================================== */}

          <section className="mt-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5EAD2] text-[#A77D25]">
                <CalendarDays
                  size={17}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#171717]">
                  Stay Information
                </h3>

                <p className="mt-0.5 text-xs text-[#8A8882]">
                  Requested check-in and check-out
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#E7E5E1] bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8882]">
                  Check-in
                </p>

                <p className="mt-2 text-base font-semibold text-[#171717]">
                  {formatDate(
                    booking.check_in
                  )}
                </p>
              </div>

              <div className="rounded-2xl border border-[#E7E5E1] bg-white p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8882]">
                  Check-out
                </p>

                <p className="mt-2 text-base font-semibold text-[#171717]">
                  {formatDate(
                    booking.check_out
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* ========================================
              ROOM INFORMATION
          ======================================== */}

          <section className="mt-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5EAD2] text-[#A77D25]">
                <Clock3
                  size={17}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#171717]">
                  Room Information
                </h3>

                <p className="mt-0.5 text-xs text-[#8A8882]">
                  Selected accommodation
                </p>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[24px] border border-[#E7E5E1] bg-white">
              <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold tracking-tight text-[#171717]">
                    {booking.room_name ||
                      "—"}
                  </p>

                  <div className="mt-2 inline-flex rounded-full border border-[#F5EAD2] bg-[#FAF5E9] px-3 py-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A77D25]">
                      {booking.room_type ||
                        "Room"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#E7E5E1] pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:text-right">
                  <p className="text-xl font-bold tracking-tight text-[#171717]">
                    $
                    {Number(
                      booking.price_per_night ||
                        0
                    ).toFixed(2)}
                  </p>

                  <p className="mt-0.5 text-xs text-[#8A8882]">
                    per night
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================
              SPECIAL REQUEST
          ======================================== */}

          {booking.special_request && (
            <section className="mt-7">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5EAD2] text-[#A77D25]">
                  <Clock3
                    size={17}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#171717]">
                    Special Request
                  </h3>

                  <p className="mt-0.5 text-xs text-[#8A8882]">
                    Guest-provided note
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-[22px] border border-[#E7E5E1] bg-white p-5 sm:p-6">
                <p className="whitespace-pre-wrap text-sm leading-7 text-[#555555]">
                  {booking.special_request}
                </p>
              </div>
            </section>
          )}

          {/* ========================================
              BOOKING ACTIONS
          ======================================== */}

          <section className="mt-8 border-t border-[#E7E5E1] pt-7">
            <div>
              <h3 className="text-sm font-bold text-[#171717]">
                Booking Actions
              </h3>

              <p className="mt-1 text-xs text-[#8A8882]">
                Update the reservation status when
                appropriate.
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {/* Confirm */}

              {status !== "confirmed" &&
                status !== "cancelled" &&
                status !== "completed" && (
                  <button
                    type="button"
                    onClick={() =>
                      onStatusChange?.(
                        booking.id,
                        "confirmed"
                      )
                    }
                    disabled={
                      statusLoading
                    }
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#171717] px-4 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#C89B3C] hover:shadow-lg hover:shadow-black/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {statusLoading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <CheckCircle2
                        size={17}
                        strokeWidth={1.8}
                      />
                    )}

                    Confirm
                  </button>
                )}

              {/* Cancel */}

              {status !== "cancelled" &&
                status !== "completed" && (
                  <button
                    type="button"
                    onClick={() =>
                      onStatusChange?.(
                        booking.id,
                        "cancelled"
                      )
                    }
                    disabled={
                      statusLoading
                    }
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition duration-300 hover:-translate-y-0.5 hover:bg-red-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {statusLoading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-200 border-t-red-600" />
                    ) : (
                      <XCircle
                        size={17}
                        strokeWidth={1.8}
                      />
                    )}

                    Cancel
                  </button>
                )}

              {/* Complete */}

              {status === "confirmed" && (
                <button
                  type="button"
                  onClick={() =>
                    onStatusChange?.(
                      booking.id,
                      "completed"
                    )
                  }
                  disabled={
                    statusLoading
                  }
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-3 text-sm font-semibold text-blue-600 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {statusLoading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
                  ) : (
                    <CheckCircle2
                      size={17}
                      strokeWidth={1.8}
                    />
                  )}

                  Complete
                </button>
              )}
            </div>
          </section>
        </div>

        {/* ========================================
            FOOTER
        ======================================== */}

        <div className="flex shrink-0 border-t border-[#E7E5E1] bg-white px-5 py-4 sm:justify-end sm:px-8">
          <button
            type="button"
            onClick={onClose}
            disabled={statusLoading}
            className="w-full min-h-11 rounded-full bg-[#171717] px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#C89B3C] hover:shadow-lg hover:shadow-black/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;

