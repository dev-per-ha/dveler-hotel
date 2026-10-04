import { useEffect, useState } from "react";
import {
  CalendarDays,
  Users,
  BedDouble,
  X,
  Search,
  Loader2,
} from "lucide-react";

const AvailabilityModal = ({
  room,
  isOpen,
  onClose,
  onResult,
}) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [numberOfRooms, setNumberOfRooms] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setCheckIn("");
      setCheckOut("");
      setGuests(1);
      setNumberOfRooms(1);
      setError("");
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen || !room) {
    return null;
  }

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const handleCheckInChange = (event) => {
    const selectedDate = event.target.value;

    setCheckIn(selectedDate);

    /*
      If the new check-in date is on or after
      the current check-out date, clear checkout.
    */
    if (
      checkOut &&
      selectedDate >= checkOut
    ) {
      setCheckOut("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!checkIn || !checkOut) {
      setError(
        "Please select both check-in and check-out dates."
      );
      return;
    }

    if (checkIn < today) {
      setError(
        "Check-in date cannot be in the past."
      );
      return;
    }

    if (checkOut <= checkIn) {
      setError(
        "Check-out date must be after check-in date."
      );
      return;
    }

    if (
      guests < 1 ||
      guests > Number(room.capacity)
    ) {
      setError(
        `This room can accommodate up to ${room.capacity} guests.`
      );
      return;
    }

    if (
      numberOfRooms < 1 ||
      numberOfRooms > Number(room.available)
    ) {
      setError(
        `Only ${room.available} room${
          Number(room.available) === 1
            ? ""
            : "s"
        } currently available.`
      );
      return;
    }

    try {
      setLoading(true);

      const params = new URLSearchParams({
        checkIn,
        checkOut,
        guests: String(guests),
        numberOfRooms: String(
          numberOfRooms
        ),
      });

      const response = await fetch(
        `http://localhost:5000/api/rooms/availability?${params.toString()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to check availability."
        );
      }

      const availableRooms =
        data.data || [];

      const matchingRoom =
        availableRooms.find(
          (availableRoom) =>
            Number(availableRoom.id) ===
            Number(room.id)
        );

      /*
        Room is NOT available.
        Send the result to App.jsx.
      */
      if (!matchingRoom) {
        onResult({
          room: null,
          checkIn,
          checkOut,
          guests,
          numberOfRooms,
        });

        return;
      }

      /*
        Room IS available.
        Send the room and booking details
        to App.jsx.
      */
      onResult({
        room: matchingRoom,
        checkIn,
        checkOut,
        guests,
        numberOfRooms,
      });
    } catch (error) {
      console.error(
        "Availability check error:",
        error
      );

      setError(
        error.message ||
          "Unable to check availability. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-gray-900 px-6 py-7 text-white sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Close availability modal"
          >
            <X size={20} />
          </button>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            Check Availability
          </p>

          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
            {room.name}
          </h2>

          <p className="mt-2 text-sm text-white/70">
            {room.room_type} · Up to{" "}
            {room.capacity} guests ·{" "}
            {room.available}{" "}
            {Number(room.available) === 1
              ? "room"
              : "rooms"}{" "}
            available
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Check-in */}
            <div>
              <label
                htmlFor="check-in"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Check-in
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="check-in"
                  type="date"
                  min={today}
                  value={checkIn}
                  onChange={
                    handleCheckInChange
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
                  required
                />
              </div>
            </div>

            {/* Check-out */}
            <div>
              <label
                htmlFor="check-out"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Check-out
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="check-out"
                  type="date"
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
                  value={checkOut}
                  onChange={(event) =>
                    setCheckOut(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
                  required
                />
              </div>
            </div>

            {/* Guests */}
            <div>
              <label
                htmlFor="guests"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Guests
              </label>

              <div className="relative">
                <Users
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  id="guests"
                  value={guests}
                  onChange={(event) =>
                    setGuests(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
                >
                  {Array.from(
                    {
                      length: Number(
                        room.capacity
                      ),
                    },
                    (_, index) =>
                      index + 1
                  ).map((number) => (
                    <option
                      key={number}
                      value={number}
                    >
                      {number}{" "}
                      {number === 1
                        ? "Guest"
                        : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Maximum capacity:{" "}
                {room.capacity} guests
              </p>
            </div>

            {/* Number of Rooms */}
            <div>
              <label
                htmlFor="number-of-rooms"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Number of Rooms
              </label>

              <div className="relative">
                <BedDouble
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-100"
                >
                  {Array.from(
                    {
                      length: Math.max(
                        1,
                        Number(
                          room.available
                        )
                      ),
                    },
                    (_, index) =>
                      index + 1
                  ).map((number) => (
                    <option
                      key={number}
                      value={number}
                    >
                      {number}{" "}
                      {number === 1
                        ? "Room"
                        : "Rooms"}
                    </option>
                  ))}
                </select>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Currently available:{" "}
                {room.available}{" "}
                {Number(room.available) ===
                1
                  ? "room"
                  : "rooms"}
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm leading-6 text-red-700">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Checking...
              </>
            ) : (
              <>
                <Search size={18} />
                Check Availability
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AvailabilityModal;