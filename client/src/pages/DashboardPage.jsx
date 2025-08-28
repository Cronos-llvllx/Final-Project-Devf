import { useState, useEffect } from 'react';
import ActivityForm from '../components/ActivityForm';

const API_URL = 'http://localhost:3001/api/activities';

    function DashboardPage() {
    const [activities, setActivities] = useState([]);

    // Función para obtener todas las actividades del backend
    const fetchActivities = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setActivities(data);
    };

    // useEffect se ejecuta una vez cuando el componente se carga
    useEffect(() => {
        fetchActivities();
    }, []);

    // Función para agregar una nueva actividad
    const handleAddActivity = async (activityData) => {
        await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activityData)
        });
        fetchActivities(); // Actualiza la lista después de agregar
    };

    // Función para eliminar una actividad
    const handleDeleteActivity = async (id) => {
        await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
        });
        fetchActivities(); // Actualiza la lista después de eliminar
    };

    return (
        <div>
        <h1>Dashboard de Actividades</h1>
        <ActivityForm onAddActivity={handleAddActivity} />
        <hr />
        <h2>Mis Registros</h2>
        {activities.length > 0 ? (
            <ul>
            {activities.map(activity => (
                <li key={activity.id}>
                <strong>{activity.type}</strong> - {activity.distance} en {activity.duration}
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