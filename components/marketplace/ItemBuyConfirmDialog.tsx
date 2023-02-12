import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {PrimaryButton, SecondaryButton} from "../basic";

const ItemBuyConfirmDialog = ({ open, setOpen, onConfirm }: { open: boolean, setOpen: (open: boolean) => void, onConfirm: () => void }) => {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
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
                                className="w-full max-w-[800px] transform overflow-hidden rounded-2xl bg-white py-[60px] px-[120px] text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    className="text-[32px] font-medium leading-[40px] text-[#161717] text-center"
                                >
                                    You are about to buy NFT product.
                                    <br />
                                    Please confirm the action.
                                </Dialog.Title>
                                <div className="mt-7 flex flex-col items-center">
                                    <p className="text-[16px] text-gray-500">
                                        NFT listed by 0xa377...CCA5 with the offered price:
                                    </p>
                                    <span className={'bg-primary-gradient text-transparent bg-clip-text text-[20px]'}>
                                        1,010 USDC
                                    </span>
                                    <img className={'mt-8'} src={'/products/default_nft_image.png'} alt={'nft image'} />
                                </div>

                                <div className="mt-8 flex items-center justify-between space-x-8 h-[50px]">
                                    <SecondaryButton label={'CANCEL'} onClick={() => setOpen(false)} />
                                    <PrimaryButton label={'CONFIRM'} onClick={onConfirm} />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ItemBuyConfirmDialog
