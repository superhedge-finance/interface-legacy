import Image from "next/image";
import {PrimaryButton, TitleH5} from "../basic";

export const PortfolioTransactionHistory = () => {
    return (
        <div>
            <div className={'py-12 px-[112px] flex flex-col items-center bg-white rounded-lg'}>
                <Image src={'/icons/wallet.svg'} alt={'wallet'} width={48} height={48} />
                <TitleH5 className={'text-center mt-5'}>Please connect your Wallet to view Transaction History.</TitleH5>
                <PrimaryButton label={'Connect Wallet'} className={'mt-5 max-w-[300px] uppercase'} />
            </div>
        </div>
    )
}
