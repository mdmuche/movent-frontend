import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AdminGuard = ({ children }) => {
  const { authChecked, profile, isAuthenticated } = useSelector(
    (state) => state.user,
  );

  if (!authChecked) {
    return (
      <div className="h-screen flex items-center justify-center text-sm font-bold text-[#004d4d]">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.user?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
