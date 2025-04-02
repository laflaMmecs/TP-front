import React, { createContext, useContext, useState } from 'react';
import { AuthService } from '../services/AuthService';

// Типы для контекста аутентификации
interface AuthContextType {
  isAuth: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Создание контекста с начальным значением null
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Провайдер аутентификации
 * param children - Дочерние компоненты, которым нужен доступ к контексту
 */
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(AuthService.isAuthenticated());

  /**
   * Обработчик входа пользователя
   * param username - Логин
   * param password - Пароль
   */
  const login = async (username: string, password: string) => {
    await AuthService.login(username, password);
    setIsAuth(true);
  };

  /**
   * Обработчик регистрации
   * param username - Логин
   * param email - Почта
   * param password - Пароль
   */
  const register = async (username: string, email: string, password: string) => {
    await AuthService.register(username, email, password);
  };

  /** Обработчик выхода из системы */
  const logout = () => {
    AuthService.logout();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Кастомный хук для доступа к контексту аутентификации
 * @throws Error если используется вне AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};