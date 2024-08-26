import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/snack-list.css';

const UpdateSnack = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Recuperar el rol del usuario

  const [snack, setSnack] = useState({
    name: '',
    description: '',
    price: '',
    mark: '',
    advert: '',
    advert2: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/snacks'); 
      return;
    }

    const fetchSnack = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://206.189.189.166:4019/api/snacks/${id}`);
        setSnack(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching snack:', err);
        setError('Failed to fetch snack data. Please try again.');
        setLoading(false);
      }
    };

    fetchSnack();
  }, [id, role, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSnack(prevSnack => ({ ...prevSnack, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://206.189.189.166:4011/api/snacks/${id}`, snack);
      alert('Snack updated successfully!');
      navigate('/snacks');
    } catch (err) {
      console.error('Error updating snack:', err);
      setError('Failed to update snack. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/'); 
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="add-snack">
      <h2>Update Snack</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={snack.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={snack.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={snack.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mark:
          <input
            type="text"
            name="mark"
            value={snack.mark}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Advert:
          <input
            type="text"
            name="advert"
            value={snack.advert}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Advert2:
          <input
            type="text"
            name="advert2"
            value={snack.advert2}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Update Snack</button>
        <button type="button" onClick={handleCancel}>Cancel</button> {}
      </form>
    </div>
  );
};

export default UpdateSnack;
