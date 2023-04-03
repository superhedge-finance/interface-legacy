import { Cycle } from "./interface";

export type MarketplaceItemType = {
  offerPrice: number;
  mtmPrice: number;
  underlying: string;
  productAddress: string;
  name: string;
  totalLots: number;
  issuanceCycle: Cycle;
};

export type MarketplaceItemFullType = MarketplaceItemType & {
  id: number;
  tokenId: string;
  listingId: string;
  quantity: number;
  startingTime: number;
  seller: string;
};
