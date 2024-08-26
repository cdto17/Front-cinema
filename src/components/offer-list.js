import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/offers-list.css';

const OffersList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.post('http://157.230.53.93:8080', {
          jsonrpc: '2.0',
          method: 'listOffers',
          id: 1
        });
        
        if (response.data.result) {
          setOffers(response.data.result);
        } else if (response.data.error) {
          console.error('Error fetching offers:', response.data.error);
        }
      } catch (err) {
        console.error('Error fetching offers:', err);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="container">
      <h1>Offers List</h1>
      <div className="offers-list">
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <h3>{offer.offer_name}</h3>
            <p><strong>Description:</strong> {offer.offer_description}</p>
            <p><strong>Day of week:</strong> {offer.day_of_week}</p>
            <p><strong>Discount:</strong> {offer.discount_percentage}%</p>
            <p><strong>Start Time:</strong> {offer.start_time}</p>
            <p><strong>End Time:</strong> {offer.end_time}</p>
          </div>
        ))}
      </div>
      <div className="back-to-home">
        <button onClick={() => window.location.href = '/'}>Back to Home</button>
      </div>
    </div>
  );
};

export default OffersList;
