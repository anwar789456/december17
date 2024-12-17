import axios from 'axios';
export const submitOrder = async (orderData) => {
    try {
        const response = await axios.post("https://www.samethome.com/api/commandes", orderData);
        return response.data;
    } catch (error) {
        throw error;
    }
};