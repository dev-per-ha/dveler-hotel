import {
  CalendarX2,
  X,
  ArrowLeft,
} from "lucide-react";

const RoomUnavailableModal = ({
  isOpen,
  onClose,
  room,
  checkIn,
  checkOut,
  guests,
}) => {
  if (!isOpen || !room) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close room unavailable modal"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center px-6 pb-8 pt-10 text-center sm:px-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
            <CalendarX2 size={32} />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-red-600">
            Not Available
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-gray-900">
            No availability
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-600">
            Unfortunately, this room is not available
            for the dates and number of guests you
            selected.
          </p>

          <div className="mt-7 w-full rounded-2xl bg-gray-50 p-5 text-left">
            <h3 className="text-lg font-semibold text-gray-900">
              {room.name}
            </h3>

            <p className="mt-1 text-sm text-amber-600">
              {room.room_type}
            </p>

            <div className="mt-5 grid gap-3 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-500">
                  Check-in
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  {checkIn}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-500">
                  Check-out
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  {checkOut}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-gray-500">
                  Guests
                </span>

                <span className="text-sm font-semibold text-gray-900">
                  {guests}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            <ArrowLeft size={18} />
            Try Different Dates
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomUnavailableModal;