import { Cycle } from "./interface";

export type MarketplaceItemType = {
  id: number;
  tokenId: string;
  offerPrice: number;
  mtmPrice: number;
  underlying: string;
  productAddress: string;
  name: string;
  totalLots: number;
  issuanceCycle: Cycle;
};
