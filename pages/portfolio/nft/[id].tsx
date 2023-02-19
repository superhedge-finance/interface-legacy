import {useEffect, useState} from "react";
import Image from "next/image";
import {TitleH2, TitleH3} from "../../../components/basic";
import {RecapCard} from "../../../components/commons/RecapCard";
import {mockData, NFTItem} from "../../../types";

const PortfolioNFTDetails = () => {
    const [item, setItem] = useState<NFTItem>()

    useEffect(() => {
        const nft = mockData.find((item) => item.id === 1)
        setItem(nft)
    }, [])

    return (
        <div className={'py-[80px] flex justify-center'}>
            <div className={'max-w-[650px] w-full'}>
                {
                    item &&
                    <div className={'flex flex-col items-center w-full'}>
                        <div className={'flex items-center w-full justify-between'}>
                            <TitleH2>
                                <span className={'bg-clip-text text-transparent bg-primary-gradient'}>Listed NFT details</span>
                            </TitleH2>

                            <div className={'flex items-center space-x-3'}>
                                <Image src={'/icons/edit.svg'} alt={'edit'} width={28} height={28} />
                                <Image src={'/icons/delete.svg'} alt={'delete'} width={28} height={28} />
                            </div>
                        </div>

                        <div className={'flex justify-between w-full mt-12 items-end'}>
                            <div className='flex flex-row'>
                                <div className={'relative flex items-center mr-[40px]'}>
                                    <Image
                                        src={item.currency2}
                                        className='rounded-full'
                                        alt='Product Logo'
                                        width={60}
                                        height={60}
                                    />
                                    <Image
                                        src={item.currency1}
                                        className='rounded-full absolute left-[40px]'
                                        alt='Product Logo'
                                        width={60}
                                        height={60}
                                    />
                                </div>
                                <div className='flex flex-col justify-around ml-3'>
                                    <h5 className="text-[44px] text-black">{item.name}</h5>
                                    <span className='text-[20px] font-light text-gray-700'>{item.label}</span>
                                </div>
                            </div>
                            <div className={'flex flex-col items-center'}>
                                <span className="d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">Estimated APY</span>
                                <span
                                    className="font-medium leading-tight text-3xl text-transparent bg-primary-gradient bg-clip-text">7-15%</span>
                            </div>
                        </div>

                        <div className={'flex items-center w-full mt-12 space-x-4'}>
                            <RecapCard label={'Price'} value={'1,010 USDC'} />
                            <RecapCard label={'Product Lots'} value={'23 LOTS'} />
                            <RecapCard label={'Market Price'} value={'1,100 USDC'} />
                        </div>

                        <div className={'w-full mt-[80px]'}>`
                            <TitleH3>Product Recap</TitleH3>
                            <div className={'flex items-center justify-between space-x-2 mt-5'}>
                                <RecapCard label={'Offer valid until'} value={`21.12.2022`} />
                                <RecapCard label={'Coupon'} value={`0.10 % / WEEK`} />
                                <RecapCard label={'Username'} value={'0xa377...CCA5'} />
                            </div>
                            <div className={'flex items-center justify-between space-x-2 mt-2'}>
                                <RecapCard label={'Strike 1 price'} value={`125%`} />
                                <RecapCard label={'Strike 2 price'} value={`145%`} />
                                <RecapCard label={'Strike 3 price'} value={`135%`} />
                                <RecapCard label={'Strike 4 price'} value={`155%`} />
                            </div>
                        </div>

                        <div className={'mt-[80px] w-full flex flex-col space-y-5'}>
                            <TitleH3>Product Lifecycle</TitleH3>
                            <img src={'/portfolio/product_lifecycle.svg'} alt={'lifecycle'} width={'100%'} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PortfolioNFTDetails
