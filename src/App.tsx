import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodoPage from './pages/TodoPage/TodoPage';
import HomePage from './pages/HomePage/HomePage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/" className='nav-link'>Home</Link>
        <Link to="/todos" className="nav-link">Todos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<TodoPage />} />
      </Routes>
    </Router>
  );
};

export default App;