import axios from 'axios';

const backendUrl = process.env.REACT_APP_URL_BACKEND
// Crea una instancia de Axios con la URL base
const apiClientes = axios.create({
    baseURL: backendUrl,
});

export const getClient = async (token) => {
    try{
        const response = await apiClientes.get('api/clientes/consultar/',{
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

export const createClient = async (data) => {
    try{
        const response = await apiClientes.post('api/clientes/agregar/',data);
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}

export const loginClient = async (data) => {
    try{
        const response = await apiClientes.post('api/clientes/loguearse/',data);
        return response.data;
    }
    catch(error){
        console.error(error);
    }
}