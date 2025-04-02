import React from 'react';
import { ITodo } from '../types/Todo';

interface TodoListProps {
  todos: ITodo[];
  onDelete: (id: number) => Promise<void>;
  onToggle: (id: number, completed: boolean) => Promise<void>; // Добавляем
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