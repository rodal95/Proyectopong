import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../api/ordersApi';
import Cookies from 'js-cookie';
import './Checkout.css';
export function Checkout() {
  const [ultimoPedido, setUltimoPedido] = useState(null);

  useEffect(() => {
    const tokenLog = Cookies.get('tokenLogin');
    if (!tokenLog) {
      window.location.href = '/signin';
    } else {
      getUltimoPedido(tokenLog);
    }
  }, []);

  const getUltimoPedido = async (token) => {
    try {
      const ultimoPedidoData = await getOrders(token);
      setUltimoPedido(ultimoPedidoData);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  return (
    <div>
      {ultimoPedido && (
        <div className="card-checkout">
          <h2>Factura</h2>
          <p>ID del Pedido: {ultimoPedido.id_pedido}</p>
          <p>Fecha: {ultimoPedido.fecha}</p>
          <p>Total: ${ultimoPedido.total}</p>

          <div>
            <h3>Campañas:</h3>
            <ul>
              {ultimoPedido.campañas.map((campaña, index) => (
                <li key={index}>
                  <p>ID Campaña: {campaña.id_campaña}</p>
                  <p>Nombre: {campaña.nombre}</p>
                  <p>Cantidad: {campaña.cantidad}</p>
                  <p>Precio: ${campaña.precio}</p>
                  <p>Subtotal: ${campaña.subtotal}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Link to="/">Volver a la página principal</Link>
    </div>
  );
}

