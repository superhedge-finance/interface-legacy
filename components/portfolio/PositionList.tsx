import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParaLight16, PrimaryButton, SkeletonCard, TitleH5 } from "../basic";
import MarketplaceItem from "../marketplace/Item";
import { getUserInfo, getUserListedItems } from "../../service";
import { MarketplaceItemType } from "../../types";

const NoPositionCard = () => {
  const Router = useRouter();

  return (
    <div className={"py-12 px-[112px] flex flex-col items-center bg-white rounded-lg max-w-[600px]"}>
      <Image src={"/portfolio/no_positions.svg"} alt={"no_positions"} width={48} height={48} />
      <TitleH5 className={"text-center mt-5"}>You don&apos;t have Position to List.</TitleH5>
      <ParaLight16 className={"text-grey-70 text-center mt-3"}>
        Each Product is the actually minted in a form of NFT, so you can do P2P trading of the Products owned. Buy Products first to be able
        list your NFT
      </ParaLight16>
      <PrimaryButton label={"BUY PRODUCT"} className={"mt-5 max-w-[300px] uppercase"} onClick={() => Router.push("/")} />
    </div>
  );
};

const NoListedNFTCard = () => {
  const Router = useRouter();

  return (
    <div className={"py-12 px-[112px] flex flex-col items-center bg-white rounded-lg"}>
      <Image src={"/icons/noNFT.svg"} alt={"no_positions"} width={48} height={48} />
      <TitleH5 className={"text-center mt-5"}>You don&apos;t have any listed NFT</TitleH5>
      <ParaLight16 className={"text-grey-70 text-center mt-3"}>List NFT from your Products</ParaLight16>
      <PrimaryButton label={"LIST NFT"} className={"mt-5 max-w-[300px] uppercase"} onClick={() => Router.push("/portfolio/choose")} />
    </div>
  );
};

export const PortfolioPositionList = () => {
  const { address } = useAccount();

  const [items, setItems] = useState<Array<MarketplaceItemType>>([]);
  const [loading, setLoading] = useState(false);
  const [hasNoPosition, setHasNoPosition] = useState(true);

  useEffect(() => {
    (async () => {
      if (address) {
        setLoading(true);
        const _items = await getUserListedItems(address);
        const _user = await getUserInfo(address);
        if (_user) {
          setHasNoPosition(_user.productIds.length === 0);
        }
        setItems(_items);
        setLoading(false);
      }
    })();
  }, [address]);

  return (
    <div className={`${items.length !== 0 ? "" : "self-center"}`}>
      {loading && <SkeletonCard />}
      {!loading && hasNoPosition && <NoPositionCard />}
      {!loading && !hasNoPosition && items.length === 0 && <NoListedNFTCard />}
      {!loading && !hasNoPosition && items.length > 0 && (
        <div className={"grid grid-cols-1 md:grid-cols-3 mt-12 gap-x-0 md:gap-x-5 gap-y-5 md:gap-y-8"}>
          {items.map((item, index) => (
            <MarketplaceItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
