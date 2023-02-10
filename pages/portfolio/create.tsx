import {useState} from "react";
import {PrimaryButton, SecondaryButton, TitleH2} from "../../components/basic";

const PortfolioCreatePage = () => {
    const [lots, setLots] = useState(1)
    const [price, setPrice] = useState(0)
    const [offer, setOffer] = useState('')

    return (
        <div className={'py-[80px] flex justify-center'}>
            <div className={'max-w-[650px] w-full'}>
                <div className={'flex flex-col items-center w-full'}>
                    <div className={'w-full bg-black rounded-[16px]'}>
                        <div className={'pl-10 h-[150px] flex items-center pt-5'}>
                            <TitleH2 className={'text-white'}>Create NFT</TitleH2>
                        </div>
                        <img src={'/products/default_nft_image.png'} width={'100%'} />s
                    </div>

                    <div className={'w-full flex flex-col space-y-6 bg-white rounded-[16px] p-12 mt-5'}>
                        <div className={'flex flex-col space-y-2'}>
                            <div className={'text-[#494D51] text-[16px]'}>
                                Product lots
                            </div>

                            <div className={'relative flex items-center'}>
                                <input
                                    className={'w-full py-3 px-4 bg-[#FBFBFB] border border-[1px] border-[#E6E6E6] rounded focus:outline-none'}
                                    value={lots} onChange={(e) => setLots(Number(e.target.value))} type="text"/>
                                <div className={'absolute right-4 flex items-center space-x-[10px]'}>
                                    <span className={'bg-grey-20 flex items-center justify-center px-3 h-[28px] w-[105px] rounded-[6px] text-[12px] leading-[12px]'}>MIN</span>
                                    <span className={'bg-grey-20 flex items-center justify-center px-3 h-[28px] w-[180px] rounded-[6px] text-[12px] leading-[12px]'}>MAX</span>
                                </div>
                            </div>
                        </div>
                        <div className={'flex flex-col space-y-2'}>
                            <div className={'text-[#494D51] text-[16px]'}>
                                NFT Price (USDC)
                            </div>

                            <div className={'relative flex items-center'}>
                                <input
                                    className={'w-full py-3 px-4 bg-[#FBFBFB] border border-[1px] border-[#E6E6E6] rounded focus:outline-none'}
                                    value={price} onChange={(e) => setPrice(Number(e.target.value))} type="text"/>
                                <span className={'absolute right-4 text-[#828A93]'}>Lots</span>
                            </div>

                            <div className={'rounded-[6px] bg-warning h-[32px] flex items-center justify-center px-3 text-[12px] leading-[12px] text-white'} style={{inlineSize: 'fit-content'}}>
                                Market Price - 10,500 USDC - 10 Lots
                            </div>
                        </div>
                        <div className={'flex flex-col space-y-2'}>
                            <div className={'text-[#494D51] text-[16px]'}>
                                Offer Valid Until (GTC)
                            </div>

                            <div className={'relative flex items-center'}>
                                <input
                                    className={'w-full py-3 px-4 bg-[#FBFBFB] border border-[1px] border-[#E6E6E6] rounded focus:outline-none'}
                                    value={offer} onChange={(e) => setOffer(e.target.value)} type="text" placeholder={'12.12.2022'}/>
                                <span className={'absolute right-4 text-[#828A93]'}>
                                    <img src={'/icons/calendar.svg'} alt={'calendar'} />
                                </span>
                            </div>
                        </div>

                        <div className={'flex items-center space-x-6'}>
                            <SecondaryButton label={'CANCEL'} />
                            <PrimaryButton label={'LIST NFT'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioCreatePage
