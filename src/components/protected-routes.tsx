import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { token, roleAccess } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roleAccess !== "admin" && !allowedRoles.includes(roleAccess || "")) {
    alert("Your account does not have access to this page!");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;