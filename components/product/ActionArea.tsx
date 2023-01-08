import {Fragment, useEffect, useState} from "react";
import {useConnectModal} from "@rainbow-me/rainbowkit";
import {useAccount, useSigner} from "wagmi";
import Image from "next/image";
import {Dialog, Transition} from "@headlessui/react";
import {PrimaryButton} from "../basic";
import {ethers} from "ethers";
import ProductABI from "../../constants/abis/SHProduct.json";
import ERC20ABI from "../../constants/abis/ERC20.json";

const pricePerLot = 2000;

export const ActionArea = ({ productAddress }: {productAddress: string}) => {
    const {address} = useAccount()
    const { data: signer } = useSigner()
    const {openConnectModal} = useConnectModal()

    const [tab, setTab] = useState(0);
    const [lots, setLots] = useState(1);
    const [isOpen, setIsOpen] = useState(false)
    const [productInstance, setProductInstance] = useState<ethers.Contract | undefined>(undefined)
    const [currencyInstance, setCurrencyInstance] = useState<ethers.Contract | undefined>(undefined)

    const onConnect = () => {
        if (!address && openConnectModal) {
            openConnectModal()
        }
    }

    const onDeposit = () => {
        setIsOpen(true)
    }

    const onApprove = async () => {
        try {
            if (currencyInstance && productInstance) {
                const decimal = await currencyInstance.decimals()
                const tx = await currencyInstance.approve(productAddress, ethers.utils.parseUnits((pricePerLot * lots).toString(), decimal))
                await tx.wait()
                const depositTx = await productInstance.deposit(ethers.utils.parseUnits((pricePerLot * lots).toString(), decimal))
                await depositTx.wait()
            }
        } catch (e) {
            console.log(`Error while approving: ${e}`)
        }
    }

    const onWithdraw = () => {
    }

    useEffect(() => {
        (async () => {
            if (signer && productAddress) {
                const _productInstance = new ethers.Contract(productAddress, ProductABI, signer)
                setProductInstance(_productInstance)
                const _currency = await _productInstance.currency()
                const _currencyInstance = new ethers.Contract(_currency, ERC20ABI, signer)
                setCurrencyInstance(_currencyInstance)
            }
        })()
    }, [productAddress, signer])

    return (
        <>
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

                {
                    address &&
                    <>
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

                        <div className={'relative flex items-center mt-2'}>
                            <input
                                className={'w-full py-3 px-4 bg-[#FBFBFB] border border-[1px] border-[#E6E6E6] rounded focus:outline-none'}
                                value={lots} onChange={(e) => setLots(Number(e.target.value))} type="text"/>
                            <span className={'absolute right-4 text-[#828A93]'}>Lots</span>
                        </div>

                        <div className={'mt-3 flex justify-between items-center text-[#828A93]'}>
                            <div className={'flex items-center'}>
                                <Image src={'/miniUSDC.svg'} alt={'miniUSDC'} width={20} height={20}/>
                                <span className={'ml-2'}>{(pricePerLot * lots).toLocaleString()} USDC</span>
                            </div>
                            <div className={'flex items-center'}>
                                <span className={'mr-2'}>1 lot -</span>
                                <Image src={'/miniUSDC.svg'} alt={'miniUSDC'} width={20} height={20}/>
                                <span className={'ml-2'}>{pricePerLot.toLocaleString()} USDC</span>
                            </div>
                        </div>

                        <div className={'mt-5 grid grid-cols-5 gap-2'}>
                            <div
                                className={'bg-[#FBFBFB] cursor-pointer flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]'}>
                                MIN
                            </div>
                            <div
                                className={'bg-[#FBFBFB] cursor-pointer flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]'}
                                onClick={() => setLots(5)}>
                                5 LOTS
                            </div>
                            <div
                                className={'bg-[#FBFBFB] cursor-pointer flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]'}
                                onClick={() => setLots(10)}>
                                10 LOTS
                            </div>
                            <div
                                className={'bg-[#FBFBFB] cursor-pointer flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]'}
                                onClick={() => setLots(100)}>
                                100 LOTS
                            </div>
                            <div
                                className={'bg-[#FBFBFB] cursor-pointer flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]'}>
                                MAX
                            </div>
                        </div>

                        <div className={'mt-7'}>
                            <PrimaryButton
                                label={tab === 0 ? `DEPOSIT ${(pricePerLot * lots).toLocaleString()} USDC` : 'WITHDRAW'}
                                onClick={tab === 0 ? onDeposit : onWithdraw}/>
                        </div>

                        <div className={'mt-7 flex items-center justify-center'}>
                            <span className={'text-[#677079]'}>Contract:</span>
                            <span>{productAddress.slice(0, 10) + '...' + productAddress.slice(-10)}</span>
                        </div>
                    </>
                }
                {
                    !address &&
                    <div className={'flex justify-center'}>
                        <PrimaryButton label={'CONNECT WALLET'} onClick={onConnect}/>
                    </div>
                }
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white py-[60px] px-[80px] text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        className="text-[32px] font-medium leading-[40px] text-[#161717] text-center"
                                    >
                                        Before depositing approve
                                        smart contract, please
                                    </Dialog.Title>
                                    <div className="mt-7 flex flex-col items-center">
                                        <p className="text-sm text-gray-500">
                                            Smart contract link
                                        </p>
                                        <p>{productAddress}</p>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between space-x-8 h-[50px]">
                                        <button
                                            type="button"
                                            className="flex flex-1 items-center justify-center rounded-md border border-[#4B4B4B] border-[1px] px-4 py-2 text-sm font-medium text-black rounded-[8px] h-full"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            CANCEL
                                        </button>
                                        <button
                                            type="button"
                                            className="flex flex-1 items-center justify-center rounded-md border border-transparent bg-[#292929] px-4 py-2 text-sm font-medium text-white rounded-[8px] h-full"
                                            onClick={onApprove}
                                        >
                                            APPROVE
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
