import { Cycle } from "./interface";

export type MarketplaceItemType = {
  id: number;
  tokenId: string;
  offerPrice: number;
  mtmPrice: number;
  underlying: string;
  productAddress: string;
  name: string;
  quantity: number;
  totalLots: number;
  issuanceCycle: Cycle;
};

export type MarketplaceItemFullType = MarketplaceItemType & {
  startingTime: number;
  seller: string;
};
