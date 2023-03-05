import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { RecapCard } from "../../components/commons/RecapCard";
import { ParaLight16, SubtitleLight12, TagRegular12, TitleH2, TitleH3 } from "../../components/basic";
import { ProductOffers } from "../../components/marketplace/ProductOffers";
import { ReturnsChart } from "../../components/product/ReturnsChart";
import { ActivityHeader, ActivityRow } from "../../components/commons/ActivityRow";
import { MarketplaceItemDetailType } from "../../types";
import { getTokenItem } from "../../service";
import { getCurrencyIcon } from "../../utils/helpers";
import Timeline from "../../components/product/Timeline";

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
  const { id } = router.query;

  const [item, setItem] = useState<MarketplaceItemDetailType>();

  useEffect(() => {
    (async () => {
      const _item = await getTokenItem(id as string);
      if (_item) setItem(_item);
    })();
  }, [id]);

  const { currency1, currency2 } = useMemo(() => {
    if (item) return getCurrencyIcon(item.underlying);
    return { currency1: "/currency/usdc.svg", currency2: "/currency/eth.svg" };
  }, [item]);

  const bestOfferPrice = useMemo(() => {
    if (item) {
      // get the best offer price from offers array
      const bestOffer = item.offers.reduce((prev, current) => (prev.price > current.price ? prev : current));
      return bestOffer.price;
    }
    return 0;
  }, [item]);

  return (
    <div className={"py-[80px] flex justify-center"}>
      <div className={"max-w-[650px] w-full"}>
        {item && (
          <div className={"flex flex-col items-center w-full"}>
            <div className={"flex items-center w-full justify-between"}>
              <TitleH2>
                <span className={"bg-clip-text text-transparent bg-primary-gradient"}>NFT details</span>
              </TitleH2>

              <div className={"flex items-center py-[10px] px-4 bg-callSpread rounded-[6px]"}>
                <TagRegular12 className={"text-whitenew-100"}>Bullish Invest</TagRegular12>
              </div>
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
              <RecapCard label={"Best Offer Price"} value={`${bestOfferPrice.toLocaleString()} USDC`} />
              <RecapCard label={"Total Lots"} value={`${item.totalLots} LOTS`} />
              <RecapCard label={"Market Price"} value={`${item.mtmPrice.toLocaleString()} USDC`} />
            </div>

            <div className={"flex flex-col w-full mt-[80px]"}>
              <TitleH3 className={"text-blacknew-100 mb-5"}>Choose product offer to buy</TitleH3>
              <ProductOffers offers={item.offers} listingId={item.listingId} />
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
              <img src={"/products/vault_strategy.png"} alt={"vault strategy"} width={"100%"} />
              <ParaLight16>
                The vault earns yield on its ETH deposits by running a weekly automated ETH covered call strategy where it stakes its ETH
                deposits in and then uses its to collateralize weekly out-of-money ETH call options. The yield earned from both the covered
                call strategy and the ETH staking rewards are reinvested weekly, effectively compounding the yields for depositors over
                time.
              </ParaLight16>
            </div>

            <div className={"mt-[80px] w-full flex flex-col space-y-5"}>
              <TitleH3>Product Lifecycle</TitleH3>
              <Timeline issuance={item.issuanceCycle.issuanceDate} maturity={item.issuanceCycle.maturityDate} />
            </div>

            <div className={"mt-[80px] w-full flex flex-col space-y-5"}>
              <TitleH3>Product Payoff</TitleH3>
              <div className={"flex flex-col bg-white p-5"}>
                <img src={"/products/payoff_chart.png"} alt={"payoff chart"} width={"100%"} />
                <div className={"flex flex-col items-center space-y-[10px] mt-4"}>
                  <span className={"bg-clip-text text-transparent bg-primary-gradient"}>2.36%</span>
                  <SubtitleLight12>ETH spot weekly % change</SubtitleLight12>
                </div>
                <div className={"grid grid-cols-3 gap-x-4 mt-8"}>
                  <RecapCard label={"Base yield"} value={"5.00%"} />
                  <RecapCard label={"Options moneyness"} value={"2.5%"} />
                  <RecapCard label={"Expected yield (APY)"} value={"7.36%"} />
                </div>
              </div>
            </div>

            <div className={"mt-[80px] flex flex-col space-y-5"}>
              <TitleH3>Risk</TitleH3>
              <ParaLight16>
                The primary risk for running this covered call strategy is that the vault may incur a weekly loss in the case where the call
                options sold by the vault expire in-the-money (meaning the price of ETH is above the strike price of the call options minted
                by the vault). The Theta Vault smart contracts have been audited by OpenZeppelin and ChainSafe. Despite that, users are
                advised to exercise caution and only risk funds they can afford to lose.
              </ParaLight16>
            </div>

            <div className={"mt-[80px] flex flex-col space-y-5"}>
              <TitleH3>Fees</TitleH3>
              <ParaLight16>
                The vault fee structure consists of a 15% flat fee on the yield earned between epochs. If the weekly strategy is profitable,
                the weekly performance fee is charged on the premiums earned and the weekly management fee is charged on the assets managed
                by the vault. If the weekly strategy is unprofitable, there are no fees charged.
              </ParaLight16>
            </div>

            <div className={"mt-[80px] flex flex-col space-y-5"}>
              <TitleH3>Counterparties</TitleH3>
              <ParaLight16>
                The vault funds its weekly twin-twin strategy with the yield earned from leading funds to a list of market makers vetted by
                SuperHedge.
              </ParaLight16>
            </div>

            <div className={"mt-[80px] w-full flex flex-col space-y-5"}>
              <TitleH3>Deposit Activity</TitleH3>
              <div className={"bg-white py-[30px] px-5 rounded-lg"}>
                <ActivityHeader />
                {activities.map((activity, index) => {
                  return <ActivityRow key={index} activity={activity} className={index % 2 === 0 ? "bg-[#00000014]" : "bg-white"} />;
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
