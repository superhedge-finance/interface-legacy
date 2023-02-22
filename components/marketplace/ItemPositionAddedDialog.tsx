import { Fragment } from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { PrimaryButton } from "../basic";

const ItemPositionAddedDialog = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const Router = useRouter();

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
                  Thank you! Position added to your portfolio
                </Dialog.Title>
                <div className='mt-7 flex flex-col items-center'>
                  <p className='text-[16px] text-gray-500'>Purchased</p>
                  <span className={"text-gray-500     text-[20px]"}>NFT is a product position in your portfolio.</span>
                </div>

                <div className='mt-8 flex items-center justify-between space-x-8 h-[50px]'>
                  <PrimaryButton label={"GO TO PORTFOLIO"} onClick={() => Router.push("/portfolio")} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ItemPositionAddedDialog;
