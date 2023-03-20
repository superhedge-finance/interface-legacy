import { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAccount, useNetwork, useSigner } from "wagmi";
import { ethers } from "ethers";
import { PrimaryButton, SecondaryButton } from "../basic";
import { OfferType } from "../../types";
import { truncateAddress } from "../../utils/helpers";
import { getERC20Instance, getMarketplaceInstance } from "../../utils/contract";
import { MARKETPLACE_ADDRESS, USDC_ADDRESS } from "../../utils/constants/address";
import { SUPPORT_CHAIN_IDS } from "../../utils/enums";

const ItemBuyConfirmDialog = ({
  offer,
  open,
  listingId,
  setOpen,
  afterConfirm
}: {
  offer: OfferType;
  open: boolean;
  listingId: string;
  setOpen: (open: boolean) => void;
  afterConfirm: (success: boolean) => void;
}) => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();

  const [loading, setLoading] = useState(false);
  const [marketplaceInstance, setMarketplaceInstance] = useState<ethers.Contract>();
  const [currencyInstance, setCurrencyInstance] = useState<ethers.Contract>();

  const onConfirm = async () => {
    if (marketplaceInstance && currencyInstance && address) {
      try {
        setLoading(true);
        const requestBalance = ethers.utils.parseUnits((offer.quantity * offer.price).toString(), 6);
        const currentAllowance = await currencyInstance.allowance(address, MARKETPLACE_ADDRESS);
        if (currentAllowance.lt(requestBalance)) {
          const approveTx = await currencyInstance.approve(MARKETPLACE_ADDRESS, requestBalance);
          await approveTx.wait();
        }

        const tx = await marketplaceInstance.buyItem(listingId, USDC_ADDRESS, offer.seller);
        await tx.wait();
        afterConfirm(true);
      } catch (e) {
        console.error(e);
        afterConfirm(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const chainId = useMemo(() => {
    if (chain) return chain.id;
    return SUPPORT_CHAIN_IDS.GOERLI;
  }, [chain]);

  useEffect(() => {
    if (signer && chainId) {
      setMarketplaceInstance(getMarketplaceInstance(signer, chainId));
      setCurrencyInstance(getERC20Instance(signer, chainId));
    }
  }, [signer, chainId]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={() => setOpen(false)}>
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
              <Dialog.Panel className='w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white py-[60px] px-[120px] text-left align-middle shadow-xl transition-all'>
                <Dialog.Title className='text-[32px] font-medium leading-[40px] text-[#161717] text-center'>
                  You are about to buy NFT product.
                  <br />
                  Please confirm the action.
                </Dialog.Title>
                <div className='mt-7 flex flex-col items-center'>
                  <p className='text-[16px] text-gray-500'>NFT listed by {truncateAddress(offer.seller, 4)} with the offered price:</p>
                  <span className={"bg-primary-gradient text-transparent bg-clip-text text-[20px]"}>
                    {(offer.quantity * offer.price).toLocaleString()} USDC
                  </span>
                  <img className={"mt-8"} src={"/products/default_nft_image.png"} alt={"nft image"} />
                </div>

                <div className='mt-8 flex items-center justify-between space-x-8 h-[50px]'>
                  <SecondaryButton label={"CANCEL"} onClick={() => setOpen(false)} />
                  <PrimaryButton
                    label={"CONFIRM"}
                    disabled={loading}
                    loading={loading}
                    className={"flex items-center justify-center"}
                    onClick={onConfirm}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ItemBuyConfirmDialog;
