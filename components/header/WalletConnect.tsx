import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function WalletConnect() {
    return (
        <div
            style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 12,
            }}
        >
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
                                <div style={{ display: 'flex', gap: 12 }}>
                                    {/*<button
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center' }}
                                        className={'text-white'}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                        <div
                                            style={{
                                            background: chain.iconBackground,
                                            width: 12,
                                            height: 12,
                                            borderRadius: 999,
                                            overflow: 'hidden',
                                            marginRight: 4,
                                            }}
                                        >
                                            {chain.iconUrl && (
                                            <Image
                                                alt={chain.name ?? 'Chain icon'}
                                                src={chain.iconUrl}
                                                width={12}
                                                height={12}
                                            />
                                            )}
                                        </div>
                                        )}
                                        {chain.name}
                                    </button>*/}

                                    <button onClick={openAccountModal} type="button" className={'text-[#F8F6F5] uppercase text-[14px] leading-[14px] h-[50px] font-semibold bg-[#161717] border-[1px] border-[#CFD1D3] rounded-[8px] py-[15px] px-8'}>
                                        {account.displayName}
                                        {account.displayBalance
                                        ? ` (${account.displayBalance})`
                                        : ''}
                                    </button>
                                </div>
                            );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
      </div>
    )
};
