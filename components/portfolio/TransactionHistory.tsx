import Image from "next/image";
import {useAccount} from "wagmi";
import {useConnectModal} from "@rainbow-me/rainbowkit";
import {ParaLight16, PrimaryButton, TitleH5} from "../basic";
import {TransactionCard, TransactionHeader} from "./TransactionCard";
import {useEffect, useState} from "react";
import {getHistory, getPosition} from "../../service";
import {History} from "../../types";

const ConnectWalletCard = ({ onConnect }: { onConnect: () => void }) => {
    return (
        <div className={'py-12 px-[112px] flex flex-col items-center bg-white rounded-lg'}>
            <Image src={'/icons/wallet.svg'} alt={'wallet'} width={48} height={48} />
            <TitleH5 className={'text-center mt-5'}>Please connect your Wallet to view Transaction History.</TitleH5>
            <PrimaryButton label={'Connect Wallet'} className={'mt-5 max-w-[300px] uppercase'} onClick={onConnect} />
        </div>
    )
}

const NoTransactionCard = () => {
    return (
        <div className={'py-12 px-[112px] flex flex-col items-center bg-white rounded-lg'}>
            <Image src={'/portfolio/no_positions.svg'} alt={'no_positions'} width={48} height={48} />
            <TitleH5 className={'text-center mt-5'}>You have not yet had a Transaction.</TitleH5>
            <ParaLight16 className={'text-grey-70 mt-3'}>To begin with, make a Deposit in Products</ParaLight16>
            <PrimaryButton label={'VIEW PRODUCTS'} className={'mt-5 max-w-[300px] uppercase'} />
        </div>
    )
}

export const PortfolioTransactionHistory = () => {
    const {address} = useAccount()
    const {openConnectModal} = useConnectModal()

    const [histories, setHistories] = useState<History[]>([])

    const onConnect = () => {
        if (!address && openConnectModal) {
            openConnectModal()
        }
    }

    useEffect(() => {
        (async () => {
            if (address) {
                // fetch histories
                const histories = await getHistory(address)
                setHistories(histories)
            }
        })()
    }, [address])

    return (
        <div>
            {
                !address &&
                    <ConnectWalletCard onConnect={onConnect} />
            }
            {
                address && histories.length === 0 &&
                    <NoTransactionCard />
            }
            {
                address && histories.length > 0 &&
                <div className={'bg-white py-[30px] px-5 rounded-lg'}>
                    <TransactionHeader />
                    {
                        histories.map((history, index) => {
                            return <TransactionCard
                                key={index}
                                history={history}
                                className={index % 2 === 0 ? 'bg-[#00000014]' : 'bg-white'}
                            />
                        })
                    }
                </div>
            }
        </div>
    )
}
