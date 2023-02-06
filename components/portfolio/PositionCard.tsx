import Image from "next/image";
import {PrimaryButton} from "../basic";

export const PositionCard = () => {
    return (
        <>
            <div className="flex flex-col py-11 px-12 w-full bg-white rounded-[16px] mt-6">
                <div className={'flex justify-between items-start'}>
                    <div className='flex flex-row'>
                        <div className={'relative flex items-center mr-[40px]'}>
                            <Image src={'/currency/usdc.svg'} className='rounded-full' alt='Product Logo' width={60}
                                   height={60}/>
                            <Image src={'/currency/eth.svg'} className='rounded-full absolute left-[40px]'
                                   alt='Product Logo'
                                   width={60} height={60}/>
                        </div>
                        <div className='flex flex-col justify-around ml-3'>
                            <h5 className="text-[44px] leading-[44px] text-black">{'ETH/USDC'}</h5>
                            <span className='text-[20px] font-light text-gray-700'>{'ETH Bullish Spread'}</span>
                        </div>
                    </div>
                    <div className={'flex flex-col items-center'}>
                        <span className="d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">Estimated APY</span>
                        <span className="font-medium leading-tight text-3xl text-transparent bg-primary-gradient bg-clip-text">22-34%</span>
                    </div>
                </div>

                <div className='flex flex-col flex-1 items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4 mt-6'>
                    <p className="text-[12px] font-light text-gray-700">Principal Amount</p>
                    <h3 className="text-[20px] font-light text-black">
                        <span className={'bg-primary-gradient bg-clip-text text-transparent'}>USDC 6,600</span>
                        <span>(3 Lots)</span>
                    </h3>
                </div>

                <div className={'mt-6'}>
                    <img src={'/portfolio/position_timeline.svg'} width={'100%'} />
                </div>

                <PrimaryButton label={'SEE DETAILS'} className={'mt-6'} />
            </div>

            <div className={'mt-6'}>
                <img src={'/products/default_nft_image.png'} width={'100%'} />
            </div>
        </>
    )
}
