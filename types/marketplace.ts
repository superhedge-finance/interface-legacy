export type NFTItem = {
    id: number;
    name: string;
    label: string;
    currency1: string;
    currency2: string;
    offer_price: number;
    mtm_price: number;
    total_lots: number;
    underlying?: string;
    category?: string;
}

export type Activity = {
    date: string;
    amount: number;
    lots: number;
    contract: string;
}
