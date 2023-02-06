import Image from "next/image";

export const TransactionHeader = () => {
    return (
        <div className={'py-3 px-6 h-[40px] grid grid-cols-5 rounded-[6px]'}>
            <span className={'text-grey-70 text-[12px] leading-[16px]'}>Transaction type</span>
            <span className={'text-[12px] leading-[16px] text-grey-70'}>Product name</span>
            <span className={'text-[12px] leading-[16px] text-grey-70'}>Date</span>
            <span className={'text-[12px] leading-[16px] text-grey-70'}>Action</span>
            <span className={'text-[12px] leading-[16px] text-grey-70'}>Amount</span>
        </div>
    )
}

export const TransactionCard = ({ className }: { className: string }) => {
    return (
        <div className={`py-3 px-6 h-[40px] grid grid-cols-5 rounded-[6px] ${className ?? ''}`}>
            <div className={'flex items-center space-x-2'}>
                <Image src={'/portfolio/withdraw_icon.svg'} alt={'withdraw icon'} width={16} height={16} />
                <span className={'bg-clip-text text-transparent bg-primary-gradient text-[12px] leading-[16px]'}>Withdraw</span>
            </div>
            <span className={'text-[12px] leading-[16px] text-grey-70'}>ETH Bullish Spread</span>
            <span className={'text-[12px] leading-[16px] text-grey-70'}>22 Nov</span>
            <span className={'text-[12px] leading-[16px] text-blacknew-100'}>Withdrawed</span>
            <span className={'text-[12px] leading-[16px] text-blacknew-100'}>5,000 USD</span>
        </div>
    )
}
