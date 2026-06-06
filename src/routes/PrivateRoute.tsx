import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    children : React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { token } = useAuth();

    // Si pas de token → rediriger vers login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si token → afficher la page
    return <>{children}</>;
};

export default PrivateRoute;