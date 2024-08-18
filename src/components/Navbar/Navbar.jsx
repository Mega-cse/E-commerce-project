import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { faBasketShopping, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext'; // Ensure this path is correct
import './Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, cartItems } = useAuth(); // Use context to get user and cart items

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null); // Clear user state in context
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <Link to='/' className="nav-link" style={{ fontSize: "1.5em", fontWeight: 'bold' }}>
        <FontAwesomeIcon icon={faBasketShopping} style={{ marginRight: 10, fontSize: "2em", color: 'orange' }} />
        Shoppie
      </Link>
      <ul className="nav navbar-nav mx-auto nav-ul">
        <li className="nav-item"></li>
      </ul>
      <ul className="nav navbar-nav ml-auto">
        {user ? (
          <div className="user-menu">
            <button
              className="user-button"
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ backgroundColor: "#ffa07a", marginRight: 40, fontSize: "1.5em", border: 'none', color: 'white', cursor: 'pointer' }}
            >
              {user.name}
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <li className="nav-item">
            <Link to='/login' className="nav-link btn btn-outline-dark" style={{ backgroundColor: "#ffa07a", marginRight: 40, fontSize: "1.5em" }}>
              Login
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link to='/cart' className="nav-link btn btn-outline-dark" style={{ backgroundColor: "#ffa07a", marginRight: 40, fontSize: "1.5em" }}>
            <FontAwesomeIcon icon={faShoppingCart} />{cartItems.length}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
