const { ObjectId } = require('mongodb');
const db = require('../database/db');
const categoriaSchema = require('../models/categoriaModel')

exports.obtenerCategorias = async (req, res) => {
    try {
        const dbConnection = await db();
        const collection = dbConnection.collection('Categorias');
        const result = await collection.find({}).toArray();
        const categories = result.map((category) => category);

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las categorias' });
    }
};

exports.agregarCategoria = async (req, res) => {
    try {

        const dbConnection = await db();
        const collection = dbConnection.collection('Categorias');
        const categoria = { ...req.body };
        const result = await collection.insertOne(categoria);
        res.status(201).json({ message: 'Categoria insertada con exito', id: result.insertedId });
    } catch (error) {
        res.status(500).json({ error: 'Error al insertar la categoria' });
    }
}

exports.actualizarCategoria = async (req, res) => {
    try {
        const dbConnection = await db();
        const collection = dbConnection.collection('Categorias');
        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.status(200).json({ message: 'Categoria actualizada con exito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la categoria', message: error.message });
    }
};


exports.eliminarCategoria = async (req, res) => {
    try {
        const dbConnection = await db();
        const collection = dbConnection.collection('Categorias');
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Categoria no encontrado' });
        }

        res.status(200).json({ message: 'Categoria eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar la Categoria', message: error.message });
    }
};