import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './pages/TodoList';
import TodoDetail from './pages/TodoDetail';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>My Premium Todos</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/todo" element={<TodoDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
