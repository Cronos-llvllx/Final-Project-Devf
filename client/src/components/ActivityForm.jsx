import { useState } from 'react';

    function ActivityForm({ onAddActivity }) {
    const [type, setType] = useState('');
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!type || !distance || !duration) return; // Validación simple

        const newActivity = {
        type,
        distance,
        duration,
        date: new Date().toISOString().split('T')[0] // Fecha de hoy
        };
        onAddActivity(newActivity); // Llama a la función del padre para agregar
        
        // Limpia el formulario
        setType('');
        setDistance('');
        setDuration('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <h3>Registrar Nueva Actividad</h3>
        <input
            type="text" value={type} onChange={(e) => setType(e.target.value)}
            placeholder="Tipo (ej. Correr)" required
        />
        <input
            type="text" value={distance} onChange={(e) => setDistance(e.target.value)}
            placeholder="Distancia (ej. 5 km)" required
        />
        <input
            type="text" value={duration} onChange={(e) => setDuration(e.target.value)}
            placeholder="Duración (ej. 30 min)" required
        />
        <button type="submit">Agregar</button>
        </form>
    );
    }

    export default ActivityForm;