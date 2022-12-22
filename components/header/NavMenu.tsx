import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavMenu() {
    return (
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="uppercase flex flex-col p-4 mt-4 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-medium md:bg-white dark:bg-gray-800">
                <li>
                    <Link href='/' className="block py-2 pl-3 pr-4 text-gray-500 bg-blue-700 rounded md:bg-transparent md:text-gray-800 md:p-0 dark:text-white" aria-current="page">
                        Products
                    </Link>
                </li>
                <li>
                    <Link href="#" className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        Portfolio
                    </Link>
                </li>
                <li>
                    <Link href="#" className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        Marketplace
                    </Link>
                </li>
                <li>
                    <Link href="#" className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        Faq
                    </Link>
                </li>
                <li>
                    <Link href="#" className="block py-2 pl-3 pr-4 text-gray-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-500 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        Blog
                    </Link>
                </li>
            </ul>
        </div>
    )
}
