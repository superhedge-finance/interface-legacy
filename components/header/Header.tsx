import NavMenu from "./NavMenu";
import WalletConnect from "./WalletConnect";
import Link from "next/link";
import NavMenuMobile from "./NavMenuMobile";
import React from "react";
import useToast from "../../hooks/useToast";

const Header = () => {
  const { toast } = useToast();
  return (
    <header className={"bg-[#F7F7F7] relative"}>
      <nav className='px-5 py-6 sm:px-4 sm:py-2.5 rounded-br-[16px] rounded-bl-[16px] bg-[#161717]'>
        <div className='container flex flex-wrap items-center justify-between mx-auto'>
          <Link href='/' className='flex items-center pt-1.5'>
            <img src={"/icons/logo.svg"} alt={"logo"} />
          </Link>
          <NavMenu />
          <WalletConnect />
          <NavMenuMobile />
        </div>
      </nav>
      {toast && (
        <div
          className={
            "absolute top-[78px] left-0 w-full h-[64px] flex items-center justify-center uppercase text-whitenew-100 bg-success rounded-br-[16px] rounded-bl-[16px] z-50"
          }
        >
          {toast}
        </div>
      )}
    </header>
  );
};

export default Header;
