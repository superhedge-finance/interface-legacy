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

    const [isLoading, setIsLoading] = useState(false)
    const [shFactory, setShFactory] = useState<ethers.Contract | undefined>(undefined)
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        (async () => {
            if (provider) {
                setIsLoading(true)
                try {
                    const _shFactory = new ethers.Contract(SHFactory[ChainId.GOERLI], FactoryABI, provider)
                    setShFactory(_shFactory)
                    const productNames = ProductNames[ChainId.GOERLI]
                    const _products: IProduct[] = []
                    for (const name of productNames) {
                        const productAddress = await _shFactory.getProduct(name)
                        if (productAddress !== ethers.constants.AddressZero) {
                            const _productInstance = new ethers.Contract(productAddress, ProductABI, provider)
                            const _productStatus = await _productInstance.status()

                            if (_productStatus > 0) {
                                const currentCapacity = await _productInstance.currentCapacity()
                                const _product: IProduct = {
                                    name,
                                    address: productAddress,
                                    underlying: await _productInstance.underlying(),
                                    status: _productStatus,
                                    maxCapacity: await _productInstance.maxCapacity(),
                                    currentCapacity: ethers.utils.formatUnits(currentCapacity, 6),
                                }
                                _products.push(_product)
                            }
                        }
                    }
                    setProducts(_products)
                } catch (e) {
                    console.error(e)
                } finally {
                    setIsLoading(false)
                }
            }
            setShFactory(undefined)
        })()
    }, [provider])

    return (
        <ContractContext.Provider
            value={{
                factoryInstsance: shFactory,
                products,
                isLoading,
            }}
        >
            {children}
        </ContractContext.Provider>
    )
}
