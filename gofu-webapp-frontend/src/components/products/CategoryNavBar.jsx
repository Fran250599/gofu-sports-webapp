import React, { useState } from 'react';

const CategoryNavBar = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);  // Deseleccionar la categoría
      onSelectCategory(null);
    } else {
      setSelectedCategory(category);  // Seleccionar nueva categoría
      onSelectCategory(category);
    }
  };

  return (
    <div className="bg-gray-800 fixed top-16 left-0 w-full z-10 flex overflow-x-auto px-4 py-2"> {/* top-16 asegura que esté justo debajo del header */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`p-2 mx-1 rounded-md min-w-[80px] ${
            selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryNavBar;
