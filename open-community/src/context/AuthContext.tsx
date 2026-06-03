import { createContext, useContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import { api } from '../services/api';

type DjangoRole = 'STUDENT' | 'TEACHER' | 'MODERATOR' | 'ADMIN';
type AppRole = 'member' | 'instructor' | 'moderator' | 'admin';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: DjangoRole;
}

interface AuthContextType {
  user: User | null;
  appRole: AppRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => Promise<void>;
  googleLogin: (accessToken: string) => Promise<void>;
  logout: () => void;
}

const roleMap: Record<DjangoRole, AppRole> = {
  STUDENT: 'member',
  TEACHER: 'instructor',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
};

const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const refresh = localStorage.getItem('refresh');
      if (!refresh) {
        setIsLoading(false);
        return;
      }
      try {
        // Try to refresh the access token
        const { access, refresh: newRefresh } = await api.refreshToken(refresh);
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', newRefresh);
        // Get user profile
        const profile = await api.getProfile();
        setUser(profile);
      } catch {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  // Auto-refresh access token every 4 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      const refresh = localStorage.getItem('refresh');
      if (!refresh) return;
      try {
        const { access, refresh: newRefresh } = await api.refreshToken(refresh);
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', newRefresh);
      } catch {
        logout();
      }
    }, 4 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string) => {
    const { access, refresh } = await api.login(email, password);
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    const profile = await api.getProfile();
    setUser(profile);
  };

  const register = async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    await api.register(data);
    await login(data.email, data.password);
  };

  const googleLogin = async (accessToken: string) => {
    const { access, refresh } = await api.googleLogin(accessToken);
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    const profile = await api.getProfile();
    setUser(profile);
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  const appRole = user ? roleMap[user.role] : null;

  return (
    <AuthContext.Provider
      value={{ user, appRole, isLoading, login, register, googleLogin, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}