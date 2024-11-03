import React, { useState } from 'react';

const CategoryForm = ({ onCancel, onSubmit }) => {
  const [name, setName] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert('El campo de nombre es obligatorio.');
      return;
    }
    onSubmit(name);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Agregar Categoría</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white py-1 px-4 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-1 px-4 rounded-md"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
