import { createContext, useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './components/Login/Login';
import Cart from './components/Product/Cart';
import ProductList from './components/Product/ProductList';
import Payment from './components/Payment/Payment';
import OrderConfirmation from './components/Payment/OrderConfirmation';
import Register from './components/Register/Register';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile';
import { AuthProvider } from './components/AuthContext'; 

export const CartContext = createContext();

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const addToCart = (product) => {
    if (!cartItems.find((item) => item.id === product.id)) {
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartContext.Provider value={{ cartItems, setCartItems }}>
          <Navbar cartItems={cartItems} />
          <Routes>
            <Route path='/' element={<Header />} />
            <Route path='/cart' element={<Cart />} />
            <Route
              path='/product'
              element={
                <ProductList
                  products={products}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/order-confirmation' element={<OrderConfirmation />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
          <ImageGallery />
          <Footer />
        </CartContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
