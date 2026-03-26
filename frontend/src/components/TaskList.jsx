import React, { useState, useEffect } from 'react';
import api from '../api';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

const TaskList = ({ tasks, fetchTasks, setEditingTask }) => {

    const toggleComplete = async (task) => {
        try {
            await api.put(`/tasks/${task.id}/`, { ...task, completed: !task.completed });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}/`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };

    if (tasks.length === 0) {
        return <div className="empty-state">No tasks yet. Create one above!</div>;
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                    <div className="task-content" onClick={() => setEditingTask(task)}>
                        <h3 className="task-title">{task.title}</h3>
                        {task.description && <p className="task-desc">{task.description}</p>}
                    </div>
                    <div className="task-actions">
                        <button className="icon-btn complete-btn" onClick={() => toggleComplete(task)}>
                            {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                        </button>
                        <button className="icon-btn delete-btn" onClick={() => deleteTask(task.id)}>
                            <Trash2 size={24} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
