import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

export default function TodoDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const todoId = searchParams.get('id');

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!todoId) {
      setError('No Todo ID provided in URL');
      setLoading(false);
      return;
    }
    fetchTodo();
  }, [todoId]);

  const fetchTodo = async () => {
    try {
      const res = await fetch(`${API_URL}/${todoId}`);
      if (!res.ok) throw new Error('Todo not found');
      const data = await res.json();
      setTodo(data);
      setEditTitle(data.title);
      setEditDesc(data.description || '');
      setIsCompleted(data.completed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, description: editDesc, completed: isCompleted })
      });
      if (res.ok) {
        navigate('/'); // Go back to list on success
      }
    } catch (err) {
      console.error('Failed to update todo', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      const res = await fetch(`${API_URL}/${todoId}`, { method: 'DELETE' });
      if (res.ok) {
        navigate('/'); // Go back to list on success
      }
    } catch (err) {
      console.error('Failed to delete todo', err);
    }
  };

  if (loading) return <div className="loader">Loading details...</div>;
  
  if (error) return (
    <div className="error-state glass-panel">
      <h2>Oops!</h2>
      <p>{error}</p>
      <Link to="/" className="premium-btn primary">Go Back Home</Link>
    </div>
  );

  return (
    <div className="todo-detail-page fade-in">
      <Link to="/" className="back-link premium-btn icon-only secondary">
        <ArrowLeft size={20} /> 
        <span>Back to List</span>
      </Link>
      
      <form className="edit-todo-form glass-panel" onSubmit={handleUpdate}>
        <h2>Edit Task</h2>
        
        <div className="detail-meta">
          <span>Created: {new Date(todo.createdAt).toLocaleString()}</span>
          <span>ID: {todo.id}</span>
        </div>

        <div className="input-group">
          <label>Task Title</label>
          <input 
            type="text" 
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            required
            className="premium-input"
          />
        </div>
        
        <div className="input-group">
          <label>Description</label>
          <textarea 
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="premium-textarea"
            rows={4}
          />
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />
            <span className="custom-checkbox"></span>
            Task is Completed
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="premium-btn primary">
            <Save size={18} /> Save Changes
          </button>
          <button type="button" onClick={handleDelete} className="premium-btn danger">
            <Trash2 size={18} /> Delete Task
          </button>
        </div>
      </form>
    </div>
  );
}
