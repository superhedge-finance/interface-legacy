import { useMemo } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { ProductSpreads, ProductStatus, ProductCategoryList, IProduct } from "../../types";
import { ReturnsChart } from "../product/ReturnsChart";
import { getCurrencyIcon, formatDuration } from "../../utils/helpers";
import { RecapCard } from "../commons/RecapCard";
import { RecapCardMobile } from "../commons/RecapCardMobile";

import { SubtitleRegular16, TitleH3 } from "../basic";
import Countdown from "react-countdown";
import { useNetwork } from "wagmi";
import { SUPPORT_CHAIN_IDS } from "../../utils/enums";
import { DECIMAL } from "../../utils/constants";

export default function Product({ product }: { product: IProduct }) {

  const router = useRouter();

  const { chain } = useNetwork();

  const chainId = useMemo(() => {
    if (chain) return chain.id;
    return SUPPORT_CHAIN_IDS.GOERLI;
  }, [chain]);

  const capacity = useMemo(() => {
    return Number(ethers.utils.formatUnits(product.currentCapacity, DECIMAL[chainId]));
  }, [product, chainId]);

  const categoryIndex = useMemo(() => {
    if (product.name.toLowerCase().includes("bullish")) {
      return 0;
    } else if (product.name.toLowerCase().includes("bearish")) {
      return 1;
    } else if (product.name.toLowerCase().includes("range")) {
      return 2;
    }
    return -1;
  }, [product]);

  const { currency1, currency2 } = getCurrencyIcon(product.underlying);

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

  const investment_duration = useMemo(() => {
    if (product) {
      const duration = product.issuanceCycle.maturityDate - product.issuanceCycle.issuanceDate;
      return formatDuration(duration);
    }
    return "0D : 0H";
  }, [product]);

  return (
    <div 
      className='flex flex-col p-5 cursor-pointer m-[15px] rounded-[12px] bg-white w-[340px] sm:w-[470px] drop-shadow hover:outline outline-2 outline-[#11CB79]' 
      onClick={() => {router.push(`/product/${product.address}`)}}
    >
      <div className={"flex justify-between"}>
        <div className={"inline-block"}>
          <span className={`text-white text-sm py-2 px-3 rounded-lg ${ProductStatus[product.status].className}`}>
            {ProductStatus[product.status].label}
          </span>
          {categoryIndex >= 0 && (
            <span className={`text-white text-sm ml-2 px-4 py-2 rounded-lg ${ProductSpreads[categoryIndex].className}`}>
              {ProductSpreads[categoryIndex].label}
            </span>
          )}
          {categoryIndex >= 0 && (
            <span className={`text-white text-sm ml-2 py-2 px-3 rounded-lg ${ProductSpreads[categoryIndex].className}`}>
              {ProductCategoryList[categoryIndex + 1]}
            </span>
          )}
        </div>
        <div className={"hidden sm:block w-[40px] md:w-[60px] h-[36px] md:h-[54px]"}>
          <img src={"/icons/social_logo.svg"} alt={"social logo"} width={"100%"} height={"100% "} />
        </div>
      </div>
      <div className={"flex justify-between items-end my-5 md:my-4"}>
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
            <TitleH3 className='text-black'>{product.underlying}</TitleH3>
            <SubtitleRegular16>{product.name}</SubtitleRegular16>
          </div>
        </div>
        <div className={"hidden md:flex flex-col items-center"}>
          <span className='d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400'>Estimated APY</span>
          <h3 className='font-medium leading-tight text-3xl bg-clip-text text-transparent bg-primary-gradient'>
            {product.issuanceCycle.apy}
          </h3>
        </div>
      </div>
      <div className={"flex flex-col"}>
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

      <div>
        <ReturnsChart
          strikePrice1={product.issuanceCycle.strikePrice1}
          strikePrice2={product.issuanceCycle.strikePrice2}
          strikePrice3={product.issuanceCycle.strikePrice3}
          tr1={product.issuanceCycle.tr1}
          tr2={product.issuanceCycle.tr2}
        />
      </div>

      <div className={"flex-col md:flex-row md:flex space-y-3 md:space-y-0 md:space-x-2 items-center justify-between mt-3"}>
        <RecapCardMobile label={product.status == 3 ? "Time to Maturiy" : "Time to Issuance"} value={
          <Countdown 
            intervalDelay={60000} 
            date={(product.status == 3 ? product.issuanceCycle.maturityDate : product.issuanceCycle.issuanceDate) * 1000} 
            renderer={issuance_date_renderer} 
          />
        }></RecapCardMobile>
        <RecapCardMobile label={"Investment Duration"} value={investment_duration}></RecapCardMobile>
        <RecapCardMobile label={"Principal Protection"} value={"100%"}></RecapCardMobile>
      </div>
    </div>
  );
}
