import { BigNumber } from "ethers";

export interface IProduct {
    name: string;
    address: string;
    underlying: string;
    status: number;
    maxCapacity: BigNumber;
    currentCapacity: string;
}
