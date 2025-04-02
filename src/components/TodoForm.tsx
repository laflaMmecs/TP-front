import React, { useState } from 'react';

interface TodoFormProps {
  onAdd: (description: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onAdd(description);
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter new todo..."
        style={{ flexGrow: 1, padding: '8px' }}
      />
      <button type="submit" style={{ marginLeft: '10px', padding: '8px 16px' }}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;