import axios from 'axios';

const backendUrl = process.env.REACT_APP_URL_BACKEND
// Crea una instancia de Axios con la URL base
const apiOrders = axios.create({
    baseURL: backendUrl,
});

export const getOrders = async (token) => {
    try{
        const response = await apiOrders.get('api/pedidos/pedidosId/',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}

export const createOrder = async (token) => {
    try{
        const response = await apiOrders.get('api/pedidos/finalizarPedido/',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}
