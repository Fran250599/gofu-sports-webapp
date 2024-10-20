const db = require('../database/db');

// Función para manejar la lógica del login
exports.loginAdmin = async (username, password) => {
    try {
        // Conexión a la base de datos
        const dbConnection = await db();
        const adminCollection = dbConnection.collection('Admin');

        // Busca el administrador por nombre de usuario
        const admin = await adminCollection.findOne({ username });

        // Verifica si el administrador existe y si la contraseña coincide
        if (admin && admin.password === password) {
            // Aquí se puede generar un token si se usa autenticación basada en tokens
            return { success: true, message: 'Login exitoso' };
        } else {
            return { success: false, message: 'Credenciales inválidas' };
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error del servidor');
    }
};
