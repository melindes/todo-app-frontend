import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Input  from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert  from '../components/ui/Alert';

const Login = () => {
    const { login, loading } = useAuth();
    const navigate           = useNavigate();
    const [email,    setEmail]    = useState('');
    const [password, setPassword] = useState('');
    const [error,    setError]    = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch {
            setError('Email ou mot de passe incorrect');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <div className="text-center mb-6">
                    <span className="text-4xl">📝</span>
                    <h1 className="text-2xl font-bold mt-2">Connexion</h1>
                    <p className="text-gray-500 text-sm">Bienvenue sur Todo App</p>
                </div>

                {error && <Alert message={error} type="error" />}

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="celestin@gmail.com"
                        required
                    />
                    <Input
                        label="Mot de passe"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••"
                        required
                    />
                    <Button type="submit" fullWidth disabled={loading}>
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </Button>
                </form>

                <p className="text-center mt-4 text-sm text-gray-500">
                    Pas de compte ?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline font-medium">
                        S'inscrire
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;