import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePlaceOrder = () => {
    
    if (address.trim() === '') {
      alert('Please enter your address.');
      return;
    }
        console.log('Order placed with:', { paymentMethod, address });

    
    navigate('/order-confirmation');
  };

  return (
    <div className="payment-container">
      <h2> Select Payment Method</h2>
      <div className="payment-methods">
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="payOnline"
            checked={paymentMethod === 'payOnline'}
            onChange={handlePaymentChange}
          />
          Pay Online<img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo.png" style={{width:"50%"}}/>
        </label> 
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="cashOnDelivery"
            checked={paymentMethod === 'cashOnDelivery'}
            onChange={handlePaymentChange}
          />
          Cash on Delivery<img src="https://atlas-content-cdn.pixelsquid.com/stock-images/money-one-hundred-dollar-bill-qvnka28-600.jpg" style={{width:"50%"}}/>
        </label>
      </div>

      {paymentMethod && (
        <div className="address-form">
          {/* <h3>Enter Your Address</h3> */}
          <textarea
            placeholder="Confirm your address here..."
            value={address}
            onChange={handleAddressChange}
            rows="4"
            style={{ width: '100%' }}
          ></textarea>
        </div>
      )}

      <button className="place-order-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Payment;
