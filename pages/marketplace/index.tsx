import {useState} from "react";
import {Tab} from "@headlessui/react";
import {classNames} from "../../styles/helper";
import {ProductCategoryList} from "../../types";
import MarketplaceList from "../../components/marketplace/List";
import {NFTItem} from "../../types/marketplace";

const underlyingList = ['ALL', 'ETH/USDC', 'BTC/USDC']

const mockData: Array<NFTItem> = [
    {
        id: 1,
        name: 'ETH/USDC',
        label: 'ETH Bullish Spread',
        currency1: '/currency/eth.svg',
        currency2: '/currency/usdc.svg',
        offer_price: 1809,
        mtm_price: 2809,
        total_lots: 23,
    },
    {
        id: 1,
        name: 'BTC/USDC',
        label: 'BTC Bullish Spread',
        currency1: '/currency/btc.svg',
        currency2: '/currency/usdc.svg',
        offer_price: 1609,
        mtm_price: 1800,
        total_lots: 34,
    },
    {
        id: 1,
        name: 'ETH/USDC',
        label: 'ETH Bearish Spread',
        currency1: '/currency/eth.svg',
        currency2: '/currency/usdc.svg',
        offer_price: 1800,
        mtm_price: 1900,
        total_lots: 57,
    },
    {
        id: 1,
        name: 'BTC/USDC',
        label: 'BTC Bearish Spread',
        currency1: '/currency/btc.svg',
        currency2: '/currency/usdc.svg',
        offer_price: 2005,
        mtm_price: 2100,
        total_lots: 18,
    },
    {
        id: 1,
        name: 'ETH/USDC',
        label: 'ETH Range Spread',
        currency1: '/currency/eth.svg',
        currency2: '/currency/usdc.svg',
        offer_price: 1509,
        mtm_price: 1609,
        total_lots: 20,
    },
    {
        id: 1,
        name: 'BTC/USDC',
        label: 'BTC Range Spread',
        currency1: '/currency/btc.svg',
        currency2: '/currency/usdc.svg',
        offer_price: 1950,
        mtm_price: 2000,
        total_lots: 80,
    }
]

const Marketplace = () => {
    const [items, setItems] = useState<Array<NFTItem>>(mockData)
    const [underlying, setUnderlying] = useState('ALL')
    const [category, setCategory] = useState('All')

    return (
        <div className={'py-10'}>
            <span className={'text-[44px] md:text-[68px] leading-[48px] md:leading-[76px] bg-primary-gradient bg-clip-text text-transparent'}>Marketplace</span>
            {
                items.length === 0 &&
                    <div className={'flex items-center justify-center py-[110px]'}>
                        <div className={'flex flex-col items-center space-y-5'}>
                            <img src={'/icons/noNFT.svg'} alt={'noNFT'} />
                            <span className={'text-[32px] leading-[40px] text-[#161717] text-center max-w-[450px]'}>There is no NFT Products for this time</span>
                            <span className={'text-[16px] leading-[24px] font-light text-center text-[#677079]'}>But you can place your Position from Portfolio as NFT</span>
                            <button className={'h-[50px] w-[300px] rounded-[8px] bg-[#292929] text-[#F8F8F8] text-[14px] leading-[14px]'}>LIST NFT</button>
                        </div>
                    </div>
            }
            {
                items.length > 0 &&
                <div className={'flex flex-col mt-4 md:mt-9'}>
                    <div className={'grid grid-cols-1 md:flex space-y-3 md:space-y-0 space-x-0 md:space-x-7'}>
                        <Tab.Group>
                            <Tab.List className="flex space-x-1 rounded-xl bg-[#EBEBEB] p-1">
                                {underlyingList.map((underlying, index) => (
                                    <Tab
                                        key={index}
                                        className={({ selected }) =>
                                            classNames(
                                                'w-[140px] rounded-lg py-2.5 text-sm font-medium leading-5 text-black',
                                                'focus:outline-none uppercase',
                                                selected
                                                    ? 'bg-white'
                                                    : ''
                                            )
                                        }
                                        onClick={() => setUnderlying(underlying)}
                                    >
                                        {underlying}
                                    </Tab>
                                ))}
                            </Tab.List>
                        </Tab.Group>
                        <Tab.Group>
                            <Tab.List className="flex space-x-1 rounded-xl bg-[#EBEBEB] p-1">
                                {ProductCategoryList.map((category, index) => (
                                    <Tab
                                        key={index}
                                        className={({ selected }) =>
                                            classNames(
                                                'w-[140px] rounded-lg py-2.5 text-sm font-medium leading-5 text-black',
                                                'focus:outline-none uppercase',
                                                selected
                                                    ? 'bg-white'
                                                    : ''
                                            )
                                        }
                                        onClick={() => setCategory(category)}
                                    >
                                        {category}
                                    </Tab>
                                ))}
                            </Tab.List>
                        </Tab.Group>
                    </div>

                    <MarketplaceList items={items} />
                </div>
            }
        </div>
    )
}

export default Marketplace
