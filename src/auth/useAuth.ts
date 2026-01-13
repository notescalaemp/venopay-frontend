import { useState, useEffect } from 'react';
import { http } from '../api/http';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'SELLER' | 'SUB_ACCOUNT';
}

interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar usuário do localStorage ao montar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Erro ao restaurar usuário', e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await http.post<LoginResponse>('/auth/login', {
        email,
        password,
      });

      const { user, accessToken } = response.data;

      // Armazenar token e usuário
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      return user;
    } catch (err: any) {
      let message = 'Erro ao fazer login';
      
      if (err.code === 'ECONNREFUSED') {
        message = 'Não conseguiu conectar ao servidor. Backend está rodando?';
      } else if (err.response?.status === 401) {
        message = 'Email ou senha incorretos';
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
      
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };
}
