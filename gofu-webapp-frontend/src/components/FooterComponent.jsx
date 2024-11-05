import React from 'react';
import logo from '../images/logo.webp';  // Importamos la imagen del logo
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FooterComponent = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUsuario(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/');
  };

  return (
    <footer className="bg-gray-900 text-white p-4 flex justify-between items-center w-screen bottom-0 left-0 z-10 shadow-lg">
      {/* Logo de la empresa */}
      <div className="flex items-center">
        <img src={logo} alt="GOFU Logo" className="h-12 mr-2" />  {/* Logo con un tamaño adecuado */}
        <div className="text-3xl font-bold">GOFU</div>
      </div>

      {/* Información de contacto */}
      <div className="text-sm">
        <p>Email: contacto@gofu.com</p>
        <p>Teléfono: +506 8828 4785</p>
      </div>

      {/* Botón de logout si el usuario está presente */}
      {usuario && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
        >
          Logout
        </button>
      )}
    </footer>
  );
};

export default FooterComponent;
