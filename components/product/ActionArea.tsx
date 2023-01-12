import {Fragment, useEffect, useMemo, useState} from "react";
import {useConnectModal} from "@rainbow-me/rainbowkit";
import { RadioGroup } from '@headlessui/react'
import {useAccount, useSigner} from "wagmi";
import Image from "next/image";
import {Dialog, Transition} from "@headlessui/react";
import {PrimaryButton} from "../basic";
import {ethers} from "ethers";
import ProductABI from "../../constants/abis/SHProduct.json";
import ERC20ABI from "../../constants/abis/ERC20.json";
import {DEPOSIT_STATUS, WITHDRAW_STATUS} from "../../types/enums";

const pricePerLot = 1000;

export const ActionArea = ({productAddress}: { productAddress: string }) => {
    const {address} = useAccount()
    const {data: signer} = useSigner()
    const {openConnectModal} = useConnectModal()

    const [tab, setTab] = useState(0);
    const [lots, setLots] = useState(1);
    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState(0)
    const [principalBalance, setPrincipalBalance] = useState(0)
    const [optionBalance, setOptionBalance] = useState(0)
    const [couponBalance, setCouponBalance] = useState(0)
    const [depositStatus, setDepositStatus] = useState(DEPOSIT_STATUS.NONE)
    const [withdrawStatus, setWithdrawStatus] = useState(WITHDRAW_STATUS.NONE)
    const [productInstance, setProductInstance] = useState<ethers.Contract | undefined>(undefined)
    const [currencyInstance, setCurrencyInstance] = useState<ethers.Contract | undefined>(undefined)
    const [maxLots, setMaxLots] = useState(0)
    const [profit, setProfit] = useState(1)

    const onConnect = () => {
        if (!address && openConnectModal) {
            openConnectModal()
        }
    }

    const onApprove = async () => {
        try {
            if (currencyInstance && productInstance) {
                const decimal = await currencyInstance.decimals()
                const tx = await currencyInstance.approve(productAddress, ethers.utils.parseUnits((pricePerLot * lots).toString(), decimal))
                setDepositStatus(DEPOSIT_STATUS.APPROVING)
                await tx.wait()
                setDepositStatus(DEPOSIT_STATUS.DEPOSIT)
                const depositTx = await productInstance.deposit(ethers.utils.parseUnits((pricePerLot * lots).toString(), decimal))
                await depositTx.wait()
            }
        } catch (e) {
            console.log(`Error while approving: ${e}`)
        } finally {
            setDepositStatus(DEPOSIT_STATUS.NONE)
            setIsOpen(false)
        }
    }

    const onWithdraw = async () => {
        if (productInstance) {
            try {
                if (status === 1) {
                    if (principalBalance > 0) {
                        const tx = await productInstance.withdrawPrincipal();
                        await tx.wait()
                    }
                    if (optionBalance > 0) {
                        const tx1 = await productInstance.withdrawOption();
                        await tx1.wait()
                    }
                    if (couponBalance > 0) {
                        const tx2 = await productInstance.withdrawCoupon();
                        await tx2.wait()
                    }
                    setWithdrawStatus(WITHDRAW_STATUS.DONE)
                } else if (status === 2) {
                    if (optionBalance > 0) {
                        const tx1 = await productInstance.withdrawOption();
                        await tx1.wait()
                    }
                    if (couponBalance > 0) {
                        const tx2 = await productInstance.withdrawCoupon();
                        await tx2.wait()
                    }
                    setWithdrawStatus(WITHDRAW_STATUS.DONE)
                } else {
                    setWithdrawStatus(WITHDRAW_STATUS.NONE)
                }
            } catch (e) {
                setWithdrawStatus(WITHDRAW_STATUS.NONE)
            }
        }
    }

    const onRequestWithdraw = async () => {
    }

    const lotsCount = useMemo(() => {
        return (principalBalance + optionBalance + couponBalance) / pricePerLot
    }, [principalBalance, optionBalance, couponBalance])

    const withdrawableBalance = useMemo(() => {
        if (status === 1) {
            return principalBalance + optionBalance + couponBalance
        } else if (status === 2) {
            return optionBalance + couponBalance
        }
        return 0
    }, [status, principalBalance, optionBalance, couponBalance])

    const depositButtonLabel = useMemo(() => {
        if (principalBalance > 0) {
            if (profit === 1) {
                return `TOP-UP ON ${(pricePerLot * lots - (optionBalance + couponBalance)).toLocaleString()} USDC`
            } else if (profit === 2) {
                return `TOP-UP ON ${(pricePerLot * lots).toLocaleString()} USDC`
            }
        }
        return `DEPOSIT ${(pricePerLot * lots).toLocaleString()} USDC`
    }, [principalBalance, lots, profit, optionBalance, couponBalance])

    useEffect(() => {
        (async () => {
            if (signer && productAddress && address) {
                try {
                    const _productInstance = new ethers.Contract(productAddress, ProductABI, signer)
                    setProductInstance(_productInstance)
                    const _status = await _productInstance.status()
                    setStatus(_status)
                    const _currency = await _productInstance.currency()
                    const _currencyInstance = new ethers.Contract(_currency, ERC20ABI, signer)
                    setCurrencyInstance(_currencyInstance)
                    const _couponBalance = await _productInstance.couponBalance(address)
                    setCouponBalance(Number(ethers.utils.formatUnits(_couponBalance, 6)))
                    const _optionBalance = await _productInstance.optionBalance(address)
                    setOptionBalance(Number(ethers.utils.formatUnits(_optionBalance, 6)))
                    const _principalBalance = await _productInstance.principalBalance(address)
                    setPrincipalBalance(Number(ethers.utils.formatUnits(_principalBalance, 6)))

                    const currentCapacity = await _productInstance.currentCapacity()
                    const maxCapacity = await _productInstance.maxCapacity()
                    setMaxLots(maxCapacity.toNumber() - Number(ethers.utils.formatUnits(currentCapacity, 6)))
                } catch (e) {
                    console.error(e)
                }
            }
        })()
    }, [productAddress, signer, address])

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
                        className={'text-[#161717] text-[18px] leading-[24px] px-10 text-center'}>
                        Please Connect your Wallet to have access to our Products.
                    </div>
                }

                {
                    (address && tab === 0) &&
                    <>
                        <div className={'bg-[#EBEBEB] rounded-[6px] p-5 flex flex-col items-center mt-10'}>
                            {
                                principalBalance === 0 ?
                                    <>
                                        <div className={'flex items-center'}>
                                            <span
                                                className={'text-[#677079] text-[16px] font-light'}>Current Deposit</span>
                                        </div>
                                        <div
                                            className={'flex items-center mt-2 py-[10px] text-[12px] px-3 rounded-[6px] bg-[#E89D45] justify-center text-white'}>
                                            You have no Deposit
                                        </div>
                                    </>
                                    :
                                    <div className={'flex flex-col items-center space-y-2'}>
                                        <span className={'text-[16px] leading-[16px] font-light text-grey-70'}>You can Top-up with Profit</span>
                                        <span
                                            className={'text-[22px] leading-[22px] font-medium text-black text-center'}>{(optionBalance + couponBalance).toLocaleString()} USDC</span>

                                        <RadioGroup className={'flex items-center justify-between space-x-3 mt-6'} value={profit} onChange={setProfit}>
                                            <RadioGroup.Option className={'flex items-center cursor-pointer space-x-2'} value={1}>
                                                {({ checked }) => (
                                                    <>
                                                        <div className={`w-4 h-4 rounded-full ${checked ? 'bg-[#EBEBEB] border-4 border-black' : 'border-[1px] border-black'}`} />
                                                        <span className="text-[16px] leading-[16px] font-medium text-[#494D51]">Include profit</span>
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                            <RadioGroup.Option className={'flex items-center cursor-pointer space-x-2'} value={2}>
                                                {({ checked }) => (
                                                    <>
                                                        <div className={`w-4 h-4 rounded-full ${checked ? 'bg-[#EBEBEB] border-4 border-black' : 'border-[1px] border-black'}`} />
                                                        <span className="text-[16px] leading-[16px] font-medium text-[#494D51]">Top-up without Profit</span>
                                                    </>
                                                )}
                                            </RadioGroup.Option>
                                        </RadioGroup>
                                    </div>
                            }
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
                                className={'bg-[#FBFBFB] cursor-pointer flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]'}
                                onClick={() => setLots(1)}>
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
                                className={'bg-[#FBFBFB] cursor-pointer flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]'}
                                onClick={() => setLots(maxLots)}>
                                MAX
                            </div>
                        </div>

                        <div className={'mt-7'}>
                            <PrimaryButton
                                label={depositButtonLabel}
                                onClick={() => setIsOpen(true)}/>
                        </div>
                    </>
                }

                {
                    address && tab === 1 &&
                    <>
                        <div className={'text-[#677079] text-[16px] leading-[16px] text-center mt-[33px]'}>Withdraw
                            info
                        </div>

                        <div className={'bg-[#0000000a] p-5 rounded-[6px] flex flex-col items-center mt-[17px]'}>
                            <span className={'text-[#677079] text-[16px] leading-[16px]'}>Total Balance</span>
                            <span
                                className={'text-[#161717] text-[22px] leading-[22px] mt-3'}>{(principalBalance + optionBalance + couponBalance).toLocaleString()} USDC ({lotsCount} lot)</span>
                        </div>

                        <div className={'bg-[#0000000a] p-5 rounded-[6px] flex flex-col items-center mt-[17px]'}>
                            <span className={'text-[#677079] text-[16px] leading-[16px]'}>Withdrawable Balance</span>
                            <span
                                className={'text-[#161717] text-[22px] leading-[22px] mt-3'}>{withdrawableBalance.toLocaleString()} USDC</span>
                        </div>

                        <div className={'font-light text-[14px] leading-[20px] text-[#677079] mt-[44px]'}>
                            Your Deposit is locked, so you can initiate only Profit Withdraw right now or request
                            withdraw All Amount at Maturity Date
                        </div>

                        <div className={'mt-7'}>
                            <PrimaryButton
                                label={`INITIATE WITHDRAW`}
                                onClick={() => setWithdrawStatus(WITHDRAW_STATUS.INITIATE)}
                            />

                            <button
                                className='bg-white border-[1px] border-[#292929] w-full text-black rounded-[8px] py-[18px] px-[28px] mt-4'
                                onClick={onRequestWithdraw}>
                                {'REQUEST WITHDRAW'}
                            </button>
                        </div>
                    </>
                }
                {
                    address &&
                    <div className={'mt-7 flex items-center justify-center'}>
                        <span className={'text-[#677079]'}>Contract:</span>
                        <span
                            className={'mr-2'}>{productAddress.slice(0, 10) + '...' + productAddress.slice(-10)}</span>
                        <a href={`https://goerli.etherscan.io/address/${productAddress}`} target={'_blank'}
                           rel="noreferrer">
                            <Image src={'/icons/external.svg'} alt={'external'} width={20} height={20}/>
                        </a>
                    </div>
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
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
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
                                <Dialog.Panel
                                    className="w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white py-[60px] px-[80px] text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        className="text-[32px] font-medium leading-[40px] text-[#161717] text-center"
                                    >
                                        {
                                            depositStatus <= DEPOSIT_STATUS.APPROVING ?
                                                'Before depositing approve smart contract, please'
                                                :
                                                'Deposit USDC'
                                        }
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
                                            disabled={depositStatus === DEPOSIT_STATUS.APPROVING}
                                        >
                                            {
                                                depositStatus >= DEPOSIT_STATUS.APPROVING &&
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor"
                                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            }
                                            {
                                                depositStatus === DEPOSIT_STATUS.DEPOSIT ? 'DEPOSIT' : 'APPROVE'
                                            }
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={withdrawStatus !== WITHDRAW_STATUS.NONE} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setWithdrawStatus(WITHDRAW_STATUS.NONE)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25"/>
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
                                <Dialog.Panel
                                    className="w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white py-[60px] px-[80px] text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        className="text-[32px] font-medium leading-[40px] text-[#161717] text-center"
                                    >
                                        {
                                            withdrawStatus === WITHDRAW_STATUS.DONE ?
                                                'You successfully withdrawed your Deposit'
                                                :
                                                'Are you sure you want to initiate Withdraw now?'
                                        }
                                    </Dialog.Title>

                                    {
                                        withdrawStatus === WITHDRAW_STATUS.DONE &&
                                        <div className="mt-7 flex flex-col items-center">
                                            The money will come to your wallet soon.
                                            Usually it takes 1-3 days.
                                        </div>
                                    }

                                    <div className="mt-7 flex flex-col items-center">
                                        <p className="text-sm text-gray-500">
                                            Total amount to Withdraw
                                        </p>
                                        <p>{withdrawableBalance.toLocaleString()} USDC</p>
                                    </div>

                                    {
                                        withdrawStatus === WITHDRAW_STATUS.DONE ?
                                            <button
                                                type="button"
                                                className="h-[50px] mt-8 flex flex-1 w-full items-center justify-center rounded-md border border-transparent bg-[#292929] px-4 py-2 text-sm font-medium text-white rounded-[8px] h-full"
                                                onClick={() => setWithdrawStatus(WITHDRAW_STATUS.NONE)}
                                            >
                                                CONTINUE
                                            </button>
                                            :
                                            <div className="mt-8 flex items-center justify-between space-x-8 h-[50px]">
                                                <button
                                                    type="button"
                                                    className="flex flex-1 items-center justify-center rounded-md border border-[#4B4B4B] border-[1px] px-4 py-2 text-sm font-medium text-black rounded-[8px] h-full"
                                                    onClick={() => setWithdrawStatus(WITHDRAW_STATUS.NONE)}
                                                >
                                                    NO
                                                </button>
                                                <button
                                                    type="button"
                                                    className="flex flex-1 items-center justify-center rounded-md border border-transparent bg-[#292929] px-4 py-2 text-sm font-medium text-white rounded-[8px] h-full"
                                                    onClick={onWithdraw}
                                                >
                                                    YES
                                                </button>
                                            </div>
                                    }
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
