import React, { useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, currentPage, setCurrentPage }) => {
  const productsPerPage = 6;  // Número máximo de productos por página

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Asegurarse de que la página actual no exceda el número total de páginas
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);  // Si la página actual es mayor al total, restablecer a la página 1
    }
  }, [currentPage, totalPages, setCurrentPage]);

  // Calcular el índice de los productos que se mostrarán en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Botones de paginación */}
      <div className="flex justify-center mt-4">
        {/* Botón de página anterior */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`mx-2 px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'
            }`}
        >
          Anterior
        </button>

        {/* Botón de página siguiente */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`mx-2 px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'
            }`}
        >
          Siguiente
        </button>
      </div>

      {/* Indicador de página actual */}
      <div className="text-center mt-2 text-gray-600">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  );
};

export default ProductList;
