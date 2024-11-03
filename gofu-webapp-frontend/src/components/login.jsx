import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { login } from '../hooks/api-service';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // Encriptar la contraseña antes de enviarla
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(formData.password, salt);

    // Llamar a la función onSubmit con los datos encriptados
    onSubmit({ username: formData.username, password: hashedPassword })
  };

  const onSubmit = async (params) => {
    const response = await login(params);

    if (response === 200) {
        // Guardar el nombre de usuario en el almacenamiento local
        localStorage.setItem('usuario', params.username);
        
        alert(`Login exitoso!`);
        window.location.assign('/admin');
    } else {
        alert(`Hubo un error al intentar entrar en el sistema`);
    }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">Usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-4 rounded-md"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
