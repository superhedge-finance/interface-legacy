import axios from 'axios';

const BASE_URL = process.env.NEXT_API_BASE_URL || 'http://192.168.8.111:4000/api';

export const getProducts = async () => {
    try {
        const { data } = await axios.get(BASE_URL + '/products');
        return data;
    } catch (e) {
        console.error(e)
    }
}

export const getProduct = async (address: string) => {
    try {
        const { data } = await axios.get(BASE_URL + '/products/' + address);
        return data;
    } catch (e) {
        console.error(e)
    }
}
