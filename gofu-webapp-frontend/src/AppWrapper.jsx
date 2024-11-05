import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import UserScreen from './components/UserScreen';
import AdminScreen from './components/AdminScreen';
import HomeScreen from './components/HomeScreen';
import NotFoundScreen from './components/NotFoundScreen';
import HeaderComponent from './components/header/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import LoginForm from './components/login';

function AppWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario intenta acceder a la ruta /admin
    if (location.pathname.toLowerCase() === '/admin') {
      const usuario = localStorage.getItem('usuario');
      if (!usuario) {
        // Redirigir al login si no hay un usuario en localStorage
        navigate('/login');
      }
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent onSearch={() => {}} />  {/* Header en la parte superior */}
      
      {/* Contenedor principal que ocupa el espacio restante */}
      <div className="flex-grow container mx-auto p-4 pt-14">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/user" element={<UserScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
          <Route path='/login' element={<LoginForm></LoginForm>} />
        </Routes>
      </div>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
}

export default AppWrapper;
