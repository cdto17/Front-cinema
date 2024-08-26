import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/snack-list.css';
import config from '../config';

const SnacksList = () => {
  const [snacks, setSnacks] = useState([]);
  const role = localStorage.getItem('role'); // Recuperar el rol del usuario
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    fetchSnacks();
  }, []);

  const fetchSnacks = async () => {
    try {
      const response = await axios.get(config.BASE_URL_SNACKL);
      setSnacks(response.data);
    } catch (err) {
      console.error('Error fetching snacks:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this snack?')) {
      try {
        await axios.delete(`http://localhost:3014/api/snacks/${id}`);
        alert('Snack deleted successfully!');
        fetchSnacks(); // Refetch the list after deletion
      } catch (err) {
        console.error('Error deleting snack:', err);
        alert('Failed to delete snack. Please try again.');
      }
    }
  };

  const handleHomeClick = () => {
    navigate('/'); // Redirigir al inicio
  };

  return (
    <div className="container">
      <h1>Snacks List</h1>
    <div className="snacks-list">
      {snacks.map((snack) => (
        <div key={snack.id} className="snack-card">
          <h3>{snack.name}</h3>
          <p><strong>Descripción:</strong> {snack.description}</p>
          <p><strong>Precio:</strong> {snack.price}</p>
          <p><strong>Marca:</strong> {snack.mark}</p>
          <p><strong>Aviso:</strong> {snack.advert}</p>
          <p><strong>Importante:</strong> {snack.advert2}</p>
          {role === 'admin' && (
            <>
              <Link to={`/update-snack/${snack.id}`}>
                <button className="edit">Edit</button>
              </Link>
              <button className="delete" onClick={() => handleDelete(snack.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      <div className="home-button">
        <button onClick={handleHomeClick}>Regresar al Home</button>
      </div>
    </div>
    </div>
  );
};

export default SnacksList;
