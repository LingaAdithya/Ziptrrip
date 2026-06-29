# Full-Stack Todo Application

A modern, responsive Todo application built with React, Vite, and Node.js. It features a beautiful, dynamic user interface with smooth animations and a robust backend for managing your tasks.

## Features

- **Create, Read, Update, Delete (CRUD):** Complete task management capabilities.
- **Multiple Views:** Includes a list view for all tasks and a single-item detail view (accessible via query parameters).
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Modern Aesthetics:** Utilizes a custom design system with rich colors, glassmorphism, and micro-animations for a premium user experience.
- **Data Persistence:** Tasks are saved to the backend ensuring no data loss.

## Tech Stack

### Frontend
- **React 19:** Modern UI library.
- **Vite:** Next-generation frontend tooling for ultra-fast development.
- **React Router:** For seamless client-side navigation.
- **Lucide React:** Beautiful, consistent iconography.
- **Vanilla CSS:** Custom design system without heavy frameworks.

### Backend
- **Node.js:** JavaScript runtime environment.
- **Express:** Fast, unopinionated web framework.
- **JSON File Storage:** Lightweight local data persistence.

## Project Structure

```text
todo-app/
├── frontend/     # React + Vite frontend application
└── backend/      # Node.js + Express REST API
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Setup

1. **Start the Backend:**
   Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The backend server will start on `http://localhost:5000` (or another port if configured).

2. **Start the Frontend:**
   Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The frontend development server will typically start on `http://localhost:5173`.

3. **View the Application:**
   Open your browser and navigate to the URL provided by Vite (e.g., `http://localhost:5173`).

## Available Scripts

### Frontend (`/frontend`)
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Locally preview the production build.

### Backend (`/backend`)
- `npm start`: Starts the Node.js server.
- `npm run dev`: Starts the server with Nodemon for auto-reloading during development.
