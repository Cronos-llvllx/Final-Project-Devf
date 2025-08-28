import { createContext, useState } from 'react';

    const AuthContext = createContext(null);

    // Cambia aquí: "export function" por "export default function"
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