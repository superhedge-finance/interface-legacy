import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useNetwork, useSigner } from "wagmi";
import useToast from "../../../hooks/useToast";
import { TitleH2, TitleH3 } from "../../../components/basic";
import { RecapCard } from "../../../components/commons/RecapCard";
import Timeline from "../../../components/product/Timeline";
import { MarketplaceItemFullType } from "../../../types";
import { getUserListedItem } from "../../../service";
import { getCurrencyIcon, truncateAddress } from "../../../utils/helpers";
import { getMarketplaceInstance } from "../../../utils/contract";
import { SUPPORT_CHAIN_IDS } from "../../../utils/enums";

const PortfolioNFTDetails = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { id: listingId } = router.query;

  const [item, setItem] = useState<MarketplaceItemFullType>();

  const chainId = useMemo(() => {
    if (chain) return chain.id;
    return SUPPORT_CHAIN_IDS.GOERLI;
  }, [chain]);

  useEffect(() => {
    (async () => {
      const _item = await getUserListedItem(listingId as string);
      if (_item) setItem(_item);
    })();
  }, [listingId]);

  const { currency1, currency2 } = useMemo(() => {
    if (item) return getCurrencyIcon(item.underlying);
    return { currency1: "/currency/usdc.svg", currency2: "/currency/eth.svg" };
  }, [item]);

  const offerStartSince = useMemo(() => {
    if (item) {
      const date = new Date(item.startingTime * 1000);
      return date.toLocaleDateString();
    }
    return "";
  }, [item]);

  const onDelete = async () => {
    if (signer && chainId) {
      const marketplaceInstance = getMarketplaceInstance(signer, chainId);
      try {
        const tx = await marketplaceInstance.cancelListing(listingId as string);
        await tx.wait();
        showToast("NFT PRODUCT SUCCESSFULLY REMOVED FROM LISTING", "success");
        await router.push("/portfolio");
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className={"py-[80px] flex justify-center"}>
      <div className={"max-w-[650px] w-full"}>
        {item && (
          <div className={"flex flex-col items-center w-full"}>
            <div className={"flex items-center w-full justify-between"}>
              <TitleH2>
                <span className={"bg-clip-text text-transparent bg-primary-gradient"}>Listed NFT details</span>
              </TitleH2>

              <div className={"flex items-center space-x-3"}>
                <Link href={`/portfolio/edit/${item.listingId}`}>
                  <Image src={"/icons/edit.svg"} alt={"edit"} width={28} height={28} />
                </Link>
                <Image src={"/icons/delete.svg"} alt={"delete"} width={28} height={28} className={"cursor-pointer"} onClick={onDelete} />
              </div>
            </div>

            <div className={"flex justify-between w-full mt-12 items-end"}>
              <div className='flex flex-row'>
                <div className={"relative flex items-center mr-[40px]"}>
                  <Image src={currency1} className='rounded-full' alt='Product Logo' width={60} height={60} />
                  <Image src={currency2} className='rounded-full absolute left-[40px]' alt='Product Logo' width={60} height={60} />
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
              <RecapCard label={"Price"} value={`${item.offerPrice.toLocaleString()} USDC`} />
              <RecapCard label={"Product Lots"} value={`${item.totalLots} LOTS`} />
              <RecapCard label={"Market Price"} value={`${item.mtmPrice.toLocaleString()} USDC`} />
            </div>

            <div className={"w-full mt-[80px]"}>
              <TitleH3>Product Recap</TitleH3>
              <div className={"flex items-center justify-between space-x-2 mt-5"}>
                <RecapCard label={"Offer start since"} value={offerStartSince} />
                <RecapCard label={"Coupon"} value={`${item.issuanceCycle.coupon / 100} % / WEEK`} />
                <RecapCard label={"Username"} value={truncateAddress(item.seller, 4)} />
              </div>
              <div className={"flex items-center justify-between space-x-2 mt-2"}>
                <RecapCard label={"Strike 1 price"} value={`${item.issuanceCycle.strikePrice1 / 100}%`} />
                <RecapCard label={"Strike 2 price"} value={`${item.issuanceCycle.strikePrice2 / 100}%`} />
                <RecapCard label={"Strike 3 price"} value={`${item.issuanceCycle.strikePrice3 / 100}%`} />
                <RecapCard label={"Strike 4 price"} value={`${item.issuanceCycle.strikePrice4 / 100}%`} />
              </div>
            </div>

            <div className={"mt-[80px] w-full flex flex-col space-y-5"}>
              <TitleH3>Product Lifecycle</TitleH3>
              <Timeline issuance={item.issuanceCycle.issuanceDate} maturity={item.issuanceCycle.maturityDate} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioNFTDetails;
