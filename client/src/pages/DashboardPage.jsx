import { useState, useEffect, useCallback, useMemo } from 'react'; // 1. Importa useCallback y useMemo
import ActivityForm from '../components/ActivityForm';

const API_URL = 'http://localhost:3001/api/activities';

    function DashboardPage() {
    const [activities, setActivities] = useState([]);
    const [apiError, setApiError] = useState(null);

    // Optimizada con useCallback para que no se cree en cada render.
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
    }, []); // <-- El array vacío significa que esta función NUNCA cambiará.

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    // 2. Optimizamos handleAddActivity con useCallback
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
        fetchActivities(); // Llama a la versión memorizada
        } catch (error) {
        setApiError(error.message);
        }
    }, [fetchActivities]); // Depende de fetchActivities (que está memorizada)

    // 3. Optimizamos handleDeleteActivity con useCallback
    const handleDeleteActivity = useCallback(async (id) => {
        try {
        setApiError(null);
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchActivities();
        } catch (error) {
        setApiError(error.message);
        }
    }, [fetchActivities]);

    // 4. Implementamos useMemo para un cálculo derivado
    // Este valor solo se recalculará si el array 'activities' cambia.
    const totalActivities = useMemo(() => activities.length, [activities]);

    return (
        <div>
        <h1>Dashboard de Actividades</h1>
        {/* Pasamos la función memorizada al componente hijo */}
        <ActivityForm onAddActivity={handleAddActivity} />
        <hr />
        <h2>Mis Registros ({totalActivities} en total)</h2>
        {apiError && <div className="api-error-message">{apiError}</div>}
        {activities.length > 0 ? (
            <ul>
            {activities.map(activity => (
                <li key={activity.id}>
                <strong>{activity.type}</strong> - {activity.distance} en {activity.duration}
                {/* Usamos la función memorizada */}
                <button onClick={() => handleDeleteActivity(activity.id)} style={{ marginLeft: '10px' }}>
                    🗑️ Eliminar
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