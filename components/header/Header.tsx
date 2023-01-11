import NavMenu from './NavMenu';
import WalletConnect from './WalletConnect';
import Link from "next/link";

const Header = () => {
    return (
        <header className={'bg-[#F7F7F7]'}>
            <nav className="px-2 sm:px-4 py-2.5 rounded-br-[16px] rounded-bl-[16px] bg-[#161717]">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Link href="/" className="flex items-center pt-1.5">
                        <img src={'/icons/logo.svg'} alt={'logo'} />
                    </Link>
                    <NavMenu />
                    <WalletConnect />
                </div>
            </nav>
        </header>
    )
};

export default Header;
