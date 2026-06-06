import { useState, useEffect } from 'react';
import api from '../api/axios';
import type { Task } from '../types';

const useTasks = () => {
    const [tasks,   setTasks]   = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState('');

    // Récupérer les tâches
    const fetchTasks = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get('/tasks');
            setTasks(res.data.tasks);
        } catch {
            setError('Erreur lors du chargement des tâches');
        } finally {
            setLoading(false);
        }
    };

    // Créer une tâche
    const createTask = async (data: Partial<Task>) => {
        try {
            await api.post('/tasks', data);
            await fetchTasks();
        } catch {
            setError('Erreur lors de la création');
        }
    };

    // Modifier une tâche
    const updateTask = async (id: number, data: Partial<Task>) => {
        try {
            await api.put(`/tasks/${id}`, data);
            await fetchTasks();
        } catch {
            setError('Erreur lors de la modification');
        }
    };

    // Supprimer une tâche
    const deleteTask = async (id: number) => {
        try {
            await api.delete(`/tasks/${id}`);
            await fetchTasks();
        } catch {
            setError('Erreur lors de la suppression');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return {
        tasks,
        loading,
        error,
        createTask,
        updateTask,
        deleteTask,
    };
};

export default useTasks;