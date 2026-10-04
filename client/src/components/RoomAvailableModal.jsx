import {
  CalendarCheck,
  CheckCircle2,
  Users,
  X,
  ArrowRight,
} from "lucide-react";

const RoomAvailableModal = ({
  isOpen,
  onClose,
  room,
  checkIn,
  checkOut,
  guests,
  onBookNow,
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
          className="absolute right-5 top-5 z-10 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close room available modal"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center px-6 pb-8 pt-10 text-center sm:px-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={34} />
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Room Available
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-gray-900">
            Great news!
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-600">
            The room you selected is available for
            your requested dates.
          </p>

          <div className="mt-7 w-full rounded-2xl bg-gray-50 p-5 text-left">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {room.name}
                </h3>

                <p className="mt-1 text-sm text-amber-600">
                  {room.room_type}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  ${room.price_per_night}
                </p>

                <p className="text-xs text-gray-500">
                  per night
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 border-t border-gray-200 pt-4 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <CalendarCheck
                  size={17}
                  className="shrink-0 text-amber-600"
                />

                <div>
                  <p className="text-[11px] uppercase tracking-wide text-gray-400">
                    Check-in
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {checkIn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CalendarCheck
                  size={17}
                  className="shrink-0 text-amber-600"
                />

                <div>
                  <p className="text-[11px] uppercase tracking-wide text-gray-400">
                    Check-out
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {checkOut}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users
                  size={17}
                  className="shrink-0 text-amber-600"
                />

                <div>
                  <p className="text-[11px] uppercase tracking-wide text-gray-400">
                    Guests
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {guests}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onBookNow}
            className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            Book Now

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="mt-3 w-full rounded-full px-6 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            Choose Different Dates
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomAvailableModal;