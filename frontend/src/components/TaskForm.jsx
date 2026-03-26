import React, { useState, useEffect } from 'react';
import api from '../api';

const TaskForm = ({ fetchTasks, editingTask, setEditingTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTask) {
                await api.put(`/tasks/${editingTask.id}/`, { 
                    ...editingTask, 
                    title, 
                    description 
                });
                setEditingTask(null);
            } else {
                await api.post('/tasks/', { title, description, completed: false });
                setTitle('');
                setDescription('');
            }
            fetchTasks();
        } catch (error) {
            console.error("Error saving task", error);
        }
    };

    return (
        <form className="task-form glass-panel" onSubmit={handleSubmit}>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Task Title..." 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <textarea 
                    placeholder="Task Description (Optional)" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input"
                    rows="2"
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="primary-btn">
                    {editingTask ? 'Update Task' : 'Add Task'}
                </button>
                {editingTask && (
                    <button type="button" className="secondary-btn" onClick={() => setEditingTask(null)}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;
