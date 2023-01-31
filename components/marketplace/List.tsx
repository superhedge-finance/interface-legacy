import {NFTItem} from "../../types/marketplace";
import MarketplaceItem from "./Item";
import MultiRangeSlider from "../commons/multiRangeSlider";

const MarketplaceList = ({ items }: { items: Array<NFTItem>}) => {
    return (
        <div className={'flex flex-col pt-8'}>
            <div className={'flex items-center space-x-8'}>
                <div className={'flex items-center space-x-2'}>
                    <span className={'uppercase text-grey-60 text-[16px]'}>Price(USDC)</span>
                    <MultiRangeSlider min={0} max={1000} onChange={({min, max}) => console.log(min, max)} />
                </div>
                <div className={'flex items-center space-x-2'}>
                    <span className={'uppercase text-grey-60 text-[16px]'}>COUPON</span>
                    <MultiRangeSlider min={0} max={1000} onChange={({min, max}) => console.log(min, max)} />
                </div>
            </div>
            <div className={'grid grid-cols-3 mt-10 gap-x-5 gap-y-8'}>
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
