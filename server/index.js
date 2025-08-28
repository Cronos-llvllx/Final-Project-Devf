const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

    app.use(cors());

    app.get('/', (req, res) => {
    res.send('¡El servidor funciona!');
    });

    app.listen(port, () => {
    console.log(`✅ Servidor escuchando en http://localhost:${port}`);
    });