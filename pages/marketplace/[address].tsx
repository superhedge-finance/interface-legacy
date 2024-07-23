import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { RecapCard } from "../../components/commons/RecapCard";
import { ParaLight16, TitleH3 } from "../../components/basic";
import { ProductOffers } from "../../components/marketplace/ProductOffers";
import { ReturnsChart } from "../../components/product/ReturnsChart";
import { ActivityHeader, ActivityRow } from "../../components/commons/ActivityRow";
import { MarketplaceItemDetailType } from "../../types";
import { getTokenItem } from "../../service";
import { getCurrencyIcon, truncateAddress } from "../../utils/helpers";
import Timeline from "../../components/product/Timeline";
import { SUPPORT_CHAIN_IDS } from "../../utils/enums";
import { useNetwork } from "wagmi";
import { EXPLORER } from "../../utils/constants";
import Countdown from "react-countdown";
import axios from "../../service/axios";
import { ProductSpreads, ProductCategoryList } from "../../types";

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

const MarketplaceDetail = () => {
  const router = useRouter();
  const { chain } = useNetwork();
  const { address } = router.query;

  const [item, setItem] = useState<MarketplaceItemDetailType>();
  const [imageURL, setImageURL] = useState("");

  const chainId = useMemo(() => {
    if (chain) return chain.id;
    return SUPPORT_CHAIN_IDS.GOERLI;
  }, [chain]);

  useEffect(() => {
    (async () => {
      const _item = await getTokenItem(address as string, chainId);
      if (_item) { 
        setItem(_item);
        const { data } = await axios.get(_item.issuanceCycle.url);
        setImageURL(data.image);
      }
    })();
  }, [address, chainId]);

  const { currency1, currency2 } = useMemo(() => {
    if (item) return getCurrencyIcon(item.underlying);
    return { currency1: "/currency/usdc.svg", currency2: "/currency/eth.svg" };
  }, [item]);

  const categoryIndex = useMemo(() => {
    if (item && item.name.toLowerCase().includes("bullish")) {
      return 0;
    } else if (item && item.name.toLowerCase().includes("bearish")) {
      return 1;
    } else if (item && item.name.toLowerCase().includes("range")) {
      return 2;
    }
    return -1;
  }, [item]);

  /* const bestOfferPrice = useMemo(() => {
    if (item) {
      // get the best offer price from offers array
      const bestOffer = item.offers.reduce((prev, current) => (prev.price > current.price ? prev : current));
      return bestOffer.price;
    }
    return 0;
  }, [item]); */

  return (
    <div className={"py-[80px] flex justify-center"}>
      <div className={"max-w-[650px] w-full"}>
        {item && (
          <div className={"flex flex-col w-full"}>
            <div className={"flex sm:items-center w-full flex-col sm:flex-row sm:justify-between"}>
              <TitleH3 className={"bg-clip-text text-transparent bg-primary-gradient mb-3 sm:mb-0"}>
                NFT details
              </TitleH3>

              {categoryIndex >= 0 && (
                <div>
                  <span className={`text-white text-sm mr-2 py-2 px-3 rounded-lg ${ProductSpreads[categoryIndex].className}`}>
                    {ProductSpreads[categoryIndex].label}
                  </span>
                
                  <span className={`text-white text-sm py-2 px-3 rounded-lg ${ProductSpreads[categoryIndex].className}`}>
                    {ProductCategoryList[categoryIndex + 1]}
                  </span>
                </div>
              )}
            </div>

            <div className={"flex justify-between w-full mt-12 items-end"}>
              <div className='flex flex-row'>
                <div className={"relative flex items-center mr-[40px]"}>
                  <Image src={currency2} className='rounded-full' alt='Product Logo' width={60} height={60} />
                  <Image src={currency1} className='rounded-full absolute left-[40px]' alt='Product Logo' width={60} height={60} />
                </div>
                <div className='flex flex-col justify-around ml-3'>
                  <h5 className='text-[44px] text-black'>{item.underlying}</h5>
                  <span className='text-[20px] font-light text-gray-700'>{item.name}</span>
                </div>
              </div>
              <div className={"flex flex-col items-center"}>
                <div className='flex items-center mb-1'>
                  <span className='d-block text-sm font-normal text-gray-700 dark:text-gray-400 mr-1'>Estimated APY</span>
                  <div className="group relative flex justify-end">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 8.5C6.14167 8.5 6.2605 8.452 6.3565 8.356C6.45217 8.26033 6.5 8.14167 6.5 8V5.9875C6.5 5.84583 6.45217 5.72917 6.3565 5.6375C6.2605 5.54583 6.14167 5.5 6 5.5C5.85833 5.5 5.73967 5.54783 5.644 5.6435C5.548 5.7395 5.5 5.85833 5.5 6V8.0125C5.5 8.15417 5.548 8.27083 5.644 8.3625C5.73967 8.45417 5.85833 8.5 6 8.5ZM6 4.5C6.14167 4.5 6.2605 4.452 6.3565 4.356C6.45217 4.26033 6.5 4.14167 6.5 4C6.5 3.85833 6.45217 3.7395 6.3565 3.6435C6.2605 3.54783 6.14167 3.5 6 3.5C5.85833 3.5 5.73967 3.54783 5.644 3.6435C5.548 3.7395 5.5 3.85833 5.5 4C5.5 4.14167 5.548 4.26033 5.644 4.356C5.73967 4.452 5.85833 4.5 6 4.5ZM6 11C5.30833 11 4.65833 10.8687 4.05 10.606C3.44167 10.3437 2.9125 9.9875 2.4625 9.5375C2.0125 9.0875 1.65633 8.55833 1.394 7.95C1.13133 7.34167 1 6.69167 1 6C1 5.30833 1.13133 4.65833 1.394 4.05C1.65633 3.44167 2.0125 2.9125 2.4625 2.4625C2.9125 2.0125 3.44167 1.65617 4.05 1.3935C4.65833 1.13117 5.30833 1 6 1C6.69167 1 7.34167 1.13117 7.95 1.3935C8.55833 1.65617 9.0875 2.0125 9.5375 2.4625C9.9875 2.9125 10.3437 3.44167 10.606 4.05C10.8687 4.65833 11 5.30833 11 6C11 6.69167 10.8687 7.34167 10.606 7.95C10.3437 8.55833 9.9875 9.0875 9.5375 9.5375C9.0875 9.9875 8.55833 10.3437 7.95 10.606C7.34167 10.8687 6.69167 11 6 11ZM6 10C7.10833 10 8.05217 9.6105 8.8315 8.8315C9.6105 8.05217 10 7.10833 10 6C10 4.89167 9.6105 3.94783 8.8315 3.1685C8.05217 2.3895 7.10833 2 6 2C4.89167 2 3.948 2.3895 3.169 3.1685C2.38967 3.94783 2 4.89167 2 6C2 7.10833 2.38967 8.05217 3.169 8.8315C3.948 9.6105 4.89167 10 6 10Z" fill="#677079"/>
                    </svg>
                    <span className="absolute bottom-5 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 w-[250px]">
                      {item.estimatedApy}
                    </span>
                  </div>
                </div>
                <span className='font-medium leading-tight text-3xl text-transparent bg-primary-gradient bg-clip-text'>
                  {item.issuanceCycle.apy}
                </span>
              </div>
            </div>

            <div className={"flex items-center w-full mt-12 space-x-4"}>
              <div className={`flex flex-col flex-1 items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4`}>
                <p className='text-[12px] font-light text-gray-700'>Time to Maturity</p>
                <h3 className='text-[18px] font-light text-black'>
                  <Countdown 
                    intervalDelay={60000} 
                    date={item.issuanceCycle.maturityDate * 1000} 
                    renderer={issuance_date_renderer} 
                  />
                </h3>
              </div>
              <RecapCard label={"Coupon"} value={`${item.issuanceCycle.coupon / 100}% / WEEK`} />
              <RecapCard label={"Principal Protection"} value={"100%"} />
            </div>

            <div className={"flex items-center w-full mt-3 space-x-4"}>
              <RecapCard label={"Best Offer Price"} value={`${item.offerPrice.toLocaleString()} USDC`} />
              <RecapCard label={"Total Lots Offered"} value={`${item.totalLots} LOTS`} />
              <RecapCard label={"Market Price"} value={`${item.mtmPrice ? item.mtmPrice.toLocaleString() : 0 } USDC`} />
            </div>

            <div className={"flex items-center justify-center mt-8 text-lg"}>
              <span className={"text-[#677079] mr-2"}>Product&nbsp;:</span>
              <span className={"mr-2 bg-clip-text text-transparent bg-primary-gradient"}>{truncateAddress(item.productAddress)}</span>
              <a href={`${EXPLORER[chainId]}/address/${item.productAddress}`} target={"_blank"} rel='noreferrer'>
                <Image src={"/icons/external.svg"} alt={"external"} width={20} height={20} />
              </a>
            </div>

            <div className={"flex flex-col w-full mt-[80px]"}>
              <TitleH3 className={"text-blacknew-100 mb-5"}>Choose product offer to buy</TitleH3>
              <ProductOffers offers={item.offers} imageUrl={imageURL} />
            </div>

            <div className={"mt-[80px] w-full"}>
              <TitleH3>Product Returns</TitleH3>

              <ReturnsChart
                tr1={item.issuanceCycle.tr1}
                tr2={item.issuanceCycle.tr2}
                strikePrice1={item.issuanceCycle.strikePrice1}
                strikePrice2={item.issuanceCycle.strikePrice2}
                strikePrice3={item.issuanceCycle.strikePrice3}
              />
            </div>

            <div className={"mt-[80px] flex flex-col space-y-5"}>
              <TitleH3>Vault Strategy</TitleH3>
              <ParaLight16>{item.vaultStrategy}</ParaLight16>
            </div>

            <div className={"mt-[80px] w-full flex flex-col space-y-5"}>
              <TitleH3>Product Lifecycle</TitleH3>
              <Timeline issuance={item.issuanceCycle.issuanceDate} maturity={item.issuanceCycle.maturityDate} />
            </div>

            <div className={"mt-[80px] flex flex-col space-y-5"}>
              <TitleH3>Risk</TitleH3>
              <ParaLight16>{item.risk}</ParaLight16>
            </div>

            <div className={"mt-[80px] flex flex-col space-y-5"}>
              <TitleH3>Fees</TitleH3>
              <ParaLight16>{item.fees}</ParaLight16>
            </div>

            <div className={"mt-[80px] flex flex-col space-y-5"}>
              <TitleH3>Counterparties</TitleH3>
              <ParaLight16>{item.counterparties}</ParaLight16>
            </div>

            <div className={"mt-[80px] w-full flex flex-col space-y-5"}>
              <TitleH3>Deposit Activity</TitleH3>
              <div className={"bg-white py-[30px] px-5 rounded-lg"}>
                <ActivityHeader />
                {item.deposits.map((activity, index) => {
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
    </div>
  );
};

export default MarketplaceDetail;
