import { useEffect, useMemo, useState } from "react";
import { Tab } from "@headlessui/react";
import Product from "./Product";
import { SkeletonCard } from "../basic";
import { getProducts } from "../../service";
import { ProductCategoryList, ProductUnderlyingList, IProduct } from "../../types";
import { classNames } from "../../styles/helper";
import { SUPPORT_CHAIN_IDS } from "../../utils/enums";
import { useNetwork } from "wagmi";

export default function ProductList() {
  const { chain } = useNetwork();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [underlying, setUnderlying] = useState("All");
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (underlying === "All") return true;
        return product.underlying === underlying;
      })
      .filter((product) => {
        if (category === "All") return true;
        return product.name.toLowerCase().includes(category.toLowerCase());
      });
  }, [products, underlying, category]);

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
    <div className='w-full mr-8 px-2 sm:px-0'>
      <div className='flex-col md:flex-row md:flex md:space-x-7 space-y-3 md:space-y-0'>
        <Tab.Group>
          <Tab.List className='flex space-x-1 rounded-xl bg-[#EBEBEB] p-1'>
            {ProductUnderlyingList.map((underlying, index) => (
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

      {/** BULLISH PRODUCTS **/}
      {(category === "All" || category === "BULLISH") && (
        <div className='md:mt-[60px] mt-8 flex flex-col'>
          <h1 className='text-[44px] text-grey-80'>Bullish Products</h1>
          <p className='max-w-md text-[16px] leading-[24px] text-grey-70'>
            We try to provide the most accurate and up-to-date list of cryptos with the most accurate rates and information.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6'>
            {!isProductLoading && bullishProducts.map((product, idx) => <Product key={idx} product={product} />)}
          </div>
        </div>
      )}

      {/** BEARISH PRODUCTS **/}
      {(category === "All" || category === "BEARISH") && (
        <div className='md:mt-[100px] mt-8 flex flex-col'>
          <h1 className='text-[44px] text-grey-80'>Bearish Products</h1>
          <p className='max-w-md text-[16px] leading-[24px] text-grey-70'>
            We try to provide the most accurate and up-to-date list of cryptos with the most accurate rates and information.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6'>
            {!isProductLoading && bearishProducts.map((product, idx) => <Product key={idx} product={product} />)}
          </div>
        </div>
      )}

      {/** RANGE PRODUCTS **/}
      {(category === "All" || category === "RANGE") && (
        <div className='md:mt-[100px] mt-8 flex flex-col'>
          <h1 className='text-[44px] text-grey-80'>Range Products</h1>
          <p className='max-w-md text-[16px] leading-[24px] text-grey-70'>
            We try to provide the most accurate and up-to-date list of cryptos with the most accurate rates and information.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6'>
            {!isProductLoading && rangeProducts.map((product, idx) => <Product key={idx} product={product} />)}
          </div>
        </div>
      )}
    </div>
  );
}
