import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import type { User } from '../types';

interface AuthContextType {
    user        : User | null;
    token       : string | null;
    loading     : boolean;
    isReady     : boolean; // ← nouveau
    register    : (name: string, email: string, password: string) => Promise<void>;
    login       : (email: string, password: string) => Promise<void>;
    logout      : () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user,    setUser]    = useState<User | null>(null);
    const [token,   setToken]   = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isReady, setIsReady] = useState(false); // ← nouveau

    // Lire le token au démarrage
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
        setIsReady(true); // ← prêt après lecture
    }, []);

    const register = async (name: string, email: string, password: string) => {
        setLoading(true);
        try {
            const res = await api.post('/register', { name, email, password });
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await api.post('/login', { email, password });
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } finally {
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
        }
    };

    // Attendre que le token soit lu avant d'afficher
    if (!isReady) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Chargement...</p>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{
            user, token, loading, isReady,
            register, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans AuthProvider');
    }
    return context;
};