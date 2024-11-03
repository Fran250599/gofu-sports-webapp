const express = require('express');
const { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } = require('../controllers/productoController');
const { validarProducto } = require('../Middleware/validarProducto');
const router = express.Router();

router.get('/', obtenerProductos);
router.post('/', validarProducto, agregarProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);

module.exports = router;