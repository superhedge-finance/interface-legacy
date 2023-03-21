import axios from "./axios";

export const getProducts = async (chainId?: number | null) => {
  try {
    const { data } = await axios.get(`/products?chainId=${chainId}`);
    return data;
  } catch (e) {
    return [];
  }
};

export const getProduct = async (address: string, chainId?: number | null) => {
  try {
    const { data } = await axios.get(`/products/${address}?chainId=${chainId}`);
    return data;
  } catch (e) {
    return null;
  }
};
