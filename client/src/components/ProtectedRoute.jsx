import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

    function ProtectedRoute({ children }) {
    const { user } = useAuth();
    if (!user) {
        // Si no hay usuario, redirige a la página de login
        return <Navigate to="/login" />;
    }
    return children;
    }

    export default ProtectedRoute;