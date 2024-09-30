import { useState, useEffect } from 'react';
import { sampleProducts, sampleCategories } from '../data/sampleProducts';

const useSearchProducts = () => {
  const [products, setProducts] = useState(sampleProducts);  // Datos simulados
  const [categories, setCategories] = useState([]);  // Categorías dinámicas
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchProducts = async (query, selectedCategory) => {
    setLoading(true);
    setError(null);
    try {
      let filteredProducts = sampleProducts;

      // Filtrar por categoría si hay una seleccionada
      if (selectedCategory) {
        filteredProducts = filteredProducts.filter((product) =>
          product.categories.includes(selectedCategory)
        );
      }

      // Filtrar por búsqueda si el query no está vacío
      if (query.trim() !== '') {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
      }

      setProducts(filteredProducts);
    } catch (err) {
      setError('Error al buscar productos');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        setCategories(sampleCategories);
        setLoading(false);
      }, 500);  // Simulación de tiempo de espera para la API
    } catch (err) {
      setError('Error al obtener categorías');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();  // Llamada para obtener categorías al cargar
  }, []);

  return { products, categories, loading, error, searchProducts, fetchCategories };
};

export default useSearchProducts;
