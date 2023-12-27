// Importa la librería Axios
import axios from 'axios';

const backendUrl = process.env.REACT_APP_URL_BACKEND
// Crea una instancia de Axios con la URL base
const apiCampañas = axios.create({
    baseURL: backendUrl,
});

export const getCampaigns = async () => {
    try {
        const response = await apiCampañas.get('api/campañas/all/');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

