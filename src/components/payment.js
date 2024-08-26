import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/payments.css';

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:3080/api/payments');
        setPayments(response.data);
      } catch (err) {
        console.error('Error fetching payments:', err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="container">
      <h1>Payments List</h1>
      <div className="payments-list">
        {payments.map((payment) => (
          <div key={payment.id} className="payment-card">
            <h3>{payment.nombre}</h3>
            <p><strong>Description:</strong> {payment.descripcion}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentsList;