import React from 'react';
import { TodoItem } from '../types/TodoItem';

interface TodoListProps {
  todos: TodoItem[];
  onDelete: (id: number) => Promise<void>; // Учитываем асинхронную природу
}



const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <span>{todo.description}</span>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;