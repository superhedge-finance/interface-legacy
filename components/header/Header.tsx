import NavMenu from './NavMenu';
import WalletConnect from './WalletConnect';
import Link from "next/link";
import NavMenuMobile from "./NavMenuMobile";

const Header = () => {
    return (
        <header className={'bg-[#F7F7F7]'}>
            <nav className="px-5 py-6 sm:px-4 sm:py-2.5 rounded-br-[16px] rounded-bl-[16px] bg-[#161717]">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Link href="/" className="flex items-center pt-1.5">
                        <img src={'/icons/logo.svg'} alt={'logo'} />
                    </Link>
                    <NavMenu />
                    <WalletConnect />
                    <NavMenuMobile />
                </div>
            </nav>
        </header>
    )
};

export default Header;
