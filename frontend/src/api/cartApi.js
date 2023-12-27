// Importa la librería Axios
import axios from 'axios';

const backendUrl = process.env.REACT_APP_URL_BACKEND
// Crea una instancia de Axios con la URL base
const apiCarritos = axios.create({
    baseURL: backendUrl,
});

export const getCart = async (token) => {
    try{
        const response = await apiCarritos.get('api/carritos/carritosId/',{
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

export const addToCart = async (token, data) => {
    try {
        const response = await apiCarritos.post('api/carritos/agregarCarrito/', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateCart = async (token, id, nuevaCantidad) => {
    try {
        const response = await apiCarritos.put(`api/carritos/actualizarCarrito/${id}`, { nueva_cantidad: nuevaCantidad }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const cleanCart = async (token) => {
    try {
        const response = await apiCarritos.delete('api/carritos/eliminarCarrito/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteCampaign = async (token, id) => {
    try {
        const response = await apiCarritos.delete(`api/carritos/eliminarCampana/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}