import { useState } from 'react';

import useTasks from '../hooks/useTasks';
import Navbar   from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Alert    from '../components/ui/Alert';
import Button   from '../components/ui/Button';

const Dashboard = () => {
    
    const { tasks, loading, error,
            createTask, updateTask,
            deleteTask }            = useTasks();
   
    const [showForm, setShowForm]   = useState(false);

    // Filtrage par statut
    const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

    const filteredTasks = filter === 'all'
        ? tasks
        : tasks.filter(t => t.status === filter);

   

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-3xl mx-auto p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">Mes Tâches</h2>
                        <p className="text-gray-500 text-sm">
                            {tasks.length} tâche(s) au total
                        </p>
                    </div>
                    <Button onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Annuler' : '+ Nouvelle tâche'}
                    </Button>
                </div>

                {/* Statistiques */}
<div className="grid grid-cols-3 gap-4 mb-6">
    {[
        {
            label  : 'En attente',
            count  : tasks.filter(t => t.status === 'pending').length,
            color  : 'bg-yellow-100 text-yellow-800',
        },
        {
            label  : 'En cours',
            count  : tasks.filter(t => t.status === 'in_progress').length,
            color  : 'bg-blue-100 text-blue-800',
        },
        {
            label  : 'Terminées',
            count  : tasks.filter(t => t.status === 'completed').length,
            color  : 'bg-green-100 text-green-800',
        },
    ].map(stat => (
        <div
            key={stat.label}
            className={`p-4 rounded-lg text-center font-medium ${stat.color}`}
        >
            <p className="text-3xl font-bold">{stat.count}</p>
            <p className="text-sm">{stat.label}</p>
        </div>
    ))}
</div>

                {/* Erreur globale */}
                {error && <Alert message={error} type="error" />}

                {/* Formulaire */}
                {showForm && (
                    <div className="mb-6">
                        <TaskForm onSubmit={async (data) => {
                            await createTask(data);
                            setShowForm(false);
                        }} />
                    </div>
                )}

                {/* Filtres */}
                <div className="flex gap-2 mb-4 flex-wrap">
                    {[
                        { value: 'all',         label: '📋 Toutes' },
                        { value: 'pending',     label: '⏳ En attente' },
                        { value: 'in_progress', label: '🔄 En cours' },
                        { value: 'completed',   label: '✅ Terminées' },
                    ].map(f => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value as typeof filter)}
                            className={`
                                px-3 py-1 rounded-full text-sm font-medium
                                transition-colors duration-200
                                ${filter === f.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-200'
                                }
                            `}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Liste des tâches */}
                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Chargement...</p>
                    </div>
                ) : filteredTasks.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-lg shadow">
                        <p className="text-4xl mb-2">📭</p>
                        <p className="text-gray-500">Aucune tâche trouvée</p>
                    </div>
                ) : (
                    filteredTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={deleteTask}
                            onUpdate={updateTask}
                        />
                    ))
                )}

            </div>
        </div>
    );
};

export default Dashboard;