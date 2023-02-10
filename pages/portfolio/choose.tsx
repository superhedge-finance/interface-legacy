import {ParaLight16, TitleH2} from "../../components/basic";
import PortfolioNFTCard from "../../components/portfolio/NFTCard";
import {IProduct} from "../../types";

const products = [
    {
        name: 'ETH Bullish Spread',
        underlying: 'ETH/USDC',
        issuanceCycle: {
            apy: '22-34%',
        }
    } as IProduct,
    {
        name: 'BTC Bullish Spread',
        underlying: 'BTC/USDC',
        issuanceCycle: {
            apy: '34-44%',
        }
    } as IProduct,
    {
        name: 'ETH Range Spread',
        underlying: 'ETH/USDC',
        issuanceCycle: {
            apy: '10-22%',
        }
    } as IProduct,
]

const PortfolioNFTList = () => {
    return (
        <div className={'py-[80px] flex justify-center'}>
            <div className={'max-w-[650px] w-full'}>
                <div className={'flex flex-col items-center w-full'}>
                    <div className={'flex flex-col w-full space-y-3'}>
                        <TitleH2 className={'bg-primary-gradient bg-clip-text text-transparent'}>Choose NFT to List</TitleH2>
                        <ParaLight16>Each Product is the actually minted in a form of NFT, so you can do P2P trading of the Products owned. Just list your NFT on Marketplace.</ParaLight16>
                    </div>

                    <div className={'w-full mt-5 space-y-5'}>
                        {
                            products.map((product, index) => (
                                <PortfolioNFTCard product={product} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioNFTList
