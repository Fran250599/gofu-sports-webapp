import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bienvenido a Equipos GOFU</h2>
      
      <p className="mb-4">
        Somos una empresa dedicada a la venta de equipos de gimnasio artesanal, hechos a mano con la más alta calidad. 
        Nos especializamos en la creación de mancuernas, barras, y otros accesorios diseñados para ofrecer durabilidad 
        y resistencia. Nuestro equipo se fabrica con materiales reciclados y de bajo impacto ambiental, pero con el 
        mismo rendimiento de los productos convencionales del mercado.
      </p>

      <p className="mb-4">
        Con más de 10 años en el mercado, nos hemos convertido en la elección preferida de aquellos que buscan un 
        equipo único y personal para sus entrenamientos. Nuestro objetivo es brindar a nuestros clientes productos 
        de alta calidad que puedan usar de por vida.
      </p>

      <p className="mb-6">
        Explora nuestros productos y descubre el equipo perfecto para tus necesidades de entrenamiento.
      </p>

      {/* Link a la página de productos (users) */}
      <Link to="/user" className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Ver productos
      </Link>
    </div>
  );
};

export default HomeScreen;
