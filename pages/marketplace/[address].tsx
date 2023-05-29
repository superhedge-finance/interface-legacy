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
                <span className='d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400'>Estimated APY</span>
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
              <RecapCard label={"Total Lots"} value={`${item.totalLots} LOTS`} />
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
    </div>
  );
};

export default MarketplaceDetail;
