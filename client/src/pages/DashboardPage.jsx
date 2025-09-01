import { useState, useEffect, useCallback, useMemo } from 'react';
import ActivityForm from '../components/ActivityForm';

const API_URL = 'http://localhost:3001/api/activities';

    function DashboardPage() {
    const [activities, setActivities] = useState([]);
    const [apiError, setApiError] = useState(null);
    // Nuevo estado para la UI optimista al eliminar
    const [deletingId, setDeletingId] = useState(null);

    const fetchActivities = useCallback(async () => {
        try {
        setApiError(null);
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('No se pudieron cargar las actividades.');
        const data = await response.json();
        setActivities(data);
        } catch (error) {
        setApiError(error.message);
        }
    }, []);

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    const handleAddActivity = useCallback(async (activityData) => {
        try {
        setApiError(null);
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activityData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al agregar la actividad.');
        }
        fetchActivities();
        } catch (error) {
        setApiError(error.message);
        }
    }, [fetchActivities]);

    // Función de eliminar mejorada con UI Optimista
    const handleDeleteActivity = useCallback(async (idToDelete) => {
        const previousActivities = [...activities]; // Guarda el estado actual para revertir en caso de error

        // Actualiza la UI inmediatamente
        setActivities(currentActivities => currentActivities.filter(activity => activity.id !== idToDelete));
        setDeletingId(idToDelete); // Activa el estado de carga para este item
        setApiError(null);

        try {
        // Envía la petición al servidor en segundo plano
        const response = await fetch(`${API_URL}/${idToDelete}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('No se pudo eliminar la actividad.');
        }
        } catch (error) {
        // Si hay un error, revierte la UI al estado anterior y muestra el mensaje
        setApiError(error.message);
        setActivities(previousActivities);
        } finally {
        // Quita el estado de carga
        setDeletingId(null);
        }
    }, [activities]); // Ahora depende de 'activities' para poder revertir el estado

    // Cálculo memorizado del total de actividades
    const totalActivities = useMemo(() => activities.length, [activities]);

    return (
        <div>
        <h1>Dashboard de Actividades</h1>
        <ActivityForm onAddActivity={handleAddActivity} />
        <hr />
        <h2>Mis Registros ({totalActivities} en total)</h2>
        {apiError && <div className="api-error-message">{apiError}</div>}
        {activities.length > 0 ? (
            <ul>
            {activities.map(activity => (
                <li key={activity.id}>
                <span>
                    <strong>{activity.type}</strong> - {activity.distance} en {activity.duration}
                </span>
                <button
                    onClick={() => handleDeleteActivity(activity.id)}
                    disabled={deletingId === activity.id} // Deshabilita el botón mientras se borra
                    style={{ marginLeft: '10px' }}
                >
                    {deletingId === activity.id ? 'Eliminando...' : '🗑️ Eliminar'}
                </button>
                </li>
            ))}
            </ul>
        ) : (
            <p>No hay actividades registradas. ¡Añade una!</p>
        )}
        </div>
    );
    }

export default DashboardPage;
