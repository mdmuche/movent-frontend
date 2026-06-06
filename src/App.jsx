import { Route, Routes } from "react-router-dom";

import Home from "./pages/public/Home";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import { AdminGuard } from "./components/AdminGuard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import EventDetails from "./pages/public/EventDetails";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Profile from "./pages/user/Profile";
import VerifyEmail from "./pages/auth/VerifyEmail";

import "./App.css";
import Events from "./pages/public/Events";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events/:slug" element={<EventDetails />} />
      <Route path="/events" element={<Events />} />
      <Route path="/checkout/:id" element={<Checkout />} />

      <Route
        path="/create-event"
        element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        }
      />
      {/* <Route path="/alerts" element={<Alerts />} /> */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
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
        path="/admin-dashboard"
        element={
          <AdminGuard>
            <AdminDashboard />
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
