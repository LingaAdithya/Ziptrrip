import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from './controllers/todoController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/todos', getTodos);
app.get('/api/todos/:id', getTodoById);
app.post('/api/todos', createTodo);
app.put('/api/todos/:id', updateTodo);
app.delete('/api/todos/:id', deleteTodo);

// Connect to MongoDB and start server
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.error('FATAL ERROR: MONGODB_URI is not defined in .env file.');
}

// Only listen locally, Vercel will handle routing for serverless functions
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

export default app;
