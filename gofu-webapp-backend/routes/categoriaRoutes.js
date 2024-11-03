const express = require('express');
const { obtenerCategorias, agregarCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categoriasController');
const router = express.Router();

// Endpoint para obtener las categorías
router.get('/', obtenerCategorias);
router.post('/', agregarCategoria);
router.put('/:id', actualizarCategoria);
router.delete('/:id', eliminarCategoria);

module.exports = router;
