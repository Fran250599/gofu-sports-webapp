import React, { useEffect, useState } from 'react';
import useSearchProducts from '../hooks/useSearchProducts';
import ProductList from './products/ProductList';
import HeaderComponent from './header/HeaderComponent';
import CategoryNavBar from './products/CategoryNavBar';

const UserScreen = () => {
  const { products, categories, loading, error, searchProducts } = useSearchProducts(true); // alternar entre usar la api o los datos quemados. False = quemados ; True = API
  const [searchQuery, setSearchQuery] = useState('');  // Estado para la barra de búsqueda
  const [selectedCategory, setSelectedCategory] = useState(null);  // Estado para la categoría seleccionada
  const [currentPage, setCurrentPage] = useState(1);  // Estado para la página actual

  useEffect(() => {
    // Cada vez que se realiza una búsqueda o se selecciona una categoría, volvemos a la página 1
    setCurrentPage(1);
    searchProducts(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  // Función para manejar la búsqueda desde el HeaderComponent
  const handleSearch = (query) => {
    setSearchQuery(query);  // Actualizar el estado del query
    setCurrentPage(1);  // Volver a la primera página
  };

  // Función para manejar la selección de una categoría
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);  // Actualizar la categoría seleccionada
    setCurrentPage(1);  // Volver a la primera página
  };

  return (
    <div className="p-0 m-0">
      <HeaderComponent onSearch={handleSearch} />
      <CategoryNavBar categories={categories} onSelectCategory={handleSelectCategory} />
      {/* Ajustar el padding-top para que los productos estén justo debajo del nav */}
      <div className="pt-32 px-4">  {/* pt-32 asegura que haya espacio justo debajo del nav */}
        <h2 className="text-2xl font-bold text-gray-200">User Dashboard</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {products.length > 0 ? (
          <ProductList products={products} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        ) : (
          <p>No se encontraron productos del criterio buscado en esta categoría</p>
        )}
      </div>
    </div>
  );
};

export default UserScreen;
