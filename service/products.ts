import axios from "./axios";

export const getProducts = async () => {
  try {
    const { data } = await axios.get("/products");
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getProduct = async (address: string) => {
  try {
    const { data } = await axios.get("/products/" + address);
    return data;
  } catch (e) {
    console.error(e);
  }
};
