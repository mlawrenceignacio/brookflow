import React from "react";
import useAuthStore from "../../store/useAuthStore.js";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
