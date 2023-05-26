import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Tab } from "@headlessui/react";
import { useNetwork } from "wagmi";
import { classNames } from "../../styles/helper";
import { ProductCategoryList } from "../../types";
import { MarketplaceItemType } from "../../types";
import MarketplaceItem from "../../components/marketplace/Item";
import { getListedItems } from "../../service";
import { SUPPORT_CHAIN_IDS } from "../../utils/enums";

const Marketplace = () => {
  const { chain } = useNetwork();

  const [items, setItems] = useState<Array<MarketplaceItemType>>([]);
  const [category, setCategory] = useState("All");

  const chainId = useMemo(() => {
    if (chain) return chain.id;
    return SUPPORT_CHAIN_IDS.GOERLI;
  }, [chain]);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (category === "All") return true;
        return item.name.toLowerCase().includes(category.toLowerCase());
      });
  }, [items, category]);

  useEffect(() => {
    (async () => {
      const _items = await getListedItems(chainId);
      setItems(_items);
    })();
  }, [chainId]);

  return (
    <div className={"py-12"}>
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
            <Link href={"/portfolio"}>
              <div
                className={
                  "h-[50px] w-[300px] rounded-[8px] bg-[#292929] text-[#F8F8F8] text-[14px] leading-[14px] flex items-center justify-center"
                }
              >
                LIST NFT
              </div>
            </Link>
          </div>
        </div>
      )}
      {items.length > 0 && (
        <div className={"flex flex-col"}>
          <div className={"md:flex justify-center"}>
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

          <div className={"flex flex-col"}>
            <div className={"grid grid-cols-1 md:grid-cols-3 mt-12 gap-x-0 md:gap-x-5 gap-y-5 md:gap-y-8"}>
              {filteredItems.map((item, index) => (
                <MarketplaceItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
