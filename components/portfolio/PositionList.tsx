import Image from "next/image";
import {ParaLight16, PrimaryButton, TitleH5} from "../basic";

export const PortfolioPositionList = () => {
    return (
        <div className={'py-12 px-[112px] flex flex-col items-center bg-white rounded-lg'}>
            <Image src={'/portfolio/no_positions.svg'} alt={'no_positions'} width={48} height={48} />
            <TitleH5 className={'text-center mt-5'}>You don`t have Position to List.</TitleH5>
            <ParaLight16 className={'text-grey-70 text-center mt-3'}>Each Product is the actually minted in a form of NFT, so you can do P2P trading of the Products owned. Buy Products first to be able list your NFT</ParaLight16>
            <PrimaryButton label={'BUY PRODUCT'} className={'mt-5 max-w-[300px] uppercase'} />
        </div>
    )
}
