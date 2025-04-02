import axios from 'axios';

// Базовый URL для auth endpoints (соответствует вашему бэкенду)
const API_URL = 'http://localhost:8080/auth';

export const AuthService = {
  /**
   * Авторизация пользователя
   * param username - Логин пользователя
   * param password - Пароль (передается в открытом виде, хешируется на бэкенде)
   * returns Promise с JWT токеном
   */
  async login(username: string, password: string) {
    const response = await axios.post(`${API_URL}/signin`, { username, password });
    localStorage.setItem('token', response.data); // Сохраняем токен в localStorage
    return response.data;
  },

  /**
   * Регистрация нового пользователя
   * username - Уникальное имя пользователя
   * email - Электронная почта
   * password - Пароль (хешируется на бэкенде)
   */
  async register(username: string, email: string, password: string) {
    await axios.post(`${API_URL}/signup`, { username, email, password });
  },

  /** Выход из системы (удаление токена) */
  logout() {
    localStorage.removeItem('token');
  },

  /** Проверка наличия токена (не проверяет его валидность) */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  /** Получение токена из localStorage */
  getToken() {
    return localStorage.getItem('token');
  }
};