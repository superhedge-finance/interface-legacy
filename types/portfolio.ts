import { MarketplaceItemType } from "./marketplace";

export type OfferType = {
  id: number;
  price: number;
  startingTime: number;
  quantity: number;
  seller: string;
};

export type MarketplaceItemDetailType = MarketplaceItemType & {
  offers: OfferType[];
};
