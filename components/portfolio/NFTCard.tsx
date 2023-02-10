import {useState} from "react";
import Image from "next/image";
import {IProduct} from "../../types";
import {getCurrencyIcon} from "../../utils/helpers";
import {RecapCard} from "../commons/RecapCard";
import {useRouter} from "next/router";

const PortfolioNFTCard = ({ product }: { product: IProduct }) => {
    const Router = useRouter()

    const { currency1, currency2 } = getCurrencyIcon(product.underlying)
    const [hover, setHover] = useState(false)

    return (
        <div className={`flex flex-col space-y-6 p-6 md:py-11 md:px-12 rounded-[16px] bg-white cursor-pointer ${hover ? 'gradient-border' : ''}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => Router.push('/portfolio/create')}>
            <div className={'flex justify-between items-start'}>
                <div className='flex flex-row'>
                    <div className={'relative flex items-center mr-[40px]'}>
                        <Image src={currency1} className='rounded-full' alt='Product Logo' width={60}
                               height={60}/>
                        <Image src={currency2} className='rounded-full absolute left-[40px]'
                               alt='Product Logo'
                               width={60} height={60}/>
                    </div>
                    <div className='flex flex-col justify-around ml-3'>
                        <h5 className="text-[44px] leading-[44px] text-black">{product.underlying}</h5>
                        <span className='text-[20px] font-light text-gray-700'>{product.name}</span>
                    </div>
                </div>
                <div className={'flex flex-col items-center'}>
                    <span className="d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400">Estimated APY</span>
                    <span className="font-medium leading-tight text-3xl text-transparent bg-primary-gradient bg-clip-text">{product.issuanceCycle.apy}</span>
                </div>
            </div>

            <RecapCard label={'Principal Amount'} value={'USDC 6,600 (3 Lots)'} />

            <img src={'/portfolio/position_timeline.svg'} width={'100%'} />
        </div>
    )
}

export default PortfolioNFTCard
