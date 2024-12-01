import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "jose";
import { ColorModeContext } from "../../../context/ColorModeContext";
import {
  useNotification,
  NotificationSeverity,
} from "../../../context/NotificationContext";
import { login as authLogin } from "../services/authService";
import { AuthContextType } from "../types/authTypes";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  /** Child components that require authentication */
  children: ReactNode;
}

/**
 * `AuthProvider` manages authentication state and provides login/logout functionality.
 */
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const colorModeContext = useContext(ColorModeContext);
  const { showNotification } = useNotification();

  /**
   * Logs out the user, resets state, and navigates to login page.
   */
  const logout = useCallback(() => {
    if (colorModeContext && colorModeContext.setMode) {
      colorModeContext.setMode("light");
    }

    localStorage.removeItem("token");
    localStorage.setItem("currency", "USD");
    sessionStorage.clear();
    setToken(null);

    navigate("/login");
    showNotification({
      message: "Logged out successfully.",
      severity: NotificationSeverity.Success,
    });
  }, [navigate, colorModeContext, showNotification]);

  /**
   * Verifies the JWT token for expiration and validity.
   */
  useEffect(() => {
    const verifyToken = () => {
      if (token) {
        try {
          const payload = decodeJwt(token) as { exp?: number };

          if (payload.exp && Date.now() >= payload.exp * 1000) {
            console.warn("Token has expired.");
            logout();
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          showNotification({
            message: "Failed to login.",
            severity: NotificationSeverity.Error,
          });
          logout();
        }
      }
    };

    verifyToken();
  }, [token, logout, showNotification]);

  /**
   * Handles user login by obtaining and storing JWT token.
   * @param username - User's username
   * @param password - User's password
   */
  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const jwtToken = await authLogin(username, password);
        localStorage.setItem("token", jwtToken);
        setToken(jwtToken);
        navigate("/products");
        showNotification({
          message: "Logged in successfully.",
          severity: NotificationSeverity.Success,
        });
      } catch (error) {
        console.error("Login error:", error);
        showNotification({
          message: "Login failed. Please check your credentials.",
          severity: NotificationSeverity.Error,
        });
        throw error;
      }
    },
    [navigate, showNotification]
  );

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
