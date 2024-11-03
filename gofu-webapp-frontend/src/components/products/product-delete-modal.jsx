import React from 'react';

export const DeleteConfirmationModal = ({ product, onClose, onDelete }) => {
  if (!product) return null; // Si no hay producto, no muestra el modal

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Confirmar Eliminación</h2>
        <p className="text-gray-700 dark:text-gray-300">
          ¿Está seguro de que desea eliminar el producto <strong>{product.name}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white py-1 px-4 rounded-md"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onDelete(product._id)}
            className="bg-red-500 text-white py-1 px-4 rounded-md"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
