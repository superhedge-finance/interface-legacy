import axios from './axios'
import {IProduct} from "../types";

export const getPosition = async (address: string): Promise<Array<IProduct>> => {
    try {
        const { data } = await axios.get(`/users/positions/${address}`);
        return data;
    } catch (e) {
        console.error(e)
        return [];
    }
}
