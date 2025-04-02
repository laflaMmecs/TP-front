import React from 'react';
import { ITodo } from '../types/Todo'; // Измененный импорт

interface TodoItemProps {
  todo: ITodo; // Используем новый интерфейс
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggle }) => (
  <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => onToggle(todo.id, !todo.completed)}
      style={{ marginRight: '10px' }}
    />
    <span style={{ flexGrow: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {todo.description}
    </span>
    <button onClick={() => onDelete(todo.id)} style={{ marginLeft: '10px' }}>
      Delete
    </button>
  </div>
);

export default TodoItem;