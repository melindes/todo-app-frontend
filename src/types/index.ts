export interface User {
    id    : number;
    name  : string;
    email : string;
}

export interface Task {
    id          : number;
    name        : string;
    description : string;
    status      : TaskStatus;
    priority    : TaskPriority;
    due_date    : string;
    created_at  : string;
}

// Types séparés — plus lisible
export type TaskStatus   = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

// Constantes pour éviter les fautes de frappe
export const STATUS_LABELS: Record<TaskStatus, string> = {
    pending     : 'En attente',
    in_progress : 'En cours',
    completed   : 'Terminée',
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
    low    : 'Basse',
    medium : 'Moyenne',
    high   : 'Haute',
};