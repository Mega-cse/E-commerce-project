import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Ensure this path is correct
import './Payment.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { setCart } = useAuth(); // Use context to access the setCart method

  useEffect(() => {
    // Animation logic
    const burst = document.querySelector('.burst');
    if (burst) {
      burst.classList.add('animate');
    }
    
    // Clear cart items after animation
    const timer = setTimeout(() => {
      setCart([]); // Clear the cart
      navigate('/'); // Redirect to home page
    }, 3000); // Adjust the delay as needed to match the animation duration

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [setCart, navigate]);

  return (
    <div className="order-confirmation">
      <div className="burst"></div>
      <h2>Order Confirmation</h2>
      <p>Your order has been placed successfully!</p>
      {/* The button here is optional; it will be used for demonstration in case automatic navigation doesn't work */}
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default OrderConfirmation;
