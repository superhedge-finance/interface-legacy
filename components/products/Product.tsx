import Image from 'next/image';
import Link from "next/link";
import {useMemo} from "react";
import {ethers} from "ethers";
import {ProductSpreads, ProductStatus, IProduct} from "../../types";
import {ReturnsChart} from "../product/ReturnsChart";

export default function Product({product}: { product: IProduct }) {
    const capacity = useMemo(() => {
        return Number(ethers.utils.formatUnits(product.currentCapacity, 6))
    }, [product]);

    const categoryIndex = useMemo(() => {
        if (product.name.toLowerCase().includes('bullish')) {
            return 0
        } else if (product.name.toLowerCase().includes('bearish')) {
            return 1
        } else if (product.name.toLowerCase().includes('range')) {
            return 2
        }
        return -1
    }, [product])

    const currency1 = useMemo(() => {
        return '/currency/' + product.underlying.split('/')[1] + '.svg'
    }, [product]);

    const currency2 = useMemo(() => {
        return '/currency/' + product.underlying.split('/')[0] + '.svg'
    }, [product]);

    const issuance_date = useMemo(() => {
        const issuanceDate = new Date(product.issuanceCycle.issuanceDate * 1000).getTime()
        const currentDate = new Date().getTime()
        const diffInMilliseconds = issuanceDate - currentDate;
        const diffInSeconds = diffInMilliseconds / 1000;
        const diffInMinutes = diffInSeconds / 60;
        const diffInHours = diffInMinutes / 60;
        const hours = Math.floor(diffInHours);
        const minutes = Math.floor((diffInHours - hours) * 60);
        const seconds = Math.floor((diffInMinutes - Math.floor(diffInMinutes)) * 60);

        return `${hours}H : ${minutes}M : ${seconds}S`
    }, [product]);

    return (
        <div className="flex flex-col py-11 px-12 rounded-[16px] bg-white">
            <div className={'flex justify-between'}>
                <div className={'inline-block'}>
                    <span
                    className={`text-white text-sm py-2 px-3 rounded-lg ${ProductStatus[product.status].className}`}>{ProductStatus[product.status].label}</span>
                    {
                        categoryIndex >= 0 &&
                        <span
                            className={`text-white text-sm ml-3 px-4 py-2 rounded-lg ${ProductSpreads[categoryIndex].className}`}>{ProductSpreads[categoryIndex].label}</span>
                    }
                </div>
                <Image src={'/icons/social_logo.svg'} alt={'social logo'} width={80} height={72} />
            </div>
            <div className='my-5 flex flex-row'>
                <div className={'relative flex items-center mr-[40px]'}>
                    <Image src={currency1.toLowerCase()} className='rounded-full' alt='Product Logo' width={60} height={60}/>
                    <Image src={currency2.toLowerCase()} className='rounded-full absolute left-[40px]' alt='Product Logo'
                           width={60} height={60}/>
                </div>
                <div className='flex flex-col justify-around ml-3'>
                    <h5 className="text-xl tracking-tight text-black">{product.underlying}</h5>
                    <span className='text-sm text-gray-700'>{product.name}</span>
                </div>
            </div>
            <div className={'flex justify-between items-center space-x-12'}>
                <div className={'flex flex-col flex-1'}>
                    <div className="flex justify-between my-1">
                        <span className="text-sm text-gray-700">Amount deposited</span>
                        <span className="text-sm text-gray-700">USDC {capacity.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-[#00000014] rounded my-1">
                        <div className="bg-gray-600 h-2 rounded" style={{
                            width: capacity / Number(product.maxCapacity) * 100 + '%',
                            background: 'linear-gradient(267.56deg, #11CB79 14.55%, #11A692 68.45%, #002366 136.67%)'
                        }}></div>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-700">Max</span>
                        <span className="text-sm text-gray-700">USDC {Number(product.maxCapacity.toString()).toLocaleString()}</span>
                    </div>
                </div>
                <div className={'flex flex-col items-center'}>
                    <span className="d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">Estimated APY</span>
                    <h3 className="font-medium leading-tight text-3xl bg-clip-text text-transparent bg-primary-gradient">{product.issuanceCycle.apy}</h3>
                </div>
            </div>

            <div>
                <ReturnsChart
                    strikePrice1={product.issuanceCycle.strikePrice1}
                    strikePrice2={product.issuanceCycle.strikePrice2}
                    tr1={product.issuanceCycle.tr1}
                    tr2={product.issuanceCycle.tr2}
                />
            </div>

            <div className={'flex items-center justify-between mt-5'}>
                <div className='flex flex-col items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4'>
                    <p className="text-[12px] font-light text-gray-700">Issuance date</p>
                    <h3 className="text-[20px] font-light text-black">{issuance_date}</h3>
                </div>
                <div className='flex flex-col items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4'>
                    <span className="text-[12px] font-light text-gray-700">Investment Duration</span>
                    <span className="text-[20px] font-light text-black">30D</span>
                </div>
                <div className='flex flex-col items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4'>
                    <span className="text-[12px] font-light text-gray-700">Principal Protection</span>
                    <span className="text-[20px] font-light text-black">100%</span>
                </div>
            </div>
            <Link href={`/product/${product.address}`}>
                <div className="py-3 px-5 text-base font-medium rounded-lg text-white focus:outline-none bg-black hover:bg-gray-600 focus:z-10 focus:ring-4 focus:ring-gray-200 flex items-center justify-center cursor-pointer mt-8">
                    Info
                </div>
            </Link>
        </div>
    )
}
