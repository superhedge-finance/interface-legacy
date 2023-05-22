import { useEffect, useMemo, useState } from "react";
import { Tab } from "@headlessui/react";
import Product from "./Product";
import { SkeletonCard } from "../basic";
import { getProducts } from "../../service";
import { ProductCategoryList, IProduct } from "../../types";
import { classNames } from "../../styles/helper";
import { SUPPORT_CHAIN_IDS } from "../../utils/enums";
import { useNetwork } from "wagmi";

export default function ProductList() {
  const { chain } = useNetwork();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (category === "All") return true;
        return product.name.toLowerCase().includes(category.toLowerCase());
      });
  }, [products, category]);

  const bullishProducts = useMemo(() => {
    return filteredProducts.filter((product) => product.name.toLowerCase().includes("bullish"));
  }, [filteredProducts]);

  const bearishProducts = useMemo(() => {
    return filteredProducts.filter((product) => product.name.toLowerCase().includes("bearish"));
  }, [filteredProducts]);

  const rangeProducts = useMemo(() => {
    return filteredProducts.filter((product) => product.name.toLowerCase().includes("range"));
  }, [filteredProducts]);

  const chainId = useMemo(() => {
    if (chain) return chain.id;
    return SUPPORT_CHAIN_IDS.GOERLI;
  }, [chain]);

  useEffect(() => {
    (async () => {
      try {
        setIsProductLoading(true);
        const _products = await getProducts(chainId);
        setProducts(_products);
        // if (_products.length > 0) setProducts(_products);
      } catch (e) {
        console.error(e);
      } finally {
        setIsProductLoading(false);
      }
    })();
  }, [chainId]);

  if (isProductLoading) {
    return (
      <div className={"col-span-2"}>
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className='w-4/5 px-2 sm:px-0 mx-auto'>
      <div className='flex justify-center'>
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

      {/** BULLISH PRODUCTS **/}
      {(category === "All" || category === "BULLISH") && (
        <div className='md:mt-[50px] mt-8 flex flex-col'>
          <div>
            <span className='bg-clip-text text-transparent bg-primary-gradient text-[40px]'>Bullish Products</span>
            <p className='max-w-md text-[16px] leading-[24px] text-grey-70'>
              Invest in these vaults if you feel that Ethereum will increase in price over the next month.
            </p>
          </div>
          <div className='flex flex-wrap gap-6 md:gap-8 mt-6'>
            {!isProductLoading && bullishProducts.map((product, idx) => <Product key={idx} product={product} />)}
          </div>
        </div>
      )}

      {/** BEARISH PRODUCTS **/}
      {(category === "All" || category === "BEARISH") && (
        <div className='md:mt-[100px] mt-8 flex flex-col'>
          <div>
            <span className='bg-clip-text text-transparent bg-primary-gradient text-[40px]'>Bearish Products</span>
            <p className='max-w-md text-[16px] leading-[24px] text-grey-70'>
              Invest in these vaults if you feel that Ethereum will decrease in price over the next month.
            </p>
          </div>
          <div className='flex flex-wrap gap-6 md:gap-8 mt-6'>
            {!isProductLoading && bearishProducts.map((product, idx) => <Product key={idx} product={product} />)}
          </div>
        </div>
      )}

      {/** RANGE PRODUCTS **/}
      {(category === "All" || category === "RANGE") && (
        <div className='md:mt-[100px] mt-8 flex flex-col'>
          <div>
            <span className='bg-clip-text text-transparent bg-primary-gradient text-[40px]'>Range Products</span>
            <p className='max-w-md text-[16px] leading-[24px] text-grey-70'>
              Invest in these vaults if you feel that Ethereum will range in price over the next month.
            </p>
          </div>
          <div className='flex flex-wrap gap-6 md:gap-8 mt-6'>
            {!isProductLoading && rangeProducts.map((product, idx) => <Product key={idx} product={product} />)}
          </div>
        </div>
      )}
    </div>
  );
}
