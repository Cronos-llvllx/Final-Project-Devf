import { useState, useEffect } from 'react';
import ActivityForm from '../components/ActivityForm';

const API_URL = 'http://localhost:3001/api/activities';

    function DashboardPage() {
    const [activities, setActivities] = useState([]);

    const fetchActivities = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setActivities(data);
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const handleAddActivity = async (activityData) => {
        await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activityData)
        });
        fetchActivities();
    };

    const handleDeleteActivity = async (id) => {
        await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
        });
        fetchActivities();
    };

    return (
        <div>
        <h1>Dashboard de Actividades</h1>
        <ActivityForm onAddActivity={handleAddActivity} />
        <hr />
        <h2>Mis Registros</h2>
        {/* Aquí SÍ se usa la variable 'activities' */}
        {activities.length > 0 ? (
            <ul>
            {/* Y aquí también se usa */}
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