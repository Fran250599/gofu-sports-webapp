const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./database/db');
const { ObjectId } = require('mongodb');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Todo funciona!!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Prueba para MongoDB
const producto = {
  nombre: "Nombre del Producto",
  descripcion: "Descripción detallada del producto",
  categorias: ["Cat1", "Cat2"],
  imagenURL: "https://example.com/imagen-del-producto.jpg",
  precio: 100.50,
  disponibilidad: true,
  fecha_creacion: new Date()
};

async function agregarProducto(db, producto) {
  try {
    const collection = db.collection('Productos');
    const result = await collection.insertOne(producto);
    console.log('Producto insertado:', result.insertedId);
  } catch (error) {
    console.error('Error al insertar el producto', error);
  }
}

//db().then(db => agregarProducto(db, producto));

app.get('/productos', async (req, res) => {
  try {
    const dbConnection = await db();
    const collection = dbConnection.collection('Productos');
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.post('/productos', async (req, res) => {
  try {
    const dbConnection = await db();
    const collection = dbConnection.collection('Productos');
    const date = new Date();
    req.body.fecha_creacion = date;
    const result = await collection.insertOne(req.body);
    res.status(201).json({ message: 'Producto insertado con exito', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Error al insertar el producto' });
  }
});

app.put('/productos/:id', async (req, res) => {
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
});

