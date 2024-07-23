import { Fragment, useEffect, useMemo, useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount, useSigner, useNetwork } from "wagmi";
import Image from "next/image";
import { Dialog, Transition, Switch } from "@headlessui/react";
import { ParaRegular18, PrimaryButton, SecondaryButton, SubtitleRegular16 } from "../basic";
import { ethers } from "ethers";
import ProductABI from "../../utils/abis/SHProduct.json";
import ERC20ABI from "../../utils/abis/ERC20.json";
import { DEPOSIT_STATUS, IProduct, WITHDRAW_STATUS } from "../../types";
import { truncateAddress, getTxErrorMessage } from "../../utils/helpers";
import { SUPPORT_CHAIN_IDS } from "../../utils/enums";
import { EXPLORER } from "../../utils/constants";
import toast from "react-hot-toast";
import axios from "../../service/axios";

const pricePerLot = 1000;

export const ActionArea = ({ productAddress, product }: { productAddress: string; product: IProduct }) => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();

  const { openConnectModal } = useConnectModal();

  const [, setScrollY] = useState(0);
  const [tab, setTab] = useState(0);
  const [lots, setLots] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(0);
  const [withdrawing, setWithdrawing] = useState(false);
  const [principalBalance, setPrincipalBalance] = useState(0);
  const [optionBalance, setOptionBalance] = useState(0);
  const [couponBalance, setCouponBalance] = useState(0);
  const [depositStatus, setDepositStatus] = useState(DEPOSIT_STATUS.NONE);
  const [withdrawStatus, setWithdrawStatus] = useState(WITHDRAW_STATUS.NONE);
  const [productInstance, setProductInstance] = useState<ethers.Contract | undefined>(undefined);
  const [currencyInstance, setCurrencyInstance] = useState<ethers.Contract | undefined>(undefined);
  const [maxLots, setMaxLots] = useState(0);
  // const [profit, setProfit] = useState(1);
  const [enabled, setEnabled] = useState(false);
  // following state is for deposit modal
  const [expand, setExpand] = useState(false);

  const [walletBalance, setWalletBalance] = useState(0);
  const [imageURL, setImageURL] = useState("");

  const onConnect = () => {
    if (!address && openConnectModal) {
      openConnectModal();
    }
  };

  const onApprove = async () => {
    try {
      if (currencyInstance && productInstance) {
        const decimal = await currencyInstance.decimals();
        const requestBalance = ethers.utils.parseUnits(depositAmount.toString(), decimal);
        const _currentCapacity = await productInstance.currentCapacity();
        if (depositAmount + Number(ethers.utils.formatUnits(_currentCapacity, decimal)) > Number(product.maxCapacity)) {
          return toast.error("Your deposit results in excess of max capacity.");
        }
        const currentAllowance = await currencyInstance.allowance(address, productAddress);
        if (currentAllowance.lt(requestBalance)) {
          const tx = await currencyInstance.approve(productAddress, requestBalance);
          setDepositStatus(DEPOSIT_STATUS.APPROVING);
          await tx.wait();
        }
        setDepositStatus(DEPOSIT_STATUS.DEPOSIT);
        const depositTx = await productInstance.deposit(requestBalance, principalBalance > 0 && enabled == true);
        await depositTx.wait();
      }
    } catch (e) {
      toast.error(getTxErrorMessage(e));
      console.log(`Error while approve and deposit: ${e}`);
    } finally {
      setDepositStatus(DEPOSIT_STATUS.NONE);
      setIsOpen(false);
    }
  };

  const onWithdraw = async () => {
    if (productInstance) {
      try {
        setWithdrawing(true);
        if (status === 1) {
          if (principalBalance > 0) {
            const tx = await productInstance.withdrawPrincipal();
            await tx.wait();
          }
          if (optionBalance > 0) {
            const tx1 = await productInstance.withdrawOption();
            await tx1.wait();
          }
          if (couponBalance > 0) {
            const tx2 = await productInstance.withdrawCoupon();
            await tx2.wait();
          }
          setWithdrawStatus(WITHDRAW_STATUS.DONE);
        } else if (status >= 2) {
          if (optionBalance > 0) {
            const tx1 = await productInstance.withdrawOption();
            await tx1.wait();
          }
          if (couponBalance > 0) {
            const tx2 = await productInstance.withdrawCoupon();
            await tx2.wait();
          }
          setWithdrawStatus(WITHDRAW_STATUS.DONE);
        } else {
          setWithdrawStatus(WITHDRAW_STATUS.NONE);
        }
      } catch (e) {
        setWithdrawStatus(WITHDRAW_STATUS.NONE);
      } finally {
        setWithdrawing(false);
      }
    }
  };

  const chainId = useMemo(() => {
    if (chain) return chain.id;
    return SUPPORT_CHAIN_IDS.GOERLI;
  }, [chain]);

  const lotsCount = useMemo(() => {
    return (principalBalance + optionBalance + couponBalance) / pricePerLot;
  }, [principalBalance, optionBalance, couponBalance]);

  const withdrawableBalance = useMemo(() => {
    if (status === 1) {
      return principalBalance + optionBalance + couponBalance;
    } else if (status >= 2) {
      return optionBalance + couponBalance;
    }
    return 0;
  }, [status, principalBalance, optionBalance, couponBalance]);

  const depositAmount = useMemo(() => {
    if (status !== 1) {
      return 0;
    }
    if (principalBalance > 0) {
      if (enabled == true) {
        if (pricePerLot * lots > optionBalance + couponBalance) {
          return pricePerLot * lots - (optionBalance + couponBalance);
        }
        return 0;
      } else {
        return pricePerLot * lots;
      }
    }
    return pricePerLot * lots;
  }, [principalBalance, status, lots, enabled, optionBalance, couponBalance]);

  const depositButtonLabel = useMemo(() => {
    if (status !== 1) {
      return "Please await unlock to deposit";
    }
    if (principalBalance > 0) {
      return `TOP-UP ${depositAmount.toLocaleString()} USDC`;
    }
    return `DEPOSIT ${depositAmount.toLocaleString()} USDC`;
  }, [principalBalance, status, depositAmount]);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    setScrollY(scrollTop);
  };

  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  useEffect(() => {
    (async () => {
      if (signer && productAddress && address) {
        try {
          const _productInstance = new ethers.Contract(productAddress, ProductABI, signer);
          setProductInstance(_productInstance);
          const _status = await _productInstance.status();
          setStatus(_status);
          const _currency = await _productInstance.currency();
          const _currencyInstance = new ethers.Contract(_currency, ERC20ABI, signer);
          setCurrencyInstance(_currencyInstance);
          const _decimals = await _currencyInstance.decimals();
          const _couponBalance = await _productInstance.couponBalance(address);
          setCouponBalance(Number(ethers.utils.formatUnits(_couponBalance, _decimals)));
          const _optionBalance = await _productInstance.optionBalance(address);
          setOptionBalance(Number(ethers.utils.formatUnits(_optionBalance, _decimals)));
          const _principalBalance = await _productInstance.principalBalance(address);
          setPrincipalBalance(Number(ethers.utils.formatUnits(_principalBalance, _decimals)));

          const currentCapacity = await _productInstance.currentCapacity();
          const maxCapacity = await _productInstance.maxCapacity();
          setMaxLots((maxCapacity.toNumber() - Number(ethers.utils.formatUnits(currentCapacity, _decimals))) / pricePerLot);

          // wallet balance
          const currencyBalance = await _currencyInstance.balanceOf(address);
          setWalletBalance(Number(ethers.utils.formatUnits(currencyBalance, _decimals)));
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, [productAddress, signer, address]);

  useEffect(() => {
    (async () => {
      if (product) {
        try {
          const { data } = await axios.get(product.issuanceCycle.url);
          setImageURL(data.image);
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [product]);

  return (
    <>
      <div
        className={`col-span-1 sticky md:right-[96px] md:top-[130px] w-full z-30 bottom-0 bg-white md:m-0 p-5 md:py-[45px] md:px-[63px] rounded ${
          expand ? "h-screen" : "h-fit"
        } ${!address ? "justify-between space-y-[100px]" : ""}`}
      >
        {!expand ? (
          <div className={"p-1 flex items-center bg-[#EBEBEB] rounded-[6px] h-[38px]"}>
            <div
              className={`${
                tab === 0 ? "bg-white" : "bg-transparent"
              } cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center`}
              onClick={() => setTab(0)}
            >
              DEPOSIT
            </div>
            <div
              className={`${
                tab === 1 ? "bg-white" : "bg-transparent"
              } cursor-pointer h-[30px] rounded-[6px] p-2 flex flex-1 items-center justify-center`}
              onClick={() => setTab(1)}
            >
              WITHDRAW
            </div>
          </div>
        ) : (
          <div className={"flex items-center justify-end"}>
            <img src={"/icons/close.svg"} alt={""} onClick={() => setExpand(false)} />
          </div>
        )}

        {!address && (
          <div className={"text-[#161717] text-[18px] leading-[24px] px-10 text-center"}>
            Please Connect your Wallet to have access to our Products.
          </div>
        )}

        {address && tab === 0 && (
          <div className={"flex flex-col justify-between w-full"}>
            <div className={"bg-[#EBEBEB] p-5 rounded-[6px] flex flex-col items-center mt-[17px]"}>
              <span className={"text-[#677079] text-[16px] leading-[16px]"}>Total Balance</span>
              <span className={"text-[#161717] text-[22px] leading-[22px] font-medium mt-3"}>
                {(principalBalance + optionBalance + couponBalance).toLocaleString()} USDC ({lotsCount} lots)
              </span>
            </div>
            { principalBalance > 0 && (
              <div
                className={`${
                  expand ? "bg-[#EBEBEB]" : "bg-transparent"
                } md:bg-[#EBEBEB] rounded-[6px] p-5 flex flex-col items-center mt-0 md:mt-5`}
              >
                <div className={"flex flex-col items-center space-y-2"}>
                  <span className={"text-[#677079] text-[16px] leading-[16px]"}>Total Profit</span>
                  <span className={"text-[22px] leading-[22px] font-medium text-black text-center"}>
                    {(optionBalance + couponBalance).toLocaleString()} USDC
                  </span>
                </div>
              </div>
            )}

            <div className={`${expand ? "" : "hidden"} md:block flex flex-col w-full`}>
              <div className={"mt-8 text-[#494D51] text-[16px]"}>No of lots</div>

              <div className={"relative flex items-center mt-2"}>
                <input
                  className={"w-full py-3 px-4 bg-[#FBFBFB] border-[1px] border-[#E6E6E6] rounded focus:outline-none"}
                  value={lots}
                  onChange={(e) => setLots(Number(e.target.value))}
                  type='text'
                />
                <span className={"absolute right-4 text-[#828A93]"}>Lots</span>
              </div>

              <div className={"mt-3 flex justify-between items-center text-[#828A93]"}>
                <div className={"flex items-center"}>
                  <Image src={"/miniUSDC.svg"} alt={"miniUSDC"} width={20} height={20} />
                  <span className={"ml-2"}>{(pricePerLot * lots).toLocaleString()} USDC</span>
                </div>
                <div className={"flex items-center"}>
                  <span className={"mr-2"}>1 lot -</span>
                  <Image src={"/miniUSDC.svg"} alt={"miniUSDC"} width={20} height={20} />
                  <span className={"ml-2"}>{pricePerLot.toLocaleString()} USDC</span>
                </div>
              </div>

              <div className={"mt-5 grid grid-cols-5 gap-2"}>
                <div
                  className={
                    "bg-[#FBFBFB] cursor-pointer flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]"
                  }
                  onClick={() => setLots(1)}
                >
                  MIN
                </div>
                <div
                  className={
                    "bg-[#FBFBFB] cursor-pointer flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]"
                  }
                  onClick={() => setLots(5)}
                >
                  5 LOTS
                </div>
                <div
                  className={
                    "bg-[#FBFBFB] cursor-pointer flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]"
                  }
                  onClick={() => setLots(10)}
                >
                  10 LOTS
                </div>
                <div
                  className={
                    "bg-[#FBFBFB] cursor-pointer flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]"
                  }
                  onClick={() => setLots(100)}
                >
                  100 LOTS
                </div>
                <div
                  className={
                    "bg-[#FBFBFB] cursor-pointer flex flex-1 items-center justify-center text-center rounded-[6px] py-2 px-3 text-[12px] leading-[12px]"
                  }
                  onClick={() => setLots(maxLots)}
                >
                  MAX
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-5">
              <Switch.Group>
                <div className="flex items-center">
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${
                      enabled ? 'bg-blue-600' : 'bg-gray-400'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-indigo-500`}
                  >
                    <span
                      className={`${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                  <Switch.Label className="ml-3">Include profits</Switch.Label>
                </div>
                <div>
                  <span className={"mr-1"}>Wallet Balance: </span>
                  <span className="font-medium">{walletBalance.toLocaleString()} USDC</span>
                </div>
              </Switch.Group>
            </div>

            <div className={`${expand ? "" : "hidden"} md:block mt-5`}>
              <PrimaryButton label={depositButtonLabel} disabled={status !== 1} onClick={() => setIsOpen(true)} />
            </div>

            {!expand && (
              <div className={"block md:hidden w-full pb-5"}>
                <PrimaryButton label={"DEPOSIT"} onClick={() => setExpand(true)} />
              </div>
            )}
          </div>
        )}

        {address && tab === 1 && (
          <>
            <div className={"md:block flex flex-col w-full"}>

              <div className={"bg-[#EBEBEB] p-5 rounded-[6px] flex flex-col items-center mt-[17px]"}>
                <span className={"text-[#677079] text-[16px] leading-[16px]"}>Total Balance</span>
                <span className={"text-[#161717] text-[22px] leading-[22px] mt-3"}>
                  {(principalBalance + optionBalance + couponBalance).toLocaleString()} USDC ({lotsCount} lots)
                </span>
              </div>

              <div className={"bg-[#EBEBEB] p-5 rounded-[6px] flex flex-col items-center mt-[17px]"}>
                <span className={"text-[#677079] text-[16px] leading-[16px]"}>Withdrawable Balance</span>
                <span className={"text-[#161717] text-[22px] leading-[22px] mt-3"}>{withdrawableBalance.toLocaleString()} USDC</span>
              </div>

              <div className={"font-light text-[14px] leading-[20px] text-[#677079] mt-[44px]"}>
                {status !== 1
                  ? "Your Deposit is locked, so you can initiate only Profit Withdraw right now or request\n" +
                    "withdraw All Amount at Maturity Date."
                  : "Vault is unlocked. You may deposits or withdraw funds at this time."}
              </div>

              <div className={"mt-7"}>
                <PrimaryButton
                  label={withdrawableBalance === 0 ? "No Withdrawable Balance" : "INITIATE WITHDRAW"}
                  className={"uppercase"}
                  disabled={withdrawableBalance === 0}
                  onClick={() => setWithdrawStatus(WITHDRAW_STATUS.INITIATE)}
                />

                {/* {(status === 3 || status === 4) && (
                  <SecondaryButton
                    label={principalBalance > 0 ? "Request Withdrawal of Principal on Maturity" : "No principal to withdraw"}
                    className='mt-4 uppercase'
                    disabled={principalBalance === 0}
                  />
                )} */}
              </div>
            </div>

            <div className={"block md:hidden w-full pb-5"}>
              <div className={"flex flex-col items-center w-full space-y-2 py-4"}>
                <SubtitleRegular16>Current Balance</SubtitleRegular16>
                <ParaRegular18 className={"text-center"}>
                  You have no Deposit. <br /> Please Deposit first
                </ParaRegular18>
              </div>

              <PrimaryButton label={"INITIATE WITHDRAW"} />
            </div>
          </>
        )}
        {address && (
          <div className={"hidden md:flex mt-7 items-center justify-center"}>
            <span className={"text-[#677079] mr-2"}>Contract:</span>
            <span className={"mr-2 bg-clip-text text-transparent bg-primary-gradient"}>{truncateAddress(productAddress)}</span>
            <a href={`${EXPLORER[chainId]}/address/${productAddress}`} target={"_blank"} rel='noreferrer'>
              <Image src={"/icons/external.svg"} alt={"external"} width={20} height={20} />
            </a>
          </div>
        )}

        {!address && (
          <div className={"flex justify-center"}>
            <PrimaryButton label={"CONNECT WALLET"} onClick={onConnect} />
          </div>
        )}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white py-[60px] px-[160px] text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title className='text-[32px] font-medium leading-[40px] text-[#161717] text-center'>
                    {depositStatus <= DEPOSIT_STATUS.APPROVING ? "Step 1/2: Approve USDC spend from your wallet" : "Step 2/2: Deposit USDC"}
                  </Dialog.Title>
                  <div className='mt-7 flex flex-col items-center'>
                    <p className='text-[16px] text-gray-500'>Smart contract link</p>
                    <div className={"flex items-center mt-4"}>
                      <span className={"bg-primary-gradient text-transparent bg-clip-text text-[20px]"}>
                        {truncateAddress(productAddress)}
                      </span>
                      <a href={`${EXPLORER[chainId]}/address/${productAddress}`} target={"_blank"} rel='noreferrer'>
                        <Image src={"/icons/external.svg"} alt={"external"} width={20} height={20} />
                      </a>
                    </div>
                    <p className='text-[16px] text-gray-500 mt-7 flex flex-col items-center'>You&#39;ll receive this Structured Note NFT, representing your deposit</p>
                    <img className={"mt-8"} src={imageURL || "/products/default_nft_image.png"} alt={"nft image"} />
                  </div>

                  <div className='mt-8 flex items-center justify-between space-x-8 h-[50px]'>
                    <button
                      type='button'
                      className='flex flex-1 items-center justify-center border-[#4B4B4B] border-[1px] px-4 py-2 text-sm font-medium text-black rounded-[8px] h-full'
                      onClick={() => setIsOpen(false)}
                    >
                      CANCEL
                    </button>
                    <button
                      type='button'
                      className='flex flex-1 items-center justify-center border border-transparent bg-[#292929] px-4 py-2 text-sm font-medium text-white rounded-[8px] h-full'
                      onClick={onApprove}
                      disabled={depositStatus === DEPOSIT_STATUS.APPROVING}
                    >
                      {depositStatus >= DEPOSIT_STATUS.APPROVING && (
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                      )}
                      {depositStatus === DEPOSIT_STATUS.DEPOSIT ? "DEPOSIT" : "APPROVE"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={withdrawStatus !== WITHDRAW_STATUS.NONE} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={() => setWithdrawStatus(WITHDRAW_STATUS.NONE)}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white py-[60px] px-[80px] text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title className='text-[32px] font-medium leading-[40px] text-[#161717] text-center'>
                    {withdrawStatus === WITHDRAW_STATUS.DONE
                      ? "You successfully withdrawed your Deposit"
                      : "Are you sure you want to initiate Withdraw now?"}
                  </Dialog.Title>

                  {withdrawStatus === WITHDRAW_STATUS.DONE && (
                    <div className='mt-7 flex flex-col items-center'>
                      Funds have been withdrawn to your wallet.
                    </div>
                  )}

                  <div className='mt-7 flex flex-col items-center'>
                    <p className='text-sm text-gray-500'>Total amount to Withdraw</p>
                    <p>{withdrawableBalance.toLocaleString()} USDC</p>
                  </div>

                  {withdrawStatus === WITHDRAW_STATUS.DONE ? (
                    <button
                      type='button'
                      className='mt-8 flex flex-1 w-full items-center justify-center border border-transparent bg-[#292929] px-4 py-2 text-sm font-medium text-white rounded-[8px] h-full'
                      onClick={() => setWithdrawStatus(WITHDRAW_STATUS.NONE)}
                    >
                      CONTINUE
                    </button>
                  ) : (
                    <div className='mt-8 flex items-center justify-between space-x-8 h-[50px]'>
                      <SecondaryButton label={"NO"} onClick={() => setWithdrawStatus(WITHDRAW_STATUS.NONE)} />
                      <PrimaryButton
                        label={"YES"}
                        onClick={onWithdraw}
                        disabled={withdrawing}
                        loading={withdrawing}
                        className={"flex items-center justify-center"}
                      />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
