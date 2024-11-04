import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from 'jose';
import { ColorModeContext } from './ColorModeContext';
import axiosInstance from '../api/axiosInstance';

interface AuthContextType {
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const navigate = useNavigate();

  const colorModeContext = useContext(ColorModeContext);

  // Memoize logout to prevent unnecessary re-creations
  const logout = useCallback(() => {
    if (colorModeContext && colorModeContext.setMode) {
      colorModeContext.setMode('light');
    }

    localStorage.removeItem('token');
    localStorage.setItem('currency', 'USD');
    sessionStorage.clear();
    setToken(null);

    navigate('/login');
  }, [navigate, colorModeContext]);

  useEffect(() => {
    // Verify token on app load and when token changes
    const verifyToken = () => {
      if (token) {
        try {
          const payload = decodeJwt(token) as { exp?: number };

          if (payload.exp && Date.now() >= payload.exp * 1000) {
            console.warn('Token has expired.');
            logout();
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          logout();
        }
      }
    };

    verifyToken();
  }, [token, logout]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axiosInstance.post('/login', { username, password });
      const jwtToken = response.data.token;

      localStorage.setItem('token', jwtToken);
      setToken(jwtToken);
      navigate('/products');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;