import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated, authChecked } = useSelector((state) => state.user);

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

  return children;
}

export default ProtectedRoute;
