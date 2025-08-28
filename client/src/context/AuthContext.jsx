import { useState } from 'react';
import { AuthContext } from './auth-context'; // <-- Importa el contexto desde el nuevo archivo

    export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    }