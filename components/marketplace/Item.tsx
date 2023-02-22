import Image from "next/image";
import { useRouter } from "next/router";
import { PrimaryButton } from "../basic";
import { RecapCard } from "../commons/RecapCard";
import { ReturnsChart } from "../product/ReturnsChart";
import { MarketplaceItemType } from "../../types";
import { getCurrencyIcon } from "../../utils/helpers";

const MarketplaceItem = ({ item }: { item: MarketplaceItemType }) => {
  const router = useRouter();

  const { currency1, currency2 } = getCurrencyIcon(item.underlying);

  return (
    <div className={"flex flex-col p-6 md:py-11 md:px-12 rounded-[16px] bg-white"}>
      <div className={"flex items-center space-x-2"}>
        <div className={"relative flex items-center mr-[10px]"}>
          <Image src={currency1} className='rounded-full' alt='Product Logo' width={20} height={20} />
          <Image src={currency2} className='rounded-full absolute left-[10px]' alt='Product Logo' width={20} height={20} />
        </div>
        <span className={"text-grey-70 text-[20px]"}>{item.name}</span>
      </div>

      <span className={"text-blacknew-100 text-[32px] leading-[40px] mt-3"}>{item.underlying}</span>

      <div className={"mt-2 py-3 px-4 w-full rounded-lg bg-[rgba(0,0,0,0.04)] flex flex-col items-center justify-center space-y-2"}>
        <span className={"text-grey-70 text-[12px] leading-[12px]"}>Best Offer Price</span>
        <div className={"flex items-center text-[16px] leading-[16px] space-x-2 uppercase"}>
          <span className={"bg-primary-gradient bg-clip-text text-transparent"}>{item.offerPrice.toLocaleString()} USDC</span>
          <span className={"text-blacknew-100"}>(3 LOTS)</span>
        </div>
      </div>

      <div className={"mt-3 flex items-center space-x-3"}>
        <RecapCard label={"MTM Price"} value={item.mtmPrice.toLocaleString() + " USDC"} />
        <RecapCard label={"Total Lots"} value={item.totalLots.toLocaleString() + " USDC"} />
      </div>

      <div>
        <ReturnsChart tr1={10003} tr2={11600} strikePrice1={2000} strikePrice2={2500} strikePrice3={0} />
      </div>

      <PrimaryButton
        label={`${router.pathname.includes("portfolio") ? "VIEW DETAILS" : "BUY NOW"}`}
        className={"mt-4 uppercase"}
        onClick={() => router.push(router.pathname.includes("portfolio") ? `/portfolio/nft/${item.id}` : `/marketplace/${item.tokenId}`)}
      />
    </div>
  );
};

export default MarketplaceItem;
