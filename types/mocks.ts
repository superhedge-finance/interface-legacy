import { NFTItem } from "./marketplace";

export const mockData: Array<NFTItem> = [
  {
    id: 1,
    name: "ETH/USDC",
    label: "ETH Bullish Spread",
    currency1: "/currency/eth.svg",
    currency2: "/currency/usdc.svg",
    offer_price: 1809,
    mtm_price: 2809,
    total_lots: 23
  },
  {
    id: 2,
    name: "BTC/USDC",
    label: "BTC Bullish Spread",
    currency1: "/currency/btc.svg",
    currency2: "/currency/usdc.svg",
    offer_price: 1609,
    mtm_price: 1800,
    total_lots: 34
  },
  {
    id: 3,
    name: "ETH/USDC",
    label: "ETH Bearish Spread",
    currency1: "/currency/eth.svg",
    currency2: "/currency/usdc.svg",
    offer_price: 1800,
    mtm_price: 1900,
    total_lots: 57
  },
  {
    id: 4,
    name: "BTC/USDC",
    label: "BTC Bearish Spread",
    currency1: "/currency/btc.svg",
    currency2: "/currency/usdc.svg",
    offer_price: 2005,
    mtm_price: 2100,
    total_lots: 18
  },
  {
    id: 5,
    name: "ETH/USDC",
    label: "ETH Range Spread",
    currency1: "/currency/eth.svg",
    currency2: "/currency/usdc.svg",
    offer_price: 1509,
    mtm_price: 1609,
    total_lots: 20
  },
  {
    id: 6,
    name: "BTC/USDC",
    label: "BTC Range Spread",
    currency1: "/currency/btc.svg",
    currency2: "/currency/usdc.svg",
    offer_price: 1950,
    mtm_price: 2000,
    total_lots: 80
  }
];
