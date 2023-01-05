import { BigNumber } from "ethers";

export interface IProduct {
    name: string;
    underlying: string;
    status: number;
    maxCapacity: BigNumber;
    currentCapacity: BigNumber;
}