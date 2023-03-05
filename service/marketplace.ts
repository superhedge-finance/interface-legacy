import { MarketplaceItemDetailType, MarketplaceItemFullType, MarketplaceItemType } from "../types";
import axios from "./axios";

export const getListedItems = async (): Promise<Array<MarketplaceItemType>> => {
  try {
    const { data } = await axios.get(`/marketplace`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getTokenItem = async (listing_id: string): Promise<MarketplaceItemDetailType | null> => {
  try {
    const { data } = await axios.get(`/marketplace/token/${listing_id}`);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUserListedItems = async (address: string): Promise<Array<MarketplaceItemType>> => {
  try {
    const { data } = await axios.get(`/marketplace/${address}`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getUserListedItem = async (listing_id: string): Promise<MarketplaceItemFullType | null> => {
  try {
    const { data } = await axios.get(`/marketplace/item/${listing_id}`);
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
