
const Marketplace = () => {
    return (
        <div>
            <span className={'text-[68px] leading-[76px] bg-primary-gradient bg-clip-text text-transparent'} style={{ background: 'linear-gradient(267.79deg, #11CB79 42.5%, #11A692 67.51%, #002366 99.18%), #161717', WebkitBackgroundClip: 'text'}}>Marketplace</span>
            <div className={'flex items-center justify-center py-[110px]'}>
                <div className={'flex flex-col items-center space-y-5'}>
                    <img src={'/icons/noNFT.svg'} alt={'noNFT'} />
                    <span className={'text-[32px] leading-[40px] text-[#161717] text-center max-w-[450px]'}>There is no NFT Products for this time</span>
                    <span className={'text-[16px] leading-[24px] font-light text-center text-[#677079]'}>But you can place your Position from Portfolio as NFT</span>
                    <button className={'h-[50px] w-[300px] rounded-[8px] bg-[#292929] text-[#F8F8F8] text-[14px] leading-[14px]'}>LIST NFT</button>
                </div>
            </div>
        </div>
    )
}

export default Marketplace