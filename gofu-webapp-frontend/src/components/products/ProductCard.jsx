import React, { useState } from 'react';
import ProductFormModal from './product-form';
import { deleteProduct, editProduct } from '../../hooks/api-service';
import DeleteConfirmationModal from './product-delete-modal';

const ProductCard = ({ product, isAdmin = false}) => {
  const { name, categories, description, price, image } = product;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  console.log(JSON.stringify(product))
  // Número de WhatsApp al que se enviará el mensaje
  const phoneNumber = '50688284785';  // Reemplaza con el número de destino

  const handleProductButtonClick = () => {
    if (!isAdmin) {
      handleContactClick()
    }else{
      setShowEditModal(true)
    }
  }
  // Función para redirigir a WhatsApp con el mensaje predefinido
  const handleContactClick = () => {
    const message = `👋 *¡Hola!*\nEstoy interesado en el producto:\n*${name}* (${description})\n💲 *Precio:* $${price}.\n\n¿Está disponible?`;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const onClose = () => {
    setShowEditModal(false)
    setShowDeleteModal(false)
  }

  const onEditProduct = async (data, id) => {
    const response = await editProduct(data, id);

    if (response === 200 ) {
      alert(`El producto ${data.name} fue actulizado exitosamente!`)
      window.location.reload()
    }else{
      alert(`El producto ${data.name} no pudo ser actualizado!`)
    }
  }

  const onDeleteProduct = async (id) => {
    const response = await deleteProduct(id);

    if (response === 200 ) {
      alert(`El producto fue borrado exitosamente!`)
      window.location.reload()
    }else{
      alert(`El producto no pudo ser borrado!`)
    }
  }
  
  
  return (
    <>
    {showEditModal ? <ProductFormModal product={product} onClose={onClose} onSave={onEditProduct}/> : null}
    {showDeleteModal ? <DeleteConfirmationModal product={product} onClose={onClose} onDelete={onDeleteProduct}/> : null}
    <div className="border rounded-md p-4 shadow-md flex items-center bg-white dark:bg-gray-800">
      {/* Imagen del producto */}
      <img src={image} alt={name} className="w-24 h-24 object-contain mr-4" />
      
      {/* Información del producto */}
      <div className="flex-grow">
        {/* Nombre del producto */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h2>
        {/* Categorías del producto */}
        <p className="text-sm text-gray-500 dark:text-gray-400">{categories.join(', ')}</p>
        {/* Descripción del producto */}
        <p className="text-gray-700 dark:text-gray-300 mt-2">{description}</p>
        {/* Precio del producto */}
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-2">${price}</p>
        {/* Botón de contacto */}
        <span className='flex space-x-2  mr-2'>
          <button 
          className="mt-4 bg-blue-500 text-white py-1 px-4 rounded-md"
          onClick={handleProductButtonClick}
        >
          {!isAdmin ? 'Contacto' : 'Editar'}
        </button>

        {isAdmin? <button 
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md "
          onClick={() => {setShowDeleteModal(true)}}
        >
          Eliminar
        </button> : null}</span>
        
      </div>
    </div>
    </>
  );
};

export default ProductCard;
