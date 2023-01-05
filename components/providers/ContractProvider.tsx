import { ethers } from 'ethers'
import { ReactNode, useEffect, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
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
    const { address } = useAccount()
    const { data: signer } = useSigner()

    const [shFactory, setShFactory] = useState<ethers.Contract | undefined>(undefined)
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        (async () => {
            if (address && signer) {
                const _shFactory = new ethers.Contract(SHFactory[ChainId.GOERLI], FactoryABI, signer)
                setShFactory(_shFactory)
                const productNames = ProductNames[ChainId.GOERLI]
                for (const name of productNames) {
                    const productAddress = await _shFactory.getProduct(name)
                    const _productInstance = new ethers.Contract(productAddress, ProductABI, signer)
                    const _productStatus = await _productInstance.status()

                    if (_productStatus > 0) {
                        const _product: IProduct = {
                            name,
                            underlying: await _productInstance.underlying(),
                            status: _productStatus,
                            maxCapacity: await _productInstance.maxCapacity(),
                            currentCapacity: await _productInstance.currentCapacity()
                        }
                        setProducts((prev) => [...prev, _product])
                    }
                }
            }
            setShFactory(undefined)
        })()
    }, [address, signer])

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