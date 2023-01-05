import Image from 'next/image';
import NavMenu from './NavMenu';
import WalletConnect from './WalletConnect';
const Header = () => {
    return (
        <header>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="https://superhedge.com/" className="flex items-center" target="_blank" rel="noreferrer">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Superhedge</span>
                    </a>
                    <NavMenu />
                    <WalletConnect />
                </div>
            </nav>
        </header>
    )
};

export default Header;