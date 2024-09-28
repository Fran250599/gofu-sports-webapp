const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://camilogonzalezfuentes:gofuproyect@cluster0.icn3g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);
const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Conectado a MongoDB');
        const db = client.db('nombreBaseDeDatos');
        return db;
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
    }
}
module.exports = connectToDatabase;