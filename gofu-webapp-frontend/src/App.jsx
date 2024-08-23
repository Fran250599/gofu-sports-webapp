import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/')  // Calls the default endpoint
      .then(response => {
        setMessage(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Message from Backend:</h1>
      {message ? <p>{message}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;
