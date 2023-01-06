import {useState} from "react";
import {useConnectModal} from "@rainbow-me/rainbowkit";
import {useAccount} from "wagmi";
import {PrimaryButton} from "../basic";
import Image from "next/image";

export const ActionArea = ({ productAddress }: {productAddress: string}) => {
    const [tab, setTab] = useState(0);
    const {address} = useAccount()
    const {openConnectModal} = useConnectModal()

    const onConnect = () => {
        if (!address && openConnectModal) {
            openConnectModal()
        }
    }

    const onDeposit = () => {
    }

    const onWithdraw = () => {
    }

    return (
        <div
            className={`bg-white py-[60px] px-[84px] rounded flex flex-col ${!address ? 'justify-between space-y-[100px]' : ''}`}>
            <div className={'p-1 flex items-center bg-[#EBEBEB] rounded-[6px] h-[38px]'}>
                <div
                    className={`${tab === 0 ? 'bg-white' : 'bg-transparent'} cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center`}
                    onClick={() => setTab(0)}>
                    DEPOSIT
                </div>
                <div
                    className={`${tab === 1 ? 'bg-white' : 'bg-transparent'} cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center`}
                    onClick={() => setTab(1)}>
                    WITHDRAW
                </div>
            </div>

            {
                !address &&
                <div
                    className={'text-[#161717] text-[18px] leading-[24px] px-10 flex items-center justify-between text-center'}>
                    Please Connect your Wallet to have access to our Products.
                </div>
            }

            <div className={'bg-[#EBEBEB] rounded-[6px] p-5 flex flex-col items-center mt-10'}>
                <div className={'flex items-center'}>
                    <span className={'text-[#677079] text-[16px] font-light'}>Current Deposit</span>
                </div>
                <div
                    className={'flex items-center mt-2 py-[10px] text-[12px] px-3 rounded-[6px] bg-[#E89D45] justify-center text-white'}>
                    You have no Deposit
                </div>
            </div>

            <div className={'mt-8 text-[#494D51] text-[16px]'}>
                No of lots
            </div>

            <div
                className={'mt-2 py-3 px-4 bg-[#FBFBFB] border border-[1px] border-[#E6E6E6] rounded flex items-center justify-between'}>
                <span>5</span>
                <span>Lots</span>
            </div>

            <div className={'mt-3 flex justify-between items-center text-[#828A93]'}>
                <div className={'flex items-center'}>
                    <Image src={'/miniUSDC.svg'} alt={'miniUSDC'} width={20} height={20}/>
                    <span className={'ml-2'}>10,000 USDC</span>
                </div>
                <div className={'flex items-center'}>
                    <span className={'mr-2'}>1 lot -</span>
                    <Image src={'/miniUSDC.svg'} alt={'miniUSDC'} width={20} height={20}/>
                    <span className={'ml-2'}>2,000 USDC</span>
                </div>
            </div>

            <div className={'mt-5 grid grid-cols-5 gap-2'}>
                <div className={'bg-[#FBFBFB] flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]'}>
                    MIN
                </div>
                <div className={'bg-[#FBFBFB] flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]'}>
                    5 LOTS
                </div>
                <div className={'bg-[#FBFBFB] flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]'}>
                    10 LOTS
                </div>
                <div className={'bg-[#FBFBFB] flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]'}>
                    100 LOTS
                </div>
                <div className={'bg-[#FBFBFB] flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]'}>
                    MAX
                </div>
            </div>

            <div className={'mt-7'}>
                <PrimaryButton label={tab === 0 ? 'DEPOSIT' : 'WITHDRAW'} onClick={tab === 0 ? onDeposit : onWithdraw}/>
            </div>

            <div className={'mt-7 flex items-center justify-center'}>
                <span className={'text-[#677079]'}>Contract:</span>
                <span>{productAddress}</span>
            </div>

            {
                !address &&
                <div className={'flex justify-center'}>
                    <PrimaryButton label={'CONNECT WALLET'} onClick={onConnect}/>
                </div>
            }
        </div>
    )
}
