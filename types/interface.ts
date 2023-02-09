import { BigNumber } from "ethers";
import {HISTORY_TYPE, WITHDRAW_TYPE} from "./enums";

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
    image_uri: string;
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

export type History = {
    address: string;
    type: HISTORY_TYPE;
    withdrawType: WITHDRAW_TYPE;
    productName: string;
    amountInDecimal: number;
    transactionHash: string;
    createdAt: string;
}
