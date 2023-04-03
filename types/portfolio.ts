import { MarketplaceItemType } from "./marketplace";

export type OfferType = {
  id: number;
  tokenId: string;
  listingId: string;
  price: number;
  startingTime: number;
  quantity: number;
  seller: string;
};

export type MarketplaceItemDetailType = MarketplaceItemType & {
  offers: OfferType[];
};
