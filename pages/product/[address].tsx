import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { ActionArea } from "../../components/product/ActionArea";
import { ParaLight16, SkeletonCard, SubtitleRegular20, TitleH2, TitleH3 } from "../../components/basic";
import { ReturnsChart } from "../../components/product/ReturnsChart";
import { getProduct } from "../../service";
import { IProduct, ProductSpreads, ProductStatus } from "../../types";
import { ActivityHeader, ActivityRow } from "../../components/commons/ActivityRow";
import Timeline from "../../components/product/Timeline";
import { getCurrencyIcon } from "../../utils/helpers";
import { RecapCard } from "../../components/commons/RecapCard";
import { SUPPORT_CHAIN_IDS } from "../../utils/enums";
import { DECIMAL, EXPLORER } from "../../utils/constants";

const activities = [
  {
    date: "22 Okt",
    amount: 10320,
    lots: 10,
    contract: "0x3826539Cbd8d68DCF119e80B994557B4278CeC9f"
  },
  {
    date: "21 Okt",
    amount: 5320,
    lots: 5,
    contract: "0x3826539Cbd8d68DCF119e80B994557B4278CeC9f"
  },
  {
    date: "19 Okt",
    amount: 7520,
    lots: 7,
    contract: "0x3826539Cbd8d68DCF119e80B994557B4278CeC9f"
  }
];

const RecapCardMobile = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className='flex md:flex-col w-full justify-between h-[40px] md:h-[66px] flex-1 items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4'>
      <p className='text-[16px] md:text-[12px] font-light text-gray-700'>{label}</p>
      <h3 className='text-[16px] md:text-[20px] font-light text-black'>{value}</h3>
    </div>
  );
};

const ProductDetail = () => {
  const router = useRouter();
  const { chain } = useNetwork();
  const { address } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);

  const chainId = useMemo(() => {
    if (chain) return chain.id;
    return SUPPORT_CHAIN_IDS.GOERLI;
  }, [chain]);

  const capacity = useMemo(() => {
    if (product) {
      return Number(ethers.utils.formatUnits(product.currentCapacity, DECIMAL[chainId]));
    }
    return 0;
  }, [product]);

  const currency1 = useMemo(() => {
    if (product) {
      return getCurrencyIcon(product.underlying).currency1;
    }
    return "/currency/usdc.svg";
  }, [product]);

  const currency2 = useMemo(() => {
    if (product) {
      return getCurrencyIcon(product.underlying).currency2;
    }
    return "/currency/eth.svg";
  }, [product]);

  const categoryIndex = useMemo(() => {
    if (product && product.name.toLowerCase().includes("bullish")) {
      return 0;
    } else if (product && product.name.toLowerCase().includes("bearish")) {
      return 1;
    } else if (product && product.name.toLowerCase().includes("range")) {
      return 2;
    }
    return -1;
  }, [product]);

  const investment_duration = useMemo(() => {
    if (product) {
      return Math.floor((product.issuanceCycle.maturityDate - product.issuanceCycle.issuanceDate) / 3600 / 24) + "D";
    }
    return "0D";
  }, [product]);

  useEffect(() => {
    return () => {
      setIsLoading(true);
      getProduct(address as string, chainId)
        .then((product) => {
          setProduct(product);
        })
        .finally(() => setIsLoading(false));
    };
  }, [address, chainId]);

  return (
    <div>
      {isLoading && <SkeletonCard />}
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 px-0 md:px-12 relative"}>
        <div className={"col-span-1"}>
          {!isLoading && product && (
            <div className='flex flex-col px-0 py-6 md:px-6'>
              <div>
                <span className={`inline-block text-white text-sm py-2 px-3 rounded-lg ${ProductStatus[product.status].className}`}>
                  {ProductStatus[product.status].label}
                </span>
                {categoryIndex >= 0 && (
                  <span className={`inline-block text-white text-sm ml-3 px-4 py-2 rounded-lg ${ProductSpreads[categoryIndex].className}`}>
                    {ProductSpreads[categoryIndex].label}
                  </span>
                )}
              </div>
              <div className={"flex justify-between items-end my-5"}>
                <div className='flex flex-row'>
                  <div className={"relative flex items-center mr-[40px]"}>
                    <img
                      src={currency1}
                      className='rounded-full w-[40px] md:w-[60px] h-[40px] md:h-[60px]'
                      alt='Product Logo'
                      width={"100%"}
                      height={"100%"}
                    />
                    <img
                      src={currency2}
                      className='rounded-full w-[40px] md:w-[60px] h-[40px] md:h-[60px] absolute left-[30px] md:left-[40px]'
                      alt='Product Logo'
                      width={"100%"}
                      height={"100%"}
                    />
                  </div>
                  <div className='flex flex-col justify-around ml-3'>
                    <TitleH2 className='text-black'>{product.underlying}</TitleH2>
                    <SubtitleRegular20>{product.name}</SubtitleRegular20>
                  </div>
                </div>
                <div className={"hidden md:flex flex-col items-center"}>
                  <span className='d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400'>Estimated APY</span>
                  <span className='font-medium leading-tight text-3xl text-transparent bg-primary-gradient bg-clip-text'>
                    {product.issuanceCycle.apy}
                  </span>
                </div>
              </div>
              <div className={"flex flex-col flex-1"}>
                <div className='flex justify-between my-1'>
                  <span className='text-sm text-gray-700'>Amount deposited</span>
                  <span className='text-sm text-gray-700'>USDC {capacity.toLocaleString()}</span>
                </div>
                <div className='w-full bg-[#00000014] rounded my-1'>
                  <div
                    className='bg-gray-600 h-2 rounded'
                    style={{
                      width: (capacity / Number(product.maxCapacity)) * 100 + "%",
                      background: "linear-gradient(267.56deg, #11CB79 14.55%, #11A692 68.45%, #002366 136.67%)"
                    }}
                  ></div>
                </div>
                <div className='flex justify-between mb-2'>
                  <span className='text-sm text-gray-700'>Max</span>
                  <span className='text-sm text-gray-700'>USDC {Number(product.maxCapacity.toString()).toLocaleString()}</span>
                </div>
              </div>
              <div className={"block md:hidden"}>
                <RecapCard label={"Estimated APY"} value={product.issuanceCycle.apy} />
              </div>

              <div className={"flex flex-col mt-[80px]"}>
                <TitleH3>Product Recap</TitleH3>
                <div
                  className={"flex flex-col md:flex-row items-center justify-between space-x-0 md:space-x-2 space-y-3 md:space-y-0 mt-5"}
                >
                  <RecapCardMobile label={"Investment Duration"} value={investment_duration} />
                  <RecapCardMobile label={"Coupon"} value={`${product.issuanceCycle.coupon / 100}% / WEEK`} />
                  <RecapCardMobile label={"Principal Protection"} value={"100%"} />
                </div>
                <div className={"grid md:grid-cols-4 grid-cols-2 gap-2 mt-2"}>
                  <RecapCard label={"Strike 1 price"} value={`${product.issuanceCycle.strikePrice1.toLocaleString()}`} />
                  <RecapCard label={"Strike 2 price"} value={`${product.issuanceCycle.strikePrice2.toLocaleString()}`} />
                  <RecapCard label={"Strike 3 price"} value={`${product.issuanceCycle.strikePrice3.toLocaleString()}`} />
                  <RecapCard label={"Strike 4 price"} value={`${product.issuanceCycle.strikePrice4.toLocaleString()}`} />
                </div>
              </div>

              <div className={"mt-[80px]"}>
                <TitleH3>Product Returns</TitleH3>
                <ReturnsChart
                  strikePrice1={product.issuanceCycle.strikePrice1}
                  strikePrice2={product.issuanceCycle.strikePrice2}
                  strikePrice3={product.issuanceCycle.strikePrice3}
                  tr1={product.issuanceCycle.tr1}
                  tr2={product.issuanceCycle.tr2}
                />
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>Vault Strategy</TitleH3>
                <img src={"/products/vault_strategy.png"} alt={"vault strategy"} width={"100%"} />
                <ParaLight16>
                  The vault allocates the majority of investors deposits to a verified &apos;bluechip&apos; yield-source, earning interests
                  to ensure principal-protection and to pay weekly coupons. A small allocation is invested in a ETH/USDC Put-Spread option,
                  which pays additional profits, if the option expires &apos;in the money&apos;. The profits earned from the coupons and
                  options are reinvested in additional NFT-SN in the next cycle, effectively compounding the investors&apos; returns
                  progressively.
                </ParaLight16>
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>Product Lifecycle</TitleH3>
                <Timeline issuance={product.issuanceCycle.issuanceDate} maturity={product.issuanceCycle.maturityDate} />
                {/*<img src={'/portfolio/product_lifecycle.svg'} alt={'lifecycle'} width={'100%'} />*/}
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>Risk</TitleH3>
                <ParaLight16>
                  The primary risk is the smart contract risk of yield-protocols that have majority allocations. The secondary risk is
                  counterparty risk from market makers who are the underwriters of the options.
                </ParaLight16>
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>Fees</TitleH3>
                <ParaLight16>
                  The vault applies a charge of 10% on profits between cycles, where profits include the coupons and option profits, if any.
                  There are no management fees.
                </ParaLight16>
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>Counterparties</TitleH3>
                <ParaLight16>
                  Counterparties for the options are either fully margined on Deribit exchange, or fully verified market makers.
                </ParaLight16>
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>Deposit Activity</TitleH3>
                <div className={"bg-white py-[30px] px-5 rounded-lg"}>
                  <ActivityHeader />
                  {activities.map((activity, index) => {
                    return (
                      <ActivityRow
                        key={index}
                        activity={activity}
                        className={index % 2 === 0 ? "bg-[#00000014]" : "bg-white"}
                        blockExplorer={EXPLORER[chainId]}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        {!isLoading && product && <ActionArea productAddress={product.address} product={product} />}
      </div>
    </div>
  );
};

export default ProductDetail;
