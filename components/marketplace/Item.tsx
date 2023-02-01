import Image from "next/image";
import {NFTItem} from "../../types/marketplace";
import {PrimaryButton} from "../basic";

const MarketplaceItem = ({ item }: {item: NFTItem}) => {
    return (
        <div className={'flex flex-col p-6 md:py-11 md:px-12 rounded-[16px] bg-white'}>
            <div className={'flex items-center space-x-2'}>
                <div className={'relative flex items-center mr-[10px]'}>
                    <Image src={item.currency1.toLowerCase()} className='rounded-full' alt='Product Logo' width={20} height={20}/>
                    <Image src={item.currency2.toLowerCase()} className='rounded-full absolute left-[10px]' alt='Product Logo'
                           width={20} height={20}/>
                </div>
                <span className={'text-grey-70 text-[20px]'}>{item.name}</span>
            </div>

            <span className={'text-blacknew-100 text-[32px] leading-[40px] mt-3'}>{item.label}</span>

            <div className={'mt-2 py-3 px-4 w-full rounded-lg bg-[rgba(0,0,0,0.04)] flex flex-col items-center justify-center space-y-2'}>
                <span className={'text-grey-70 text-[12px] leading-[12px]'}>Best Offer Price</span>
                <div className={'flex items-center text-[16px] leading-[16px] space-x-2 uppercase'}>
                    <span className={'bg-primary-gradient bg-clip-text text-transparent'}>{item.offer_price.toLocaleString()} USDC</span>
                    <span className={'text-blacknew-100'}>(3 LOTS)</span>
                </div>
            </div>

            <div className={'mt-3 flex items-center space-x-3'}>
                <div className={'flex flex-1'}>
                    <div className={'py-3 px-4 w-full rounded-lg bg-[rgba(0,0,0,0.04)] flex flex-col items-center justify-center space-y-2'}>
                        <span className={'text-grey-70 text-[12px] leading-[12px]'}>MTM Price</span>
                        <div className={'flex items-center text-[16px] leading-[16px] space-x-2 uppercase'}>
                            <span className={'text-blacknew-100'}>{item.mtm_price.toLocaleString()} USDC</span>
                        </div>
                    </div>
                </div>
                <div className={'flex flex-1'}>
                    <div className={'py-3 px-4 w-full rounded-lg bg-[rgba(0,0,0,0.04)] flex flex-col items-center justify-center space-y-2'}>
                        <span className={'text-grey-70 text-[12px] leading-[12px]'}>Total Lots</span>
                        <div className={'flex items-center text-[16px] leading-[16px] space-x-2 uppercase'}>
                            <span className={'text-blacknew-100'}>{item.total_lots.toLocaleString()} USDC</span>
                        </div>
                    </div>
                </div>
            </div>

            <PrimaryButton label={'Buy Now'} className={'mt-4 uppercase'}/>
        </div>
    )
}

export default MarketplaceItem
