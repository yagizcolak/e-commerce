import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useContext, // Import useContext
} from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeJwt, SignJWT } from 'jose';
import { ColorModeContext } from './ColorModeContext'; // Import ColorModeContext
import { JWT_SECRET } from '../config';

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

  // Access ColorModeContext
  const colorModeContext = useContext(ColorModeContext);

  // Memoize logout to prevent unnecessary re-creations
  const logout = useCallback(() => {
    // Reset color mode to 'light' using setMode from ColorModeContext
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
          // Decode the token payload directly
          const payload = decodeJwt(token) as { exp?: number };

          // Check token expiration
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
    // Simulate API call
    if (username === 'user' && password === 'user123') {
      try {
        // Generate JWT token
        const jwtToken = await new SignJWT({ username })
          .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
          .setIssuedAt()
          .setExpirationTime('1h')
          .sign(new TextEncoder().encode(JWT_SECRET));

        // I know this is not the safest way to store JWT, just for the sake of demonstration 
        localStorage.setItem('token', jwtToken);
        setToken(jwtToken);
        navigate('/products');
      } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Failed to generate token');
      }
    } else {
      console.warn('Invalid username or password attempt.');
      throw new Error('Invalid username or password');
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;