import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AdminGuard = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
