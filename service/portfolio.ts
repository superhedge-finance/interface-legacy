import axios from "./axios";
import { IProduct } from "../types";
import { MarketplaceItemType } from "../types/portfolio";

export const getPosition = async (address: string): Promise<Array<IProduct>> => {
  try {
    const { data } = await axios.get(`/users/positions/${address}`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getHistory = async (address: string, order: number) => {
  try {
    const { data } = await axios.get(`/users/history/${address}?sort=${order}`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getListedItems = async (address: string): Promise<Array<MarketplaceItemType>> => {
  try {
    const { data } = await axios.get(`/marketplace/${address}`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
