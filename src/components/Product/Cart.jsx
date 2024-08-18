import React from 'react';
import { useAuth } from '../AuthContext'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, setCart } = useAuth(); // Access cartItems and setCart from AuthContext
  const navigate = useNavigate();

  // Check if cartItems is defined and is an array
  if (!Array.isArray(cartItems)) {
    return <p>Cart items are not available!!!</p>;
  }

  // Update the quantity of an item
  const updateQuantity = (itemId, newQuantity) => {
    console.log('Updating quantity for itemId:', itemId, 'to', newQuantity);

    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Log updated cart
    console.log('Updated Cart:', updatedCart);

    setCart(updatedCart);
  };

  // Remove an item from the cart
  const removeItem = (itemId) => {
    console.log('Removing item with ID:', itemId);

    const updatedCart = cartItems.filter(item => item.id !== itemId);

    // Log updated cart
    console.log('Updated Cart after removal:', updatedCart);

    setCart(updatedCart);
  };

  // Update the size of an item
  const updateSize = (itemId, newSize) => {
    console.log('Updating size for itemId:', itemId, 'to', newSize);

    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, size: newSize };
      }
      return item;
    });

    // Log updated cart
    console.log('Updated Cart:', updatedCart);

    setCart(updatedCart);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);

  // Handle checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    navigate('/payment');
  };

  return (
    <div className="cart-container">
      <div className="left-card">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.image}
                    className="img-fluid rounded-start"
                    alt={item.title}
                    style={{ width: '30%', height: 'auto' }} 
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">
                      ${item.price.toFixed(2)} ({item.quantity || 1} x ${item.price})
                    </p>
                    <div className="d-flex justify-content-between align-items-center" style={{ width: '30%' }}>
                      {/* Quantity Dropdown */}
                      <select
                        value={item.quantity || 1}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                        className="form-select"
                      >
                        {[1, 2, 3, 4, 5].map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {/* Size Dropdown */}
                      <select
                        value={item.size || 'L'}
                        onChange={(e) => updateSize(item.id, e.target.value)}
                        className="form-select"
                      >
                        {['L', 'XL', 'XXL', 'XXXL'].map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {/* Delete Button */}
                      <button onClick={() => removeItem(item.id)} className="btn btn-danger">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="right-card">
        <h3><u>Price Details:</u></h3>
        <div className="price-detail">
          <h6>Subtotal:</h6>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="price-detail">
          <h6>Shipping:</h6>
          <span style={{ color: 'red' }}>Free</span>
        </div>
        <div className="price-detail">
          <h6>Discount:</h6>
          <span>-$100.00</span>
        </div>
        <div className="price-detail">
          <h6>Total:</h6>
          <span>${(totalPrice - 100).toFixed(2)}</span>
        </div>
        <button className="checkout-button btn btn-primary" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
