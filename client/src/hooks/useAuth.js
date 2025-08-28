import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Importamos el contexto

    // Este hook reutilizable ahora vive en su propio archivo
    export const useAuth = () => {
    return useContext(AuthContext);
    };