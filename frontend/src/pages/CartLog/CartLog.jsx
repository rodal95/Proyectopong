import React,{useEffect, useState} from 'react'
import { getCart, cleanCart, deleteCampaign, updateCart} from '../../api/cartApi'
import {createOrder} from '../../api/ordersApi'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';   
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { Campaign } from '../Campaign/Campaign';

export function CartLog() {
    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState('')
    const [forceUpdate, setForceUpdate] = useState(false)
    useEffect(() => {
        const tokenLog = Cookies.get('tokenLogin')
        setToken(tokenLog)
        if(tokenLog){
            carrito(tokenLog)
        }else{
            window.location.href = '/signin'
        }
    async function carrito(token){
        const result = await getCart(token);
        setCartItems(result)
    }
    }, [forceUpdate])
    const clearCart = async () => {
        await cleanCart(token);
        toast.success('Carrito vaciado')
        setForceUpdate(!forceUpdate)
        
      };
    
      const updateQuantity = async (cantidad, id) => {
        const nuevaCantidad = cantidad ;
        await updateCart(token, id, nuevaCantidad);
        setForceUpdate(!forceUpdate)

      };
    const quitarCampaña = async (id) => {
        console.log(id)
        await deleteCampaign(token, id);
        toast.success('Campaña eliminada')
        setForceUpdate(!forceUpdate)
      }
      const finalizeOrder = async () => {
        try {
          const response = await createOrder(token);
          if (response.message === true) {
            // Si la respuesta es exitosa, mostrar un mensaje de éxito
            toast.success('Pedido finalizado correctamente');
            // Actualizar el estado o realizar cualquier acción adicional si es necesario
            // Por ejemplo, podrías redirigir al usuario a una página de confirmación o limpiar el carrito
            window.location.href = '/checkout';
          } else {
            toast.error('Hubo un problema al finalizar el pedido');
          }
        } catch (error) {
          console.error(error);
          toast.error('Error al finalizar el pedido');
        }
      };
    
      const total = cartItems.reduce((acc, item) => acc + parseInt(item.subtotal), 0);
      
  return (
    <div>
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
                  <FontAwesomeIcon icon={faMinus} onClick={() => updateQuantity(item.cantidad -1 ,item.id_campaña)} />
                  <span>{item.cantidad}</span>
                  <FontAwesomeIcon icon={faPlus} onClick={() => updateQuantity(item.cantidad +1, item.id_campaña)} />
                </td>
                <td>${item.precio}</td>
                <td>${item.subtotal}</td>
                <td>
                  <button onClick={(()=>quitarCampaña(item.id_campaña))}>Quitar</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3"></td>
              <td>Total: $ {total} pesos</td>
              <td></td>
            </tr>
          </tbody>
          <label htmlFor="payment">Selecciona tu método de pago:</label>
            <select id="payment" >
                <option value="mercadopago">
                MercadoPago
                </option>
                <option value="transferencia">
                Transferencia
                </option>
                <option value="pagoefectivo">
                Pago en Efectivo
                </option>
            </select><br/>
            <button onClick={finalizeOrder}>Finalizar pedido</button>
          
          </table>
        
      )}
    </div>
  )
}
