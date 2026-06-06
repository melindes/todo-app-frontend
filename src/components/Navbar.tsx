import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate         = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-200 text-white px-6 py-4 flex justify-between items-center shadow-md">

            {/* Logo */}
            <div className="flex items-center gap-2">
                <span className="text-2xl">📝</span>
                <h1 className="text-xl font-bold">Todo App</h1>
            </div>

            {/* User info */}
            <div className="flex items-center gap-4">
                <span className="text-sm">
                    👋 Bonjour, <strong>{user?.name}</strong>
                </span>
                <Button
                    variant="danger"
                    onClick={handleLogout}
                >
                    Déconnexion
                </Button>
            </div>

        </nav>
    );
};

export default Navbar;