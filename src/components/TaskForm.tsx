import { useState } from 'react';
import type { Task } from '../types';

interface TaskFormProps {
    onSubmit  : (data: Partial<Task>) => void;
    initialData ?: Partial<Task>; // ← pour modifier une tâche existante
}

const TaskForm = ({ onSubmit, initialData }: TaskFormProps) => {
    const [name,        setName]        = useState(initialData?.name        || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [status,      setStatus]      = useState(initialData?.status      || 'pending');
    const [priority,    setPriority]    = useState(initialData?.priority    || 'medium');
    const [due_date,    setDueDate]     = useState(initialData?.due_date    || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name_task: name, description, status, priority, due_date });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">
                {initialData ? 'Modifier la tâche' : 'Nouvelle tâche'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Nom */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nom de la tâche
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ex: Apprendre Laravel"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description de la tâche..."
                        rows={3}
                    />
                </div>

                {/* Status et Priorité */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Statut
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as Task['status'])}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="pending">En attente</option>
                            <option value="in_progress">En cours</option>
                            <option value="completed">Terminée</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Priorité
                        </label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as Task['priority'])}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Basse</option>
                            <option value="medium">Moyenne</option>
                            <option value="high">Haute</option>
                        </select>
                    </div>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Date limite
                    </label>
                    <input
                        type="date"
                        value={due_date}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Bouton */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    {initialData ? 'Modifier' : 'Créer la tâche'}
                </button>

            </form>
        </div>
    );
};

export default TaskForm;