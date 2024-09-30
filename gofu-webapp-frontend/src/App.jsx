// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWrapper from './AppWrapper';  // Importamos el nuevo componente AppWrapper

function App() {
  return (
    <Router>
      <AppWrapper />  {}
    </Router>
  );
}

export default App;
