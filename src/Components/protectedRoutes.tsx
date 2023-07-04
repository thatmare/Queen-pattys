
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children, token }) => {
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};