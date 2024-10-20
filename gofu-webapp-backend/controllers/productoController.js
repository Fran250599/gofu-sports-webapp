const { ObjectId } = require('mongodb');
const db = require('../database/db');
const productoSchema = require('../models/productoModel')

// Función para validar el producto según el esquema
function validateProduct(product) {
    const keys = Object.keys(productoSchema);
    for (let key of keys) {
        if (typeof product[key] !== typeof productoSchema[key]()) {
            throw new Error(`Tipo inválido para ${key}. Se esperaba ${typeof productoSchema[key]().name}.`);
        }
    }
}

exports.obtenerProductos = async (req, res) => {
    try {
        const dbConnection = await db();
        const collection = dbConnection.collection('Productos');
        const result = await collection.find({}).toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

exports.agregarProducto = async (req, res) => {
    try {

        validateProduct(req.body);

        const dbConnection = await db();
        const collection = dbConnection.collection('Productos');
        const producto = { ...req.body, fecha_creacion: new Date() };
        const result = await collection.insertOne(producto);
        res.status(201).json({ message: 'Producto insertado con exito', id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'Error al insertar el producto' });
    }
};

exports.actualizarProducto = async (req, res) => {
    try {
        const dbConnection = await db();
        const collection = dbConnection.collection('Productos');
        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.status(200).json({ message: 'Producto actualizado con exito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto', message: error.message });
    }
};
