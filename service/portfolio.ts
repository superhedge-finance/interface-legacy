import axios from "./axios";
import { IProduct } from "../types";

export const getPosition = async (address: string, chainId?: number | null): Promise<Array<IProduct>> => {
  try {
    const { data } = await axios.get(`/users/positions/${address}?chainId=${chainId}`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getHistory = async (address: string, order: number, chainId?: number | null) => {
  try {
    const { data } = await axios.get(`/users/history/${address}?sort=${order}?chainId=${chainId}`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getUserInfo = async (address: string) => {
  try {
    const { data } = await axios.get(`/users/${address}`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
