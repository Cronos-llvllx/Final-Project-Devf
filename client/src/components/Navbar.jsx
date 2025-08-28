import { useAuth } from '../hooks/useAuth';
import '../App.css';

    function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
        <span className="navbar-brand">Mis Actividades Deportivas</span>
        {user && (
            <div className="navbar-user">
            <span>Hola, {user.name}</span>
            <button onClick={logout} className="logout-button">Cerrar Sesión</button>
            </div>
        )}
        </nav>
    );
    }

    export default Navbar;