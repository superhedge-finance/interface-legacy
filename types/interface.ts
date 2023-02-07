import { BigNumber } from "ethers";

type Cycle = {
    coupon: number;
    strikePrice1: number;
    strikePrice2: number;
    strikePrice3: number;
    strikePrice4: number;
    tr1: number;
    tr2: number;
    issuanceDate: number;
    maturityDate: number;
    apy: string;
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
