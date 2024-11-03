import React, { useState, useEffect } from 'react';
import { getCategories } from '../../hooks/api-service';

export const ProductFormModal = ({ product = null, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    categories: product?.categories || [],
    description: product?.description || '',
    price: product?.price || '',
    image: product?.image || ''
  });
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(product?.categories || []);

  useEffect(() => {
    // Simulación de llamada a un endpoint para obtener las categorías
    async function fetchCategories() {
      try {
        const categories = await getCategories();
        setAvailableCategories(categories);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCategory = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.image) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const productData = { ...formData, categories: selectedCategories };
    if (product) {
      onSave(productData, product._id);
    } else {
      onSave(productData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {product ? 'Editar Producto' : 'Agregar Producto'}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">Precio ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">Imagen (URL)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200">Categorías</label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category, index) => (
                <button
                  key={category._id}
                  type="button"
                  className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm"
                  onClick={() => handleAddCategory(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="mt-2">
              {selectedCategories.map((cat, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-blue-500 text-white px-2 py-1 rounded mr-2 text-sm"
                >
                  {cat}
                  <button
                    type="button"
                    className="ml-2 text-white"
                    onClick={() => handleRemoveCategory(cat)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
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
              onClick={handleSubmit}
              className={`${
                product ? 'bg-green-500' : 'bg-blue-500'
              } text-white py-1 px-4 rounded-md`}
            >
              {product ? 'Editar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
