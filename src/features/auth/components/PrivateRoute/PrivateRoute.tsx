import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/** Props for PrivateRoute component */
interface PrivateRouteProps {
  /** Child component to render if authenticated */
  children: JSX.Element;
}

/**
 * `PrivateRoute` restricts access to authenticated users.
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useAuth();

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
