import {NextPage} from "next";
import {useRouter} from "next/router";
import {ActionArea} from "../../components/product/ActionArea";
import Image from "next/image";
import {IProduct} from "../../types/interface";
import {useEffect, useMemo, useState} from "react";
import {ethers} from "ethers";
import ProductABI from "../../constants/abis/SHProduct.json";
import {ChainId} from "../../constants/chain";
import {useProvider} from "wagmi";
import {SkeletonCard} from "../../components/basic";
import {getProduct} from "../../service";

const status = [
    'Pending',
    'Indicative',
    'Indicative',
    'Active',
    'Active'
]

const RecapCard = ({ label, value }: { label: string, value: string }) => {
    return (
        <div className='flex flex-col flex-1 items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4'>
            <p className="text-[12px] font-light text-gray-700">{label}</p>
            <h3 className="text-[20px] font-light text-black">{value}</h3>
        </div>
    )
}

const ProductDetail = () => {
    const provider = useProvider({
        chainId: ChainId.GOERLI,
    })
    const router = useRouter()
    const {address} = router.query

    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState<IProduct | undefined>(undefined)

    /*useEffect(() => {
        (async () => {
            if (address && provider && typeof address === "string") {
                setIsLoading(true)
                try {
                    const _productInstance = new ethers.Contract(address, ProductABI, provider)
                    const _productStatus = await _productInstance.status()

                    if (_productStatus > 0) {
                        const currentCapacity = await _productInstance.currentCapacity()
                        const issuanceCycle = await _productInstance.issuanceCycle()

                        const _product: IProduct = {
                            name: await _productInstance.name(),
                            address: address,
                            underlying: await _productInstance.underlying(),
                            status: _productStatus,
                            maxCapacity: await _productInstance.maxCapacity(),
                            currentCapacity: ethers.utils.formatUnits(currentCapacity, 6),
                            issuanceCycle: {
                                coupon: issuanceCycle.coupon.toNumber(),
                                strikePrice1: issuanceCycle.strikePrice1.toNumber(),
                                strikePrice2: issuanceCycle.strikePrice2.toNumber(),
                                strikePrice3: issuanceCycle.strikePrice3.toNumber(),
                                strikePrice4: issuanceCycle.strikePrice4.toNumber(),
                                url: issuanceCycle.url,
                            }
                        }
                        setProduct(_product)
                    }
                } catch (e) {
                    console.error(e)
                } finally {
                    setIsLoading(false)
                }
            }
        })()
    }, [address, provider])*/

    const capacity = useMemo(() => {
        if (product) {
            return Number(ethers.utils.formatUnits(product.currentCapacity, 6))
        }
        return 0
    }, [product]);

    useEffect(() => {
        return () => {
            setIsLoading(true)
            getProduct(address as string).then((product) => {
                setProduct(product)
            }).finally(() => setIsLoading(false))
        };
    }, [address]);

    return (
        <div>
            <div className={'grid grid-cols-2 gap-12 px-12'}>
                <div>
                    {
                        isLoading &&
                        <SkeletonCard />
                    }
                    {
                        !isLoading && product &&
                        <div className="flex flex-col p-6">
                            <div>
                                <span className='inline-block text-white text-sm bg-[#68AC6F] p-2 rounded-lg'>{status[product.status]}</span>
                                <span className='inline-block text-white text-sm bg-[#7991DA] ml-3 p-2 rounded-lg'>Call-spread</span>
                            </div>
                            <div className={'flex justify-between items-end my-5'}>
                                <div className='flex flex-row'>
                                    <div className={'relative flex items-center mr-[40px]'}>
                                        <Image src='/usdc.svg' className='rounded-full' alt='Product Logo' width={60}
                                               height={60}/>
                                        <Image src='/ethereum.svg' className='rounded-full absolute left-[40px]'
                                               alt='Product Logo'
                                               width={60} height={60}/>
                                    </div>
                                    <div className='flex flex-col justify-around ml-3'>
                                        <h5 className="text-[44px] text-black">{product.underlying}</h5>
                                        <span className='text-[20px] font-light text-gray-700'>{product.name}</span>
                                    </div>
                                </div>
                                <div className={'flex flex-col items-center'}>
                                    <span className="d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">Estimated APY</span>
                                    <h3 className="font-medium leading-tight text-3xl text-black">7-15%</h3>
                                </div>
                            </div>
                            <div className={'flex flex-col flex-1'}>
                                <div className="flex justify-between my-1">
                                    <span className="text-sm text-gray-700">Amount deposited</span>
                                    <span
                                        className="text-sm text-gray-700">USDC {capacity.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-[#00000014] rounded my-1">
                                    <div className="bg-gray-600 h-2 rounded" style={{
                                        width: capacity / Number(product.maxCapacity) * 100 + '%',
                                        background: 'linear-gradient(267.56deg, #11CB79 14.55%, #11A692 68.45%, #002366 136.67%)'
                                    }}></div>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm text-gray-700">Max</span>
                                    <span
                                        className="text-sm text-gray-700">USDC {Number(product.maxCapacity.toString()).toLocaleString()}</span>
                                </div>
                            </div>

                            <div className={'text-[32px] text-[#161717] leading-[40px] mt-10'}>
                                Product Recap
                            </div>
                            <div className={'flex items-center justify-between space-x-2 mt-5'}>
                                <RecapCard label={'Investment Duration'} value={'30D'} />
                                <RecapCard label={'Coupon'} value={`${product.issuanceCycle.coupon / 100}% / WEEK`} />
                                <RecapCard label={'Principal Protection'} value={'100%'} />
                            </div>
                            <div className={'flex items-center justify-between space-x-2 mt-2'}>
                                <RecapCard label={'Strike 1 price'} value={`${(product.issuanceCycle.strikePrice1)}`} />
                                <RecapCard label={'Strike 2 price'} value={`${(product.issuanceCycle.strikePrice2)}`} />
                                <RecapCard label={'Strike 3 price'} value={`${(product.issuanceCycle.strikePrice3)}`} />
                                <RecapCard label={'Strike 4 price'} value={`${(product.issuanceCycle.strikePrice4)}`} />
                            </div>
                        </div>
                    }
                </div>
                <ActionArea productAddress={product ? product.address : ''} />
            </div>
        </div>
    )
}

export default ProductDetail
