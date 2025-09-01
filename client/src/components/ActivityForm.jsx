import { useState } from 'react';
import { z } from 'zod'; // Importa Zod

    // 1. Define el mismo esquema que en el backend (o uno similar para el frontend)
    const activitySchema = z.object({
    type: z.string().min(3, "El tipo debe tener al menos 3 caracteres"),
    distance: z.string().min(1, "La distancia es obligatoria"),
    duration: z.string().min(1, "La duración es obligatoria"),
    });

    function ActivityForm({ onAddActivity }) {
    const [formData, setFormData] = useState({ type: '', distance: '', duration: '' });
    // 2. Estado para guardar los errores de validación
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); // Limpia errores anteriores

        // 3. Valida los datos del formulario con Zod
        const result = activitySchema.safeParse(formData);

        if (!result.success) {
        // Si la validación falla, actualiza el estado de errores
        const fieldErrors = {};
        for (const error of result.error.errors) {
            fieldErrors[error.path[0]] = error.message;
        }
        setErrors(fieldErrors);
        return; // Detiene el envío
        }

        // 4. Si la validación es exitosa, envía los datos
        const newActivity = {
        ...result.data,
        date: new Date().toISOString().split('T')[0]
        };
        onAddActivity(newActivity);
        
        // Limpia el formulario
        setFormData({ type: '', distance: '', duration: '' });
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <h3>Registrar Nueva Actividad</h3>
        <div className="form-group">
            <input name="type" type="text" value={formData.type} onChange={handleChange} placeholder="Tipo (ej. Correr)" />
            {errors.type && <p className="error-message">{errors.type}</p>}
        </div>
        <div className="form-group">
            <input name="distance" type="text" value={formData.distance} onChange={handleChange} placeholder="Distancia (ej. 5 km)" />
            {errors.distance && <p className="error-message">{errors.distance}</p>}
        </div>
        <div className="form-group">
            <input name="duration" type="text" value={formData.duration} onChange={handleChange} placeholder="Duración (ej. 30 min)" />
            {errors.duration && <p className="error-message">{errors.duration}</p>}
        </div>
        <button type="submit">Agregar</button>
        </form>
    );
    }

export default ActivityForm;