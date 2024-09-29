const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('Conectado a MongoDB');
        const db = client.db('gofu');
        return db;
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
    }
}
module.exports = connectToDatabase;