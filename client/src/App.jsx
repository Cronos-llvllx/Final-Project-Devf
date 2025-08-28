import { Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout'; // <-- Importa el Layout
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import './App.css';

  function App() {
    return (
      <AuthProvider>
        <Routes>
          {/* La ruta de Login NO tiene el Layout */}
          <Route path="/login" element={<LoginPage />} />

          {/* La ruta principal está protegida y SÍ usa el Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    );
  }

  export default App;