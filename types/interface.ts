import { BigNumber } from "ethers";

type Cycle = {
    coupon: number;
    strikePrice1: number;
    strikePrice2: number;
    strikePrice3: number;
    strikePrice4: number;
    url: string;
}

export interface IProduct {
    name: string;
    address: string;
    underlying: string;
    status: number;
    maxCapacity: BigNumber;
    currentCapacity: string;
    issuanceCycle: Cycle;
}
