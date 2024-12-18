import { useState, useEffect } from 'react';
import axios from 'axios';
import { sampleProducts, sampleCategories } from '../data/sampleProducts';

const useSearchProducts = (useRealApi = true) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchProducts = async (query, selectedCategory) => {
    setLoading(true);
    setError(null);
    try {
      if (useRealApi) {
        let url = 'https://n6nhhqnh-5000.use2.devtunnels.ms/productos';
        let params = {};

        if (query.trim() !== '') {
          params.q = query;
        }

        if (selectedCategory) {
          params.categoria = selectedCategory;
        }

        const response = await axios.get(url, { params });
        console.log("Datos recibidos de la API:", response.data);

        let filteredProducts = response.data;

        if (selectedCategory) {
          filteredProducts = filteredProducts.filter((product) =>
            product.categories.includes(selectedCategory)
          );
        }

        if (query.trim() !== '') {
          filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
        }

        setProducts(filteredProducts);
      } else {
        let filteredProducts = sampleProducts;

        if (selectedCategory) {
          filteredProducts = filteredProducts.filter((product) =>
            product.categories.includes(selectedCategory)
          );
        }

        if (query.trim() !== '') {
          filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          );
        }

        setProducts(filteredProducts);
      }
    } catch (err) {
      setError('Error al buscar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      if (useRealApi) {
        const response = await axios.get('https://n6nhhqnh-5000.use2.devtunnels.ms/categorias');
        setCategories(response.data);
      } else {
        // Simulación de tiempo de espera para la API
        await new Promise(resolve => setTimeout(resolve, 500));
        setCategories(sampleCategories);
      }
    } catch (err) {
      setError('Error al obtener categorías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [useRealApi]); // Re-fetch cuando cambie useRealApi

  return { products, categories, loading, error, searchProducts, fetchCategories };
};

export default useSearchProducts;