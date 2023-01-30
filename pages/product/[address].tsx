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
import {ProductSpreads, ProductStatus} from "../../types";

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

    const capacity = useMemo(() => {
        if (product) {
            return Number(ethers.utils.formatUnits(product.currentCapacity, 6))
        }
        return 0
    }, [product]);

    const currency1 = useMemo(() => {
        if (product) {
            return '/currency/' + product.underlying.split('/')[1] + '.svg'
        }
        return '/currency/usdc.svg'
    }, [product]);

    const currency2 = useMemo(() => {
        if (product) {
            return '/currency/' + product.underlying.split('/')[0] + '.svg'
        }
        return '/currency/eth.svg'
    }, [product]);

    const categoryIndex = useMemo(() => {
        if (product && product.name.toLowerCase().includes('bullish')) {
            return 0
        } else if (product && product.name.toLowerCase().includes('bearish')) {
            return 1
        } else if (product && product.name.toLowerCase().includes('range')) {
            return 2
        }
        return -1
    }, [product])

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
                                <span
                                    className={`inline-block text-white text-sm py-2 px-3 rounded-lg ${ProductStatus[product.status].className}`}>{ProductStatus[product.status].label}</span>
                                {
                                    categoryIndex >= 0 &&
                                    <span className={`inline-block text-white text-sm ml-3 px-4 py-2 rounded-lg ${ProductSpreads[categoryIndex].className}`}>{ProductSpreads[categoryIndex].label}</span>
                                }
                            </div>
                            <div className={'flex justify-between items-end my-5'}>
                                <div className='flex flex-row'>
                                    <div className={'relative flex items-center mr-[40px]'}>
                                        <Image src={currency1.toLowerCase()} className='rounded-full' alt='Product Logo' width={60}
                                               height={60}/>
                                        <Image src={currency2.toLowerCase()} className='rounded-full absolute left-[40px]'
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
