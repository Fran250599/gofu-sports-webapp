import { useEffect, useState } from 'react';
import useSearchProducts from '../hooks/useSearchProducts';
import ProductList from './products/ProductList';
import HeaderComponent from './header/HeaderComponent';
import CategoryNavBar from './products/CategoryNavBar';
import ProductFormModal from './products/product-form';
import { addProduct, editProduct } from '../hooks/api-service';

const AdminScreen = () => {
  const { products, categories, loading, error, searchProducts } = useSearchProducts(true); // alternar entre usar la api o los datos quemados. False = quemados ; True = API
  const [searchQuery, setSearchQuery] = useState('');  // Estado para la barra de búsqueda
  const [selectedCategory, setSelectedCategory] = useState(null);  // Estado para la categoría seleccionada
  const [currentPage, setCurrentPage] = useState(1);  // Estado para la página actual
  const [showAddModal, setShowAddModal] = useState(false);

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

  const onClose = () => {
    setShowAddModal(false)
  }

  const onAddProduct = async (data) => {
    const response = await addProduct(data);
    if (response === 201 ) {
      alert(`El producto ${data.name} fue agregado exitosamente!`)
      window.location.reload()
    }else{
      alert(`El producto ${data.name} no pudo ser agregado!`)
    }
  }

  const onDeleteCategory = (category) => {
    console.log("La categoria a borrar es: ", category)
    for (let product of products) {
      // Verificar si el producto tiene la categoría a eliminar
      if (product.categories.includes(category)) {
        return false;
        // Eliminar la categoría de la lista de categorías
        // product.categories = product.categories.filter(cat => cat !== category);
        
        // Preparar los datos para la actualización
        // const updatedProductData = {
        //   name: product.name,
        //   categories: product.categories,
        //   description: product.description,
        //   price: product.price,
        //   image: product.image
        // };
  
        // try {
        //   // Llamada al endpoint de actualización con los datos actualizados
        //   const response = await editProduct( updatedProductData, product._id);
          
        //   if (response.status === 200) {
        //     console.log(`Producto '${product.name}' actualizado con éxito.`);
        //   } else {
        //     console.error(`Error al actualizar el producto '${product.name}'.`);
        //   }
        // } catch (error) {
        //   console.error(`Error al actualizar el producto '${product.name}':`, error);
        // }
      }
    }
    return true;
  }

  return (
    <>
    {showAddModal ? <ProductFormModal onClose={onClose} onSave={onAddProduct}/> : null}
    <div className="p-0 m-0">
      <HeaderComponent onSearch={handleSearch} />
      <CategoryNavBar categories={categories} onSelectCategory={handleSelectCategory}  isAdmin={true} categoryDeleted={onDeleteCategory}/>
      {/* Ajustar el padding-top para que los productos estén justo debajo del nav */}
      <div className="pt-32 px-4">  {/* pt-32 asegura que haya espacio justo debajo del nav */}
        <span className='flex justify-between align-middle mb-6'>
          <h2 className="text-2xl font-bold text-gray-200">Admin Dashboard</h2>
          <button 
          className=" bg-blue-500 text-white py-1 px-4 rounded-md"
          onClick={() => {setShowAddModal(true)}}
        >
          Agregar Producto
        </button>
        </span>
        
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {products.length > 0 ? (
          <ProductList products={products} currentPage={currentPage} setCurrentPage={setCurrentPage} isAdmin={true}/>
        ) : (
          <p>No se encontraron productos del criterio buscado en esta categoría</p>
        )}
      </div>
    </div>
    </>
  );
};

export default AdminScreen;
