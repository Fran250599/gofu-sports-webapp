// src/components/SearchBarComponent.jsx
import { useState } from 'react';

const SearchBarComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    onSearch(searchQuery);  // Llamamos la función de búsqueda pasada como prop
  };

  return (
    <div className="flex items-center bg-white dark:bg-gray-800 text-black dark:text-white rounded-md shadow-md w-full max-w-md">
      <input
        type="text"
        className="p-2 rounded-l-md outline-none w-full bg-transparent text-black dark:text-white"
        placeholder="Producto"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}  // Buscar al presionar Enter
      />
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
  );
};

export default SearchBarComponent;
