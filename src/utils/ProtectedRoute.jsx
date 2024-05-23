import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const ProtectedRoute = () => {
  const { user } = useAuthContext();
  return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
