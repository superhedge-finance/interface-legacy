import { ethers } from 'ethers'
import { ReactNode, useEffect, useState } from 'react'
import {useAccount, useProvider} from 'wagmi'
import { SHFactory } from '../../constants/address'
import { ChainId } from '../../constants/chain'
import { ContractContext } from '../contexts/contract'
import { ProductNames } from '../../constants/constants'
import FactoryABI from '../../constants/abis/SHFactory.json'
import ProductABI from '../../constants/abis/SHProduct.json'
import { IProduct } from '../../types/interface'

type ContractProviderProps = {
    children?: ReactNode
}

export const ContractProvider = ({
    children,
}: ContractProviderProps) => {
    const provider = useProvider({
        chainId: ChainId.GOERLI,
    })

    const [shFactory, setShFactory] = useState<ethers.Contract | undefined>(undefined)
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        (async () => {
            if (provider) {
                const _shFactory = new ethers.Contract(SHFactory[ChainId.GOERLI], FactoryABI, provider)
                setShFactory(_shFactory)
                const productNames = ProductNames[ChainId.GOERLI]
                const _products: IProduct[] = []
                for (const name of productNames) {
                    const productAddress = await _shFactory.getProduct(name)
                    const _productInstance = new ethers.Contract(productAddress, ProductABI, provider)
                    const _productStatus = await _productInstance.status()

                    if (_productStatus > 0) {
                        const _product: IProduct = {
                            name,
                            address: productAddress,
                            underlying: await _productInstance.underlying(),
                            status: _productStatus,
                            maxCapacity: await _productInstance.maxCapacity(),
                            currentCapacity: await _productInstance.currentCapacity()
                        }
                        _products.push(_product)
                    }
                }
                setProducts(_products)
            }
            setShFactory(undefined)
        })()
    }, [provider])

    return (
        <ContractContext.Provider
            value={{
                factoryInstsance: shFactory,
                products,
            }}
        >
            {children}
        </ContractContext.Provider>
    )
}
