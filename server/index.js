    const express = require('express');
    const cors = require('cors');
    const { z } = require('zod'); // <-- 1. Importa Zod
    const app = express();
    const port = 3001;

    app.use(cors());
    app.use(express.json());

    // --- Esquema de Validación con Zod ---
    const activitySchema = z.object({
    type: z.string().min(3, { message: "El tipo debe tener al menos 3 caracteres" }),
    distance: z.string().min(1, { message: "La distancia es obligatoria" }),
    duration: z.string().min(1, { message: "La duración es obligatoria" }),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "La fecha debe tener formato YYYY-MM-DD" }),
    });

    // --- Simulación de Base de Datos ---
    let activities = [
    { id: 1, type: 'Correr', distance: '10 km', duration: '50 min', date: '2025-08-28' },
    { id: 2, type: 'Ciclismo', distance: '25 km', duration: '75 min', date: '2025-08-27' },
    ];
    let nextId = 3;

    // --- Rutas de la API (Endpoints) ---

    // [R]EAD
    app.get('/api/activities', (req, res) => {
    res.json(activities);
    });

    // [C]REATE: Ahora con validación
    app.post('/api/activities', (req, res) => {
    try {
        // 2. Validamos los datos del body con el esquema
        const validatedData = activitySchema.parse(req.body);

        const newActivity = { id: nextId++, ...validatedData };
        activities.push(newActivity);
        console.log('POST /api/activities -> Nueva actividad agregada:', newActivity);
        res.status(201).json(newActivity);

    } catch (error) {
        // 3. Si la validación falla, Zod lanza un error
        if (error instanceof z.ZodError) {
        console.error('Error de validación:', error.errors);
        // Enviamos un error 400 (Bad Request) con los detalles
        res.status(400).json({ errors: error.format() });
        } else {
        res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
    });

    // [D]ELETE
    app.delete('/api/activities/:id', (req, res) => {
    const idToDelete = parseInt(req.params.id);
    activities = activities.filter(activity => activity.id !== idToDelete);
    res.status(204).send();
    });

    app.listen(port, () => {
    console.log(`✅ Backend con validación escuchando en http://localhost:${port}`);
    });