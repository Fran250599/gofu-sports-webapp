import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Importamos el componente Link

const HeaderComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);  // Ejecuta la búsqueda con el criterio actual
  };

  const clearSearch = () => {
    setSearchQuery('');  // Borra el campo de búsqueda
    onSearch('');  // Ejecuta la búsqueda sin filtros
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10 shadow-lg">
      {/* Hacemos que el título "GOFU" sea un enlace */}
      <Link to="/" className="text-3xl font-bold">
        GOFU&nbsp;
      </Link>
      <div className="flex items-center bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-md w-full max-w-md">
        <input
          type="text"
          className="p-2 rounded-l-md outline-none w-full bg-transparent text-black dark:text-white"
          placeholder="Producto"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}  // Ejecutar búsqueda al presionar Enter
        />
        {/* Botón "x" para borrar */}
        {searchQuery && (
          <button
            className="text-gray-600 px-2"
            onClick={clearSearch}
          >
            &#x2715;  {/* Símbolo X */}
          </button>
        )}
        <button 
          className="bg-blue-500 text-white p-2 rounded-r-md"
          onClick={handleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 18l6-6m0 0l-6-6m6 6H3"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default HeaderComponent;
