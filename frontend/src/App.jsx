import React, { useState, useEffect } from 'react';
import api from './api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks/');
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="app-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      
      <main className="main-content">
        <header className="app-header">
          <h1 className="title-gradient">Task Master</h1>
          <p className="subtitle">Manage your workflow beautifully</p>
        </header>

        <TaskForm 
          fetchTasks={fetchTasks} 
          editingTask={editingTask} 
          setEditingTask={setEditingTask} 
        />
        
        {loading ? (
          <div className="loader">Loading tasks...</div>
        ) : (
          <TaskList 
            tasks={tasks} 
            fetchTasks={fetchTasks} 
            setEditingTask={setEditingTask} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
