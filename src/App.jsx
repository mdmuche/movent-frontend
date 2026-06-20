import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchUserProfile } from "./store/thunks/userThunks";

// public  routes
import Home from "./pages/public/Home";
import Events from "./pages/public/Events";
import EventDetails from "./pages/public/EventDetails";

// auth guards
import ProtectedRoute from "./components/ProtectedRoute";
import { AdminGuard } from "./components/AdminGuard";

// auth routes
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// attendee routes
import Profile from "./pages/attendee/Profile";
import Dashboard from "./pages/attendee/Dashboard";
import MyEvents from "./pages/attendee/MyEvents";
import Checkout from "./pages/attendee/Checkout";
import Notifications from "./pages/attendee/Notifications";
import PaymentResult from "./pages/attendee/PaymentResult";

import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

//organizer
import CreateEvent from "./pages/organizer/CreateEvent";
import OrganizerEvents from "./pages/organizer/OrganizerEvents";
import EditEvent from "./pages/organizer/EditEvent";
import Analytics from "./pages/organizer/Analytics";

//admin routes
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AuditLogs from "./pages/Admin/AuditLogs";
import UserRegistry from "./pages/Admin/UserRegistry";
import EventQueue from "./pages/Admin/EventQueue";
import SystemConfiguration from "./pages/Admin/SystemConfiguration";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/events/:slug" element={<EventDetails />} />
      <Route path="/events" element={<Events />} />
      {/* Protected Route */}
      <Route
        path="/organizer-events"
        element={
          <ProtectedRoute>
            <OrganizerEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-events"
        element={
          <ProtectedRoute>
            <MyEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout/:slug"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/payment-success"
        element={
          <ProtectedRoute>
            <PaymentResult />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-event"
        element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update/:id"
        element={
          <ProtectedRoute>
            <EditEvent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />
      {/*   Admin Routes */}
      <Route
        path="/admin-dashboard"
        element={
          <AdminGuard>
            <AdminDashboard />
          </AdminGuard>
        }
      />
      <Route
        path="/event-queue"
        element={
          <AdminGuard>
            <EventQueue />
          </AdminGuard>
        }
      />
      <Route
        path="/user-registry"
        element={
          <AdminGuard>
            <UserRegistry />
          </AdminGuard>
        }
      />
      <Route
        path="/audit-logs"
        element={
          <AdminGuard>
            <AuditLogs />
          </AdminGuard>
        }
      />
      <Route
        path="/system-configuration"
        element={
          <AdminGuard>
            <SystemConfiguration />
          </AdminGuard>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/verify-email/:verificationToken"
        element={<VerifyEmail />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
