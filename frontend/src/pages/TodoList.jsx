import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, CheckCircle, Circle, Trash2, ArrowRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/_/backend/api/todos' : 'http://localhost:5000/api/todos');

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setError(false);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDesc })
      });
      const addedTodo = await res.json();
      setTodos([...todos, addedTodo]);
      setNewTitle('');
      setNewDesc('');
    } catch (err) {
      console.error('Failed to add todo', err);
    }
  };

  const toggleTodo = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus })
      });
      if (res.ok) {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
      }
    } catch (err) {
      console.error('Failed to toggle todo', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTodos(todos.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete todo', err);
    }
  };

  if (loading) return <div className="loader">Loading your tasks...</div>;

  return (
    <div className="todo-list-page fade-in">
      
      <form className="add-todo-form glass-panel" onSubmit={handleAddTodo}>
        <h2>Create New Task</h2>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="What needs to be done?" 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
            className="premium-input"
          />
        </div>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Description (Optional)" 
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="premium-input"
          />
        </div>
        <button type="submit" className="premium-btn primary">
          <PlusCircle size={20} />
          <span>Add Task</span>
        </button>
      </form>

      <div className="todo-list">
        {error ? (
          <div className="empty-state error-state">Can't retrieve data</div>
        ) : todos.length === 0 ? (
          <div className="empty-state">No tasks remaining. You're all caught up!</div>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className={`todo-item glass-panel ${todo.completed ? 'completed' : ''}`}>
              <button 
                className="status-btn"
                onClick={() => toggleTodo(todo.id, todo.completed)}
              >
                {todo.completed ? <CheckCircle className="icon-completed" /> : <Circle className="icon-pending" />}
              </button>
              
              <div className="todo-content">
                <h3>{todo.title}</h3>
                {todo.description && <p>{todo.description}</p>}
              </div>

              <div className="todo-actions">
                <Link to={`/todo?id=${todo.id}`} className="premium-btn icon-only secondary" title="View Details">
                  <ArrowRight size={18} />
                </Link>
                <button onClick={() => deleteTodo(todo.id)} className="premium-btn icon-only danger" title="Delete Task">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
