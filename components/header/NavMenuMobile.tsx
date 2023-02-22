import { useState } from "react";

export default function NavMenuMobile() {
  const [menuHover, setMenuHover] = useState(false);

  return (
    <div className='block md:hidden md:w-auto' id='navbar-default'>
      <img
        src={menuHover ? "/layouts/nav_menu_hover.svg" : "/layouts/nav_menu.svg"}
        alt={"nav menu"}
        onMouseEnter={() => setMenuHover(true)}
        onMouseLeave={() => setMenuHover(false)}
      />
      {/*<ul className="uppercase flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-base md:font-medium bg-transparent">
                <li>
                    <Link href='/' className={`block p-0 hover:text-white ${(router.pathname.includes('product') || router.pathname === '/') ? 'text-white' : 'text-[#f8f8f880]'}`}>
                        Products
                    </Link>
                </li>
                <li>
                    <Link href="#" className="block p-0 hover:text-white text-[#f8f8f880]">
                        Portfolio
                    </Link>
                </li>
                <li>
                    <Link href="/marketplace" className={`block p-0 hover:text-white ${router.pathname === '/marketplace' ? 'text-white' : 'text-[#f8f8f880]'}`}>
                        Marketplace
                    </Link>
                </li>
                <li>
                    <Link href="#" className="block p-0 dark:hover:text-white text-[#f8f8f880]">
                        Faq
                    </Link>
                </li>
                <li>
                    <Link href="#" className="block p-0 dark:hover:text-white text-[#f8f8f880]">
                        Blog
                    </Link>
                </li>
            </ul>*/}
    </div>
  );
}
