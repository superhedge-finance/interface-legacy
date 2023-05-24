import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu } from "@headlessui/react";
import { disconnect } from "@wagmi/core";

export default function WalletConnect() {
  const onDisconnect = async () => {
    await disconnect();
  };

  return (
    <div className={"hidden md:flex items-end p-3"}>
      <ConnectButton.Custom>
        {({ account, chain, openChainModal, openConnectModal, mounted }) => {
          return (
            <div
              {...(!mounted && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none"
                }
              })}
            >
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <div
                      className='uppercase text-[#161717] text-[14px] font-semibold leading-[14px] bg-white py-[18px] cursor-pointer px-8 rounded-[8px]'
                      onClick={openConnectModal}
                    >
                      Connect Wallet
                    </div>
                  );
                }

                if (chain.unsupported) {
                  console.log("Unsupported chain");
                  return (
                    <div onClick={openChainModal} className={"text-yellow-500"}>
                      Wrong network
                    </div>
                  );
                }

                return (
                  <Menu as={"div"} className={"relative flex items-center space-x-4"}>
                    <button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      className={"text-white"}
                      type='button'
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 16,
                            height: 16,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 6
                          }}
                        >
                          {chain.iconUrl && <Image alt={chain.name ?? "Chain icon"} src={chain.iconUrl} width={16} height={16} />}
                        </div>
                      )}
                      {chain.name}
                    </button>
                    <Menu.Button as={"div"}>
                      <div
                        className={
                          "text-[#F8F6F5] uppercase text-[14px] leading-[14px] h-[50px] font-semibold bg-[#161717] border-[1px] border-[#CFD1D3] rounded-[8px] cursor-pointer py-[15px] px-8"
                        }
                      >
                        {account.displayName}
                        {account.displayBalance ? ` (${account.displayBalance})` : ""}
                      </div>
                      <Menu.Items
                        as={"div"}
                        className={"absolute bg-[#161717] rounded-bl-lg rounded-br-lg w-2/3 text-[13px] leading-[16px] z-[99]"}
                      >
                        <Menu.Item as={"div"} className={"h-[64px] border-[1px] border-[#4B4B4B]"}>
                          <Link href={"/profile"}>
                            <div className={"flex items-center justify-center h-full text-grey-70 py-4 px-[10px]"}>PROFILE</div>
                          </Link>
                        </Menu.Item>
                        <Menu.Item
                          as={"div"}
                          className={"flex items-center justify-center  text-grey-70 py-4 px-[10px] h-[64px]"}
                          onClick={onDisconnect}
                        >
                          DISCONNECT WALLET
                        </Menu.Item>
                      </Menu.Items>
                    </Menu.Button>
                  </Menu>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}
