import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/salas-add.css';

const UpdateSalas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Recuperar el rol del usuario

  const [sala, setSalas] = useState({
    name: '',
    capacity: '',
    location: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://67.205.161.52:4020/api/cinemas/${id}`);
        setSalas(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cinema:', err);
        setError('Failed to fetch cinema data. Please try again.');
        setLoading(false);
      }
    };

    fetchSalas();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalas(prevSala => ({ ...prevSala, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://67.205.161.52:4010/api/cinemas/${id}`, sala);
      alert('Cinema updated successfully!');
      navigate('/cinema');
    } catch (err) {
      console.error('Error updating cinema:', err);
      setError('Failed to update cinema. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirigir al listado de cinemas
  };

  if (role !== 'admin') {
    return <div>You do not have permission to update cinemas.</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="add-sala">
      <h2>Update cinema</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={sala.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Capacity:
          <input
            type="text"
            name="capacity"
            value={sala.capacity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={sala.location}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update cinema</button>
        <button type="button" onClick={handleCancel}>Cancel</button> {/* Botón de cancelación */}
      </form>
    </div>
  );
};

export default UpdateSalas;
