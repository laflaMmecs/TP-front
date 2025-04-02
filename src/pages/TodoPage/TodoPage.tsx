// Импорт необходимых модулей и компонентов
import React, { useState, useEffect } from 'react'; // Базовые хуки React
import axios from 'axios'; // HTTP-клиент для запросов к API
import { ITodo } from '../../types/Todo'; // Тип для задач
import TodoList from '../../components/TodoList'; // Компонент списка задач
import TodoForm from '../../components/TodoForm'; // Компонент формы добавления
import { useAuth } from '../../contexts/AuthContext'; // Контекст авторизации

// Основной компонент страницы задач
const TodoPage: React.FC = () => {
  // Состояние для хранения списка задач
  const [todos, setTodos] = useState<ITodo[]>([]);
  
  // Получение статуса авторизации из контекста
  const { isAuth } = useAuth();

  // Эффект для загрузки задач при изменении статуса авторизации
  useEffect(() => {
    if (isAuth) fetchTodos(); // Загружаем только если авторизованы
  }, [isAuth]); // Зависимость от isAuth

  // Функция загрузки задач с сервера
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token'); // Получаем токен из localStorage
      // GET-запрос к API с токеном в заголовках
      const response = await axios.get('http://localhost:8080/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data); // Обновляем состояние с полученными задачами
    } catch (error) {
      console.error('Ошибка загрузки задач:', error); // Обработка ошибок
    }
  };

  // Функция добавления новой задачи
  const addTodo = async (description: string) => {
    const token = localStorage.getItem('token'); // Получаем токен
    // POST-запрос с новыми данными задачи
    const response = await axios.post(
      'http://localhost:8080/api/todos',
      { description, completed: false }, // Тело запроса
      { headers: { Authorization: `Bearer ${token}` } } // Заголовки
    );
    // Добавляем новую задачу в состояние
    setTodos([...todos, response.data]);
  };

  // Функция удаления задачи
  const deleteTodo = async (id: number) => {
    const token = localStorage.getItem('token');
    // DELETE-запрос с ID задачи
    await axios.delete(`http://localhost:8080/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Фильтруем массив, удаляя задачу с указанным ID
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Функция изменения статуса задачи (выполнено/не выполнено)
  const toggleTodo = async (id: number, completed: boolean) => {
    const token = localStorage.getItem('token');
    // PATCH-запрос для обновления статуса
    await axios.patch(
      `http://localhost:8080/api/todos/${id}`,
      { completed }, // Новый статус
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Обновляем состояние, изменяя только нужную задачу
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed } : todo
    ));
  };

  // Если пользователь не авторизован, показываем сообщение
  if (!isAuth) return <div>Требуется авторизация</div>;

  // Рендер основной страницы
  return (
    <div className="todo-page">
      <h1>Список задач</h1>
      {/* Компонент формы для добавления задач */}
      <TodoForm onAdd={addTodo} />
      {/* Компонент списка задач с обработчиками */}
      <TodoList 
        todos={todos} 
        onDelete={deleteTodo} 
        onToggle={toggleTodo}
      />
    </div>
  );
};

export default TodoPage; // Экспорт компонента