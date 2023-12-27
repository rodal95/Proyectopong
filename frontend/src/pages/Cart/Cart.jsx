import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'react-bootstrap'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { loginClient } from '../../api/clientsApi';
import { getCart, addToCart } from '../../api/cartApi';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


export function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const tokenLog = Cookies.get('tokenLogin')
    if(tokenLog){
      window.location.href = '/cartLog'
    }
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const calculateSubtotal = (item) => {
    return parseFloat(item.precio) * item.quantity;
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    const newQty = newQuantity < 1 ? 1 : newQuantity; // Si la nueva cantidad es menor que 1, establece la cantidad como 1
    updatedCart[index].quantity = newQty;
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((acc, item) => acc + calculateSubtotal(item), 0);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const onSubmit = async (data) => {
    loguearCliente(data);
  };
  async function loguearCliente(data){
    const result = await loginClient(data);
    Cookies.set('tokenLogin', result.token, { expires: 1 })
    
    cartItems.forEach(async item => {
      const data = {
        "id_campaña": item.id_campaña,
        "cantidad": item.quantity
      }
      await addToCart(result.token, data);
      
    });
    toast.success('Logueado correctamente');

    setTimeout(()=>{
      window.location.href = '/cartLog';
      localStorage.removeItem('cart');  
  },2000)
  }


  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      <button onClick={clearCart}>Vaciar Carrito</button>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>
                  <FontAwesomeIcon icon={faMinus} onClick={() => updateQuantity(index, item.quantity - 1)} />
                  <span>{item.quantity}</span>
                  <FontAwesomeIcon icon={faPlus} onClick={() => updateQuantity(index, item.quantity + 1)} />
                </td>
                <td>${item.precio}</td>
                <td>${calculateSubtotal(item)}</td>
                <td>
                  <button onClick={() => removeFromCart(index)}>Quitar</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3"></td>
              <td>Total: $ {total.toFixed(2)} pesos</td>
              <td></td>
            </tr>
          </tbody>
          <button onClick={handleShowModal}>Finalizar pedido</button>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Iniciar Sesión</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} className="custom-form">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" id="email" {...register('email')} className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" id="password" {...register('password')} className="form-control" />
              </div>
              <button type="submit" className="btn btn-success">Iniciar Sesión</button>
              <a href="/signup" className="register-link"> No tenes cuenta? Registrate</a>
            </form>
            </Modal.Body>
          </Modal>
        </table>
        
      )}
    </div>
  );
}
