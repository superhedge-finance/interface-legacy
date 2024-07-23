import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { ActionArea } from "../../components/product/ActionArea";
import { ParaLight16, SkeletonCard, SubtitleRegular20, TitleH2, TitleH3 } from "../../components/basic";
import { ReturnsChart } from "../../components/product/ReturnsChart";
import { getProduct } from "../../service";
import { ProductDetailType, ProductSpreads, ProductStatus } from "../../types";
import { ActivityHeader, ActivityRow } from "../../components/commons/ActivityRow";
import Timeline from "../../components/product/Timeline";
import { getCurrencyIcon, formatStrikePrice, formatDuration } from "../../utils/helpers";
import { RecapCard } from "../../components/commons/RecapCard";
import { RecapCardMobile } from "../../components/commons/RecapCardMobile";
import { SUPPORT_CHAIN_IDS } from "../../utils/enums";
import { DECIMAL, EXPLORER } from "../../utils/constants";
import Countdown from "react-countdown";

const issuance_date_renderer = ({
  days,
  hours,
  minutes,
  completed
}: {
  days: number;
  hours: number;
  minutes: number;
  completed: boolean;
}) => {
  if (completed) {
    return <span>{`${days}D : ${hours}H : ${minutes}M`}</span>;
  } else {
    return <span>{`${days}D : ${hours}H : ${minutes}M`}</span>;
  }
};

const ProductDetail = () => {
  const router = useRouter();
  const { chain } = useNetwork();
  const { address } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductDetailType | undefined>(undefined);

  const chainId = useMemo(() => {
    if (chain) return chain.id;
    return SUPPORT_CHAIN_IDS.GOERLI;
  }, [chain]);

  const capacity = useMemo(() => {
    if (product) {
      return Number(ethers.utils.formatUnits(product.currentCapacity, DECIMAL[chainId]));
    }
    return 0;
  }, [product, chainId]);

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
      const duration = product.issuanceCycle.maturityDate - product.issuanceCycle.issuanceDate;
      return formatDuration(duration);
    }
    return "0D : 0H";
  }, [product]);

  useEffect(() => {
    setIsLoading(true);
    getProduct(address as string, chainId)
      .then((product) => {
        setProduct(product);
      })
      .finally(() => setIsLoading(false));
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
                  className={"md:flex flex-col md:flex-row items-center justify-between space-x-0 md:space-x-2 space-y-3 md:space-y-0 mt-5"}
                >
                  <RecapCardMobile label={product.status == 3 ? "Time to Maturity" : "Time to Issuance"} value={
                    <Countdown 
                      intervalDelay={60000} 
                      date={(product.status == 3 ? product.issuanceCycle.maturityDate : product.issuanceCycle.issuanceDate) * 1000} 
                      renderer={issuance_date_renderer} 
                    />}
                  />
                  <RecapCardMobile label={"Investment Duration"} value={investment_duration} />
                  <RecapCardMobile label={"Coupon"} value={`${product.issuanceCycle.coupon / 100}% / WEEK`} />
                  <RecapCardMobile label={"Principal Protection"} value={"100%"} />
                </div>
                <div className={"grid md:grid-cols-4 grid-cols-2 gap-2 mt-2"}>
                  <RecapCard label={"Strike 1 price"} value={formatStrikePrice(product.issuanceCycle.strikePrice1)} />
                  <RecapCard label={"Strike 2 price"} value={formatStrikePrice(product.issuanceCycle.strikePrice2)} />
                  <RecapCard label={"Strike 3 price"} value={formatStrikePrice(product.issuanceCycle.strikePrice3)} />
                  <RecapCard label={"Strike 4 price"} value={formatStrikePrice(product.issuanceCycle.strikePrice4)} />
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
                <ParaLight16>{product.vaultStrategy}</ParaLight16>
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>Product Lifecycle</TitleH3>
                <Timeline issuance={product.issuanceCycle.issuanceDate} maturity={product.issuanceCycle.maturityDate} />
                {/*<img src={'/portfolio/product_lifecycle.svg'} alt={'lifecycle'} width={'100%'} />*/}
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>Risk</TitleH3>
                <ParaLight16>{product.risk}</ParaLight16>
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>Fees</TitleH3>
                <ParaLight16>{product.fees} </ParaLight16>
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>Counterparties</TitleH3>
                <ParaLight16>{product.counterparties}</ParaLight16>
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>Deposit Activity</TitleH3>
                <div className={"bg-white py-[30px] px-5 rounded-lg"}>
                  <ActivityHeader />
                  {product.deposits.map((activity, index) => {
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
