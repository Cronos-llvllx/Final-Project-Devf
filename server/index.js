const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

    // --- Middlewares ---
    // Permite que tu frontend se comunique con este backend
    app.use(cors());
    // Permite que el servidor entienda los datos JSON que envía el frontend
    app.use(express.json());

    // --- Simulación de una Base de Datos ---
    let activities = [
    { id: 1, type: 'Correr', distance: '10 km', duration: '50 min', date: '2025-08-28' },
    { id: 2, type: 'Ciclismo', distance: '25 km', duration: '75 min', date: '2025-08-27' },
    ];
    let nextId = 3; // Para los nuevos registros

    // --- Rutas de la API (Endpoints) ---

    // [R]EAD: Obtener todas las actividades
    app.get('/api/activities', (req, res) => {
    console.log('GET /api/activities -> Devolviendo lista de actividades');
    res.json(activities);
    });

    // [C]REATE: Añadir una nueva actividad
    app.post('/api/activities', (req, res) => {
    const { type, distance, duration, date } = req.body;
    const newActivity = { id: nextId++, type, distance, duration, date };
    activities.push(newActivity);
    console.log('POST /api/activities -> Nueva actividad agregada:', newActivity);
    res.status(201).json(newActivity);
    });

    // [D]ELETE: Eliminar una actividad por su ID
    app.delete('/api/activities/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    activities = activities.filter(activity => activity.id !== idToDelete);
    console.log(`DELETE /api/activities/${idToDelete} -> Actividad eliminada`);
    res.status(204).send();
    });

    // --- Iniciar el servidor ---
    app.listen(port, () => {
    console.log(`✅ Backend listo y escuchando en http://localhost:${port}`);
    });