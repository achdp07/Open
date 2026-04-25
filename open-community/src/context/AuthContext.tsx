import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { PropsWithChildren } from 'react';

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
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => Promise<void>;
  logout: () => void;
}

const roleMap: Record<DjangoRole, AppRole> = {
  STUDENT: 'member',
  TEACHER: 'instructor',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.getMe(token)
        .then((u) => setUser(u))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user } = await api.login({ email, password });
    localStorage.setItem('token', token);
    setUser(user);
  };

  const register = async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    // const newUser = await api.register(data);
    const { token, user } = await api.login({
      email: data.email,
      password: data.password,
    });
    localStorage.setItem('token', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const appRole = user ? roleMap[user.role] : null;

  return (
    <AuthContext.Provider
      value={{ user, appRole, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}