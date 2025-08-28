import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../App.css';

    function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // En una app real, aquí harías una llamada a tu API para validar.
        // Por ahora, solo validamos que los campos no estén vacíos.
        if (username && password) {
        login({ name: username }); // Guardamos el nombre de usuario en el contexto
        navigate('/'); // Redirige al dashboard
        } else {
        alert('Por favor, ingresa un usuario y contraseña.');
        }
    };

    return (
        <div className="login-container">
        <div className="login-box">
            <h1>Iniciar Sesión</h1>
            <p>Bienvenido al Registro de Actividades</p>
            <form onSubmit={handleLogin}>
            <div className="input-group">
                <label htmlFor="username">Usuario</label>
                <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Escribe tu usuario"
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Escribe tu contraseña"
                />
            </div>
            <button type="submit" className="login-button">Entrar</button>
            </form>
        </div>
        </div>
    );
    }

    export default LoginPage;