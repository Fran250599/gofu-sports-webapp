import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import UserScreen from './components/UserScreen';
import AdminScreen from './components/AdminScreen';
import HomeScreen from './components/HomeScreen';
import NotFoundScreen from './components/NotFoundScreen';
import HeaderComponent from './components/header/HeaderComponent';
import FooterComponent from './components/FooterComponent';

function AppWrapper() {
  const location = useLocation();

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
        </Routes>
      </div>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
}

export default AppWrapper;
