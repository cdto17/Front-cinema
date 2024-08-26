import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './styles/commentList.css'; // Agrega estilos si es necesario

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showComments, setShowComments] = useState(false); // Controlar la visibilidad de los comentarios
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://157.230.53.93:4012/api/comments');
        setComments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching comments');
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const toggleComments = () => {
    setShowComments(prev => !prev); // Alternar la visibilidad
  };

  const handleBackToHome = () => {
    navigate('/'); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="comment-list">
      <button onClick={toggleComments}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && (
        <ul>
          {comments.map(comment => (
            <li key={comment._id}>
              <p>{comment.comment}</p>
              <small>{new Date(comment.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default CommentList;
