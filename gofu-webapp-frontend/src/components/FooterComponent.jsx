import React from 'react';
import logo from '../images/logo.webp';  // Importamos la imagen del logo

const FooterComponent = () => {
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
    </footer>
  );
};

export default FooterComponent;
