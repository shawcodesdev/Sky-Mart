import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { MyStoreContext } from "../context/ShopContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(MyStoreContext) || {};
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const { user } = useContext(MyStoreContext) || {};

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
