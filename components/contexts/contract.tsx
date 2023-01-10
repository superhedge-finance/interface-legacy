import { ethers } from 'ethers'
import { createContext } from 'react'
import { IProduct } from '../../types/interface'

export type ContractContextType = {
    factoryInstsance: ethers.Contract | undefined,
    products: IProduct[],
    isLoading: boolean,
}

export const ContractContext = createContext<ContractContextType>({
    factoryInstsance: undefined,
    products: [],
    isLoading: false,
})

