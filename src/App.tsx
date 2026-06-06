import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute  from './routes/PublicRoute';
import Login     from './pages/Login';
import Register  from './pages/Register';
import Dashboard from './pages/Dashboard';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>

                    {/* Routes publiques */}
                    <Route path="/login" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />

                    <Route path="/register" element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    } />

                    {/* Routes protégées */}
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />

                    {/* Redirection par défaut */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* Page 404 */}
                    <Route path="*" element={
                        <div className="flex items-center justify-center h-screen bg-gray-100">
                            <div className="text-center">
                                <h1 className="text-6xl font-bold text-gray-400">404</h1>
                                <p className="text-gray-500 mt-2">Page introuvable</p>
                                
                                   
                                   
                                <a  href="/login"  className="text-blue-600 hover:underline mt-4 block"> Retour à l'accueil</a>
                                   
                               
                            </div>
                        </div>
                    } />

                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;