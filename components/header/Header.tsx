import NavMenu from "./NavMenu";
import WalletConnect from "./WalletConnect";
import Link from "next/link";
import NavMenuMobile from "./NavMenuMobile";
import React from "react";
import useToast from "../../hooks/useToast";

const Header = () => {
  const { toast, type } = useToast();
  return (
    <header className={"bg-[#F7F7F7] sticky z-50 top-0"}>
      <nav className='p-5 md:px-10 rounded-br-[16px] rounded-bl-[16px] bg-[#161717]'>
        <div className='container flex flex-wrap items-center justify-between mx-auto'>
          <Link href='/' className='flex grow lg:grow-0 items-center pt-1.5'>
            <img src={"/icons/logo.svg"} alt={"logo"} />
          </Link>
          <NavMenu />
          <WalletConnect />
          <NavMenuMobile />
        </div>
      </nav>
      {toast && (
        <div
          className={`absolute top-[78px] left-0 w-full h-[64px] flex items-center justify-center uppercase text-whitenew-100 bg-${type} rounded-br-[16px] rounded-bl-[16px] z-50`}
        >
          {toast}
        </div>
      )}
    </header>
  );
};

export default Header;
