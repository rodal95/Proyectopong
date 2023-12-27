import React from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { addToCart } from '../../api/cartApi';
import './CardCampaign.css';

export function CardCampaign({ campaign }) {
  const tokenLog = Cookies.get('tokenLogin');

  const addToCartLocal = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = currentCart.find(
      (item) => item.id_campaña === campaign.id_campaña
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      campaign.quantity = 1;
      campaign.subtotal = parseFloat(campaign.precio) * campaign.quantity; // Calcula el subtotal
      currentCart.push(campaign);
    }

    localStorage.setItem('cart', JSON.stringify(currentCart));
    toast.success('Se agregó al carrito');
  };

  const addToCartWithToken = async (id) => {
    const token = Cookies.get('tokenLogin');
    if (token) {
      try {
        const data = {"id_campaña": id , "cantidad": 1}
        await addToCart(token, data);
        toast.success('Se agregó al carrito');
      } catch (error) {
        toast.error('Error al agregar al carrito');
        console.error('Error en addToCart:', error);
      }
    } else {
      addToCartLocal();
    }
  };


  return (
    <div>
      <div className="card">
        <div className="card_content">
          <h3 className="card_title">{campaign.nombre}</h3>
          <p className="card_description">{campaign.descripcion}</p>
          <h3>${campaign.precio}</h3>

          <button onClick={()=>addToCartWithToken(campaign.id_campaña)} className="card__button">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}