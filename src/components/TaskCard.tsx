import { useState } from 'react';
import type { Task } from '../types';
import { STATUS_LABELS, PRIORITY_LABELS } from '../types';

import TaskForm from './TaskForm';

interface TaskCardProps {
    task     : Task;
    onDelete : (id: number) => void;
    onUpdate : (id: number, data: Partial<Task>) => void;
}

const statusColors = {
    pending     : 'bg-yellow-100 text-yellow-800',
    in_progress : 'bg-blue-100 text-blue-800',
    completed   : 'bg-green-100 text-green-800',
};



const priorityColors = {
    low    : 'bg-gray-100 text-gray-800',
    medium : 'bg-orange-100 text-orange-800',
    high   : 'bg-red-100 text-red-800',
};



const TaskCard = ({ task, onDelete, onUpdate }: TaskCardProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdate = (data: Partial<Task>) => {
        onUpdate(task.id, data);
        setIsEditing(false);
    };

    // Mode édition
    if (isEditing) {
        return (
            <div className="mb-3">
                <TaskForm
                    initialData={task}
                    onSubmit={handleUpdate}
                />
                <button
                    onClick={() => setIsEditing(false)}
                    className="mt-2 text-sm text-gray-500 hover:underline"
                >
                    Annuler
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 mb-3 rounded-lg shadow-md">

            {/* Header */}
            <div className="flex justify-between items-start">
                <h2 className="font-bold text-lg">{task.name}</h2>
                <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status]}`}>
                        {STATUS_LABELS[task.status]}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
                        {PRIORITY_LABELS[task.priority]}
                    </span>
                </div>
            </div>

            {/* Description */}
            {task.description && (
                <p className="text-gray-500 mt-2 text-sm">{task.description}</p>
            )}

            {/* Date */}
            {task.due_date && (
                <p className="text-gray-400 text-xs mt-2">
                    📅 Date limite : {task.due_date}
                </p>
            )}

            {/* Boutons */}
            <div className="flex gap-2 mt-4">

                {/* Marquer comme terminée */}
                {task.status !== 'completed' && (
                    <button
                        onClick={() => onUpdate(task.id, { status: 'completed' })}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                    >
                        ✅ Terminer
                    </button>
                )}

                {/* Modifier */}
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                >
                    ✏️ Modifier
                </button>

                {/* Supprimer */}
                <button
                    onClick={() => onDelete(task.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                    🗑️ Supprimer
                </button>

            </div>
        </div>
    );
};

export default TaskCard;