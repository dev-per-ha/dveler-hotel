import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import RoomsSection from "./sections/RoomsSection";
import ServicesSection from "./sections/ServicesSection";
import ContactSection from "./sections/ContactSection";

import BookingForm from "./components/BookingForm";
import BookingConfirmationModal from "./components/BookingConfirmationModal";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRooms from "./pages/admin/AdminRooms";

import { createBooking } from "./services/bookingService";

// ========================================
// Public Home Page
// ========================================

const Home = () => {
  // --------------------------------
  // Selected Room
  // --------------------------------

  const [selectedRoom, setSelectedRoom] = useState(null);

  // --------------------------------
  // Booking Form
  // --------------------------------

  const [isBookingFormOpen, setIsBookingFormOpen] =
    useState(false);

  // --------------------------------
  // Booking Confirmation
  // --------------------------------

  const [
    isConfirmationModalOpen,
    setIsConfirmationModalOpen,
  ] = useState(false);

  const [confirmedBooking, setConfirmedBooking] =
    useState(null);

  // --------------------------------
  // Open Booking Form
  // --------------------------------

  const handleBookRoom = (room) => {
    if (!room) {
      return;
    }

    const availableRooms = Number(room.available || 0);

    // Do not allow booking when:
    // - Room is not available
    // - No rooms are available
    if (
      room.status !== "available" ||
      availableRooms <= 0
    ) {
      return;
    }

    setSelectedRoom(room);
    setIsBookingFormOpen(true);
  };

  // --------------------------------
  // Close Booking Form
  // --------------------------------

  const handleCloseBookingForm = () => {
    setIsBookingFormOpen(false);
    setSelectedRoom(null);
  };

  // --------------------------------
  // Submit Booking
  // --------------------------------

  const handleSubmitBooking = async (bookingData) => {
    const response = await createBooking({
      roomId: bookingData.roomId,

      guestName: bookingData.guestName,

      guestEmail: bookingData.guestEmail,

      guestPhone: bookingData.guestPhone,

      checkIn: bookingData.checkIn,

      checkOut: bookingData.checkOut,

      guests: bookingData.guests,

      kids: bookingData.kids,

      numberOfRooms: bookingData.numberOfRooms,

      specialRequest:
        bookingData.specialRequest || null,
    });

    console.log(
      "Booking created successfully:",
      response
    );

    const booking =
      response.data?.booking || response.data;

    // --------------------------------
    // Prepare Confirmation Data
    // --------------------------------

    setConfirmedBooking({
      ...booking,

      room:
        booking.room || selectedRoom,

      room_name:
        booking.room_name ||
        selectedRoom?.name,

      guest_name:
        booking.guest_name ||
        bookingData.guestName,

      guest_email:
        booking.guest_email ||
        bookingData.guestEmail,

      guest_phone:
        booking.guest_phone ||
        bookingData.guestPhone,

      check_in:
        booking.check_in ||
        bookingData.checkIn,

      check_out:
        booking.check_out ||
        bookingData.checkOut,

      guests:
        booking.guests ?? bookingData.guests,

      kids:
        booking.kids ?? bookingData.kids,

      number_of_rooms:
        booking.number_of_rooms ??
        bookingData.numberOfRooms,

      special_request:
        booking.special_request ??
        bookingData.specialRequest,
    });

    // Close booking form
    setIsBookingFormOpen(false);
    setSelectedRoom(null);

    // Open confirmation
    setIsConfirmationModalOpen(true);

    return response;
  };

  // --------------------------------
  // Close Confirmation
  // --------------------------------

  const handleCloseConfirmation = () => {
    setIsConfirmationModalOpen(false);
    setConfirmedBooking(null);
  };

  // --------------------------------
  // Render
  // --------------------------------

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <HeroSection />

        {/* About */}
        <AboutSection />

        {/* Rooms */}
        <RoomsSection
          onBookRoom={handleBookRoom}
        />

        {/* Services */}
        <ServicesSection />

        {/* Contact */}
        <ContactSection />

        {/* Booking Form */}
        <BookingForm
          isOpen={isBookingFormOpen}
          onClose={handleCloseBookingForm}
          room={selectedRoom}
          onSubmitBooking={handleSubmitBooking}
        />

        {/* Booking Confirmation */}
        <BookingConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={handleCloseConfirmation}
          booking={confirmedBooking}
        />
      </main>

      <Footer />
    </>
  );
};

// ========================================
// App
// ========================================

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* =================================
            PUBLIC WEBSITE
        ================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* =================================
            ADMIN LOGIN
        ================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* =================================
            PROTECTED ADMIN AREA
        ================================= */}

        <Route
          path="/admin"
          element={<ProtectedAdminRoute />}
        >
          <Route element={<AdminLayout />}>
            {/* Dashboard */}
            <Route
              path="dashboard"
              element={<AdminDashboard />}
            />

            {/* Rooms */}
            <Route
              path="rooms"
              element={<AdminRooms />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

