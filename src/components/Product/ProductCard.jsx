import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProductCard = ({ product }) => {
  const [inCart, setInCart] = useState(false);
  const { user, cartItems, setCart } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setInCart(cartItems.some(item => item.id === product.id));
  }, [cartItems, product.id]);

  const handleAddToCart = () => {
    if (user) {
      setCart(prevCart => {
        // Check if the product is already in the cart
        const isAlreadyInCart = prevCart.some(item => item.id === product.id);
        
        if (!isAlreadyInCart) {
          return [...prevCart, { ...product, quantity: 1 }];
        }
        return prevCart;
      });
      setInCart(true);
    } else {
      navigate('/login', { state: { from: '/product' } });
    }
  };

  const handleRemoveFromCart = () => {
    setCart(prevCart => prevCart.filter(item => item.id !== product.id));
    setInCart(false);
  };

  const ratingStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i < product.rating.rate ? 'filled' : ''}`}
          style={{ color: i < product.rating.rate ? 'orange' : 'gray' }}
        />
      );
    }
    return stars;
  };

  return (
    <div
      className="card mb-4"
      style={{
        maxWidth: '300px',
        maxHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        className="card-image-container"
        style={{
          backgroundColor: 'white',
          padding: '40px',
          height: '60%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            maxWidth: '80%',
            maxHeight: '80%',
            objectFit: 'contain',
          }}
        />
      </div>
      <div
        style={{
          fontSize: '14px',
          color: 'orange',
          textAlign: 'center',
        }}
      >
        {ratingStars()}
      </div>
      <div
        className="card-details"
        style={{
          color: 'orange',
          padding: '10px',
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h6>{product.title}</h6>
          <p>${product.price.toFixed(2)}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          {inCart ? (
            <button
              onClick={handleRemoveFromCart}
              className="btn cart-button"
          
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="btn cart-button"
             
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
