const { body, validationResult } = require('express-validator');

exports.validarProducto = [
    body('name')
        .notEmpty().withMessage('El nombre es requerido')
        .isString().withMessage('El nombre debe ser un texto'),

    body('categories')
        .isArray({ min: 1 }).withMessage('Debe haber al menos una categoría')
        .custom((categories) => categories.every(cat => typeof cat === 'string'))
        .withMessage('Todas las categorías deben ser texto'),

    body('description')
        .notEmpty().withMessage('La descripción es requerida')
        .isString().withMessage('La descripción debe ser un texto'),

    body('price')
        .notEmpty().withMessage('El precio es requerido')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),

    body('image')
        .isURL().withMessage('La URL de la imagen no es válida'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

