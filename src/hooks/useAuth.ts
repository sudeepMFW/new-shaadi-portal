import { useState, useCallback } from 'react';

interface User {
  email: string;
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email !== 'Shaadi@gmail.com' || password !== 'Shaadi@1234') {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }

    const mockUser: User = {
      email,
      name: 'Shaadi.com Client',
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);

    return mockUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };
}
