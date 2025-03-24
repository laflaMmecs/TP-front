import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TodoItem } from '../../types/TodoItem';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import './TodoPage.css';

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get<TodoItem[]>('http://localhost:8080/api/todos');
    setTodos(response.data);
  };

  const addTodo = async (description: string) => {
    const response = await axios.post<TodoItem>('http://localhost:8080/api/todos', {
      description,
      completed: false
    });
    setTodos([...todos, response.data]);
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`http://localhost:8080/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="todo-page">
      <h1>Todo List</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} />
    </div>
  );
};

export default TodoPage;