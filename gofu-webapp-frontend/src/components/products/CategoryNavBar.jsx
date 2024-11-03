import React, { useState } from 'react';
import DeleteCategoryConfirmationModal from './category-delete-modal';
import { agregarCategoria, borrarCategoria } from '../../hooks/api-service';
import CategoryForm from './category-form';

const CategoryNavBar = ({ categories, onSelectCategory, isAdmin = false }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false); 

  const handleCategoryClick = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory(null);  // Deseleccionar la categoría
      onSelectCategory(null);
    } else {
      setSelectedCategory(category);  // Seleccionar nueva categoría
      onSelectCategory(category);
    }
  };

  const onDeleteCategory = async (id) => {
    const response = await borrarCategoria(id);

    if (response === 200 ) {
      alert(`La categoria fue borrado exitosamente!`)
      window.location.reload()
    }else{
      alert(`La categoriano no pudo ser borrada!`)
    }
  }

  const onClose = () => {
    setShowAddModal(false)
  }

  const onAddCategory = async (name) => {
    // Verificar si ya existe una categoría con el mismo nombre
    for (let category of categories) {
      if (category.name.toLowerCase() === name.toLowerCase()) {
        alert(`La categoría '${name}' ya existe.`);
        return;
      }
    }
    const data = { name };
    // Si no existe, proceder a agregar la categoría
    const response = await agregarCategoria(data);
  
    if (response === 201) {
      alert(`La categoría '${name}' fue agregada exitosamente!`);
      window.location.reload();
    } else {
      alert(`La categoría '${name}' no pudo ser agregada!`);
    }
  };


  return (
    <>
    {showAddModal ? <CategoryForm onCancel={onClose} onSubmit={onAddCategory}></CategoryForm> : null}
    {selectedCategoryToDelete ? <DeleteCategoryConfirmationModal category={selectedCategoryToDelete} onClose={() => {setSelectedCategoryToDelete(null)}} onDelete={onDeleteCategory} ></DeleteCategoryConfirmationModal> : null}
    <div className="bg-gray-800 fixed top-16 left-0 w-full z-10 flex overflow-x-auto px-4 py-2"> {/* top-16 asegura que esté justo debajo del header */}
      {categories.map((category) => (
        <div key={category.name} className="relative">
          <button
            onClick={() => handleCategoryClick(category.name)}
            className={`p-2 mx-1 rounded-md min-w-[80px] ${
              selectedCategory === category.name ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
            } flex items-center`}
          >
            {category.name}
            {isAdmin && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategoryToDelete(category);
                }}
                className="ml-2 text-red-600 cursor-pointer"
              >
                &#x2715;
              </span>
            )}
          </button>
        </div>
      ))}
      {isAdmin ? 
      <button 
          className=" bg-blue-500 text-white py-1 px-4 rounded-md absolute right-[5px] "
          onClick={() => {setShowAddModal(true)}}
        >
          Agregar Categoría
      </button>
        : null}
      
    </div>
    </>
  );
};

export default CategoryNavBar;
