import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

    function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        // En una app real, aquí validarías usuario y contraseña
        login({ name: 'Usuario' }); // Simulamos el login
        navigate('/'); // Redirige al dashboard
    };

    return (
        <div>
        <h1>Bienvenido al Registro de Actividades</h1>
        <p>Por favor, inicia sesión para continuar.</p>
        <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
    );
    }

    export default LoginPage;