import Image from 'next/image';
import Link from "next/link";
import {useMemo} from "react";
import {ethers} from "ethers";
import {ProductSpreads, ProductStatus, IProduct} from "../../types";
import {ReturnsChart} from "../product/ReturnsChart";
import {getCurrencyIcon} from "../../utils/helpers";
import {RecapCard} from "../commons/RecapCard";
import {SubtitleRegular20, TitleH2} from "../basic";

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

    const { currency1, currency2 } = getCurrencyIcon(product.underlying)

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

    const investment_duration = useMemo(() => {
        if (product) {
            return Math.floor((product.issuanceCycle.maturityDate - product.issuanceCycle.issuanceDate) / 3600 / 24) + 'D'
        }
        return '0D'
    }, [product]);

    return (
        <div className="flex flex-col p-6 md:py-11 md:px-12 rounded-[12px] md:rounded-[16px] bg-white">
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
                <div className={'w-[46px] md:w-[80px] h-[41px] md:h-[72px]'}>
                    <img src={'/icons/social_logo.svg'} alt={'social logo'} width={'100%'} height={'100% '} />
                </div>
            </div>
            <div className='my-5 flex flex-row'>
                <div className={'relative flex items-center mr-[40px]'}>
                    <img src={currency1} className='rounded-full w-[40px] md:w-[60px] h-[40px] md:h-[60px]' alt='Product Logo' width={'100%'} height={'100%'}/>
                    <img src={currency2} className='rounded-full w-[40px] md:w-[60px] h-[40px] md:h-[60px] absolute left-[30px] md:left-[40px]' alt='Product Logo'
                           width={'100%'} height={'100%'}/>
                </div>
                <div className='flex flex-col justify-around ml-3'>
                    <TitleH2 className="text-black">{product.underlying}</TitleH2>
                    <SubtitleRegular20>{product.name}</SubtitleRegular20>
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
                <div className={'hidden md:flex flex-col items-center'}>
                    <span className="d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">Estimated APY</span>
                    <h3 className="font-medium leading-tight text-3xl bg-clip-text text-transparent bg-primary-gradient">{product.issuanceCycle.apy}</h3>
                </div>
            </div>
            <div className={'block md:hidden'}>
                <RecapCard label={'Estimated APY'} value={product.issuanceCycle.apy} />
            </div>

            <div>
                <ReturnsChart
                    strikePrice1={product.issuanceCycle.strikePrice1}
                    strikePrice2={product.issuanceCycle.strikePrice2}
                    strikePrice3={product.issuanceCycle.strikePrice3}
                    tr1={product.issuanceCycle.tr1}
                    tr2={product.issuanceCycle.tr2}
                />
            </div>

            <div className={'flex-col md:flex-row md:flex space-y-3 md:space-y-0 items-center justify-between mt-5'}>
                <div className='flex md:flex-col items-center justify-between bg-[#0000000a] h-[40px] md:h-[66px] rounded-[7px] py-3 px-4'>
                    <p className="text-[16px] md:text-[12px] font-light text-gray-700">Issuance date</p>
                    <h3 className="text-[16px] md:text-[20px] font-light text-black">{issuance_date}</h3>
                </div>
                <div className='flex md:flex-col items-center justify-between bg-[#0000000a] h-[40px] md:h-[66px] rounded-[7px] py-3 px-4'>
                    <span className="text-[16px] md:text-[12px] font-light text-gray-700">Investment Duration</span>
                    <span className="text-[16px] md:text-[20px] font-light text-black">{investment_duration}</span>
                </div>
                <div className='flex md:flex-col items-center justify-between bg-[#0000000a] h-[40px] md:h-[66px] rounded-[7px] py-3 px-4'>
                    <span className="text-[16px] md:text-[12px] font-light text-gray-700">Principal Protection</span>
                    <span className="text-[16px] md:text-[20px] font-light text-black">100%</span>
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
