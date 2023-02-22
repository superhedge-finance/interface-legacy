import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { classNames } from "../../styles/helper";
import { ProductCategoryList } from "../../types";
import MarketplaceList from "../../components/marketplace/List";
import { MarketplaceItemType } from "../../types";
import { getListedItems } from "../../service";

const underlyingList = ["ALL", "ETH/USDC", "BTC/USDC"];

const Marketplace = () => {
  const [items, setItems] = useState<Array<MarketplaceItemType>>([]);
  const [, setUnderlying] = useState("ALL");
  const [, setCategory] = useState("All");

  useEffect(() => {
    (async () => {
      const _items = await getListedItems();
      setItems(_items);
    })();
  }, []);

  return (
    <div className={"py-10"}>
      <span className={"text-[44px] md:text-[68px] leading-[48px] md:leading-[76px] bg-primary-gradient bg-clip-text text-transparent"}>
        Marketplace
      </span>
      {items.length === 0 && (
        <div className={"flex items-center justify-center py-[110px]"}>
          <div className={"flex flex-col items-center space-y-5"}>
            <img src={"/icons/noNFT.svg"} alt={"noNFT"} />
            <span className={"text-[32px] leading-[40px] text-[#161717] text-center max-w-[450px]"}>
              There is no NFT Products for this time
            </span>
            <span className={"text-[16px] leading-[24px] font-light text-center text-[#677079]"}>
              But you can place your Position from Portfolio as NFT
            </span>
            <button className={"h-[50px] w-[300px] rounded-[8px] bg-[#292929] text-[#F8F8F8] text-[14px] leading-[14px]"}>LIST NFT</button>
          </div>
        </div>
      )}
      {items.length > 0 && (
        <div className={"flex flex-col mt-4 md:mt-9"}>
          <div className={"grid grid-cols-1 md:flex space-y-3 md:space-y-0 space-x-0 md:space-x-7"}>
            <Tab.Group>
              <Tab.List className='flex space-x-1 rounded-xl bg-[#EBEBEB] p-1'>
                {underlyingList.map((underlying, index) => (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      classNames(
                        "w-[140px] rounded-lg py-2.5 text-sm font-medium leading-5 text-black",
                        "focus:outline-none uppercase",
                        selected ? "bg-white" : ""
                      )
                    }
                    onClick={() => setUnderlying(underlying)}
                  >
                    {underlying}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
            <Tab.Group>
              <Tab.List className='flex space-x-1 rounded-xl bg-[#EBEBEB] p-1'>
                {ProductCategoryList.map((category, index) => (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      classNames(
                        "w-[140px] rounded-lg py-2.5 text-sm font-medium leading-5 text-black",
                        "focus:outline-none uppercase",
                        selected ? "bg-white" : ""
                      )
                    }
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </Tab>
                ))}
              </Tab.List>
            </Tab.Group>
          </div>

          <MarketplaceList items={items} />
        </div>
      )}
    </div>
  );
};

export default Marketplace;
