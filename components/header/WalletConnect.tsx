import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Menu } from '@headlessui/react'
import {disconnect} from '@wagmi/core'

export default function WalletConnect() {
    const onDisconnect = async () => {
        await disconnect()
    }

    return (
        <div className={'hidden md:block flex items-end p-3'}>
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                }) => {
                    return (
                        <div
                            {...(!mounted && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                            })}
                        >
                            {(() => {
                            if (!mounted || !account || !chain) {
                                return (
                                <button className="uppercase text-[#161717] text-[14px] font-semibold leading-[14px] bg-white py-[18px] px-8 rounded-[8px]" onClick={openConnectModal} type="button">
                                    Connect Wallet
                                </button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                <button onClick={openChainModal} type="button">
                                    Wrong network
                                </button>
                                );
                            }

                            return (
                                <Menu as={'div'} className={'relative'}>
                                    <Menu.Button>
                                        <button type="button" className={'text-[#F8F6F5] uppercase text-[14px] leading-[14px] h-[50px] font-semibold bg-[#161717] border-[1px] border-[#CFD1D3] rounded-[8px] py-[15px] px-8'}>
                                            {account.displayName}
                                            {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ''}
                                        </button>
                                    </Menu.Button>
                                    <Menu.Items as={'div'} className={'absolute bg-[#161717] rounded-bl-lg rounded-br-lg w-full text-[13px] leading-[16px]'}>
                                        <Menu.Item as={'div'} className={'h-[64px] border border-[1px] border-[#4B4B4B]'}>
                                            <Link href={'/profile'}>
                                                <div className={'flex items-center justify-center h-full text-grey-70 py-4 px-[10px]'}>
                                                    PROFILE
                                                </div>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item as={'div'} className={'flex items-center justify-center  text-grey-70 py-4 px-[10px] h-[64px]'} onClick={onDisconnect}>
                                            DISCONNECT WALLET
                                        </Menu.Item>
                                    </Menu.Items>
                                </Menu>
                            );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
      </div>
    )
};
