import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/salas-list.css';

const SalasList = () => {
  const [salas, setSalas] = useState([]);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/cinemas');
      setSalas(response.data);
    } catch (err) {
      console.error('Error fetching cinemas:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this cinema?')) {
      try {
        await axios.delete(`http://localhost:3006/api/cinemas/${id}`);
        alert('Cinema deleted successfully!');
        fetchSalas(); 
      } catch (err) {
        console.error('Error deleting cinema:', err);
        alert('Failed to delete cinema. Please try again.');
      }
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Rooms List</h1>
    <div className="salas-list-container">
      <div className="salas-list">
        {salas.map((sala) => (
          <div key={sala.id} className="sala-card">
            <h3>{sala.name}</h3>
            <p><strong>Capacidad:</strong> {sala.capacity}</p>
            <p><strong>Ubicación:</strong> {sala.location}</p>
            {role === 'admin' ? (
              <>
                <Link to={`/update-cinema/${sala.id}`}>
                  <button className="edit">Edit</button>
                </Link>
                <button className="delete" onClick={() => handleDelete(sala.id)}>Delete</button>
              </>
            ) : (
              <p>Only admins can edit or delete cinemas.</p>
            )}
          </div>
        ))}
      </div>
      <div className="home-button-container">
        <button className="home-button" onClick={handleHomeClick}>Regresar al Home</button>
      </div>
    </div>
    </div>
  );
};

export default SalasList;