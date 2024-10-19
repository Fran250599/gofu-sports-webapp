const express = require('express');
const router = express.Router();

const sampleCategories = [
    'Cat1', 'Cat2', 'Cat3', 'Cat4', 'Cat5', 'Cat6', 'Cat7', 'Cat8', 'Cat9', 'Cat10',
    'Cat11', 'Cat12', 'Cat13', 'Cat14', 'Cat15', 'Cat16', 'Cat17', 'Cat18', 'Cat19', 'Cat20'
];

// Endpoint para obtener las categorías
router.get('/', (req, res) => {
    res.json(sampleCategories); // Envía las categorías como respuesta
});

module.exports = router;
