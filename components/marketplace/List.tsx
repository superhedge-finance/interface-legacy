import {NFTItem} from "../../types";
import MarketplaceItem from "./Item";
import MultiRangeSlider from "../commons/multiRangeSlider";

const MarketplaceList = ({ items }: { items: Array<NFTItem>}) => {
    return (
        <div className={'flex flex-col pt-12'}>
            <div className={'flex flex-col md:flex-row items-center space-x-0 md:space-x-8 space-y-[60px] md:space-y-0'}>
                <div className={'flex items-center space-x-2'}>
                    <span className={'uppercase text-grey-60 text-[16px]'}>Price(USDC)</span>
                    <MultiRangeSlider min={1000} max={25000} step={1} leftDesc={'min. 1000 USDC'} rightDesc={'max. 25,000 USDC'} onChange={({min, max}) => console.log(min, max)} />
                </div>
                <div className={'flex items-center space-x-2'}>
                    <span className={'uppercase text-grey-60 text-[16px]'}>COUPON</span>
                    <MultiRangeSlider min={100} max={1200} step={1000} leftDesc={'min. 0.1%'} rightDesc={'max. 1.2%'} unit={'%'} onChange={({min, max}) => console.log(min, max)} />
                </div>
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-3 mt-12 gap-x-0 md:gap-x-5 gap-y-5 md:gap-y-8'}>
                {
                    items.map((item, index) => (
                        <MarketplaceItem item={item} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}

export default MarketplaceList
