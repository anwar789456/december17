import axios from 'axios';

export const fetchProducts = async () => {
    try {
        const response = await axios.get('https://www.samethome.com/api/get-products');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};