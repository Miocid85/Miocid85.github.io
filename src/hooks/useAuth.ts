import { useState, useEffect, useCallback } from 'react';

export interface User {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  phone: string;
  sector: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const isAuthenticated = useCallback(() => {
    return user !== null;
  }, [user]);

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated
  };
};