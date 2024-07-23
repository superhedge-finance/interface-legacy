import { ParaLight16, SkeletonCard, TitleH3 } from "../../../components/basic";
import { IProduct, ProductSpreads, ProductStatus } from "../../../types";
import Image from "next/image";
import { ActionArea } from "../../../components/product/ActionArea";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { getProduct } from "../../../service";
import { RecapCard } from "../../../components/commons/RecapCard";
import { NFTProductCard } from "../../../components/portfolio/NFTProductCard";
import ProductABI from "../../../utils/abis/SHProduct.json";
import { useAccount, useNetwork, useSigner } from "wagmi";
import Timeline from "../../../components/product/Timeline";
import { SUPPORT_CHAIN_IDS } from "../../../utils/enums";
import { DECIMAL } from "../../../utils/constants";
import { formatStrikePrice } from "../../../utils/helpers";
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

const PositionDetail = () => {
  const router = useRouter();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { address: productAddress } = router.query;

  const [principal, setPrincipal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);

  const chainId = useMemo(() => {
    if (chain) return chain.id;
    return SUPPORT_CHAIN_IDS.GOERLI;
  }, [chain]);

  const currency1 = useMemo(() => {
    if (product) {
      return "/currency/" + product.underlying.split("/")[1] + ".svg";
    }
    return "/currency/usdc.svg";
  }, [product]);

  const currency2 = useMemo(() => {
    if (product) {
      return "/currency/" + product.underlying.split("/")[0] + ".svg";
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

  const productInstance = useMemo(() => {
    if (signer && productAddress) return new ethers.Contract(productAddress as string, ProductABI, signer);
    else return null;
  }, [signer, productAddress]);

  useEffect(() => {
    setIsLoading(true);
    getProduct(productAddress as string, chainId)
      .then((product) => {
        setProduct(product);
      })
      .finally(() => setIsLoading(false));
  }, [productAddress, chainId]);

  useEffect(() => {
    (async () => {
      if (productInstance && address) {
        const balance = await productInstance.principalBalance(address);
        setPrincipal(Number(ethers.utils.formatUnits(balance, DECIMAL[chainId])));
      }
    })();
  }, [productInstance, address, chainId]);

  return (
    <div>
      {isLoading && <SkeletonCard />}
      <div className={"grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 px-0 md:px-12 relative"}>
        <div className={"col-span-1"}>
          {!isLoading && product && (
            <div className='flex flex-col p-6'>
              <div className={"flex flex-col xl:flex-row xl:justify-between"}>
                <TitleH3 className={"bg-primary-gradient bg-clip-text text-transparent mb-3"}>Position Details</TitleH3>
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
              </div>
              <div className={"flex justify-between items-end my-5"}>
                <div className='flex flex-row'>
                  <div className={"relative flex items-center mr-[40px]"}>
                    <Image src={currency1.toLowerCase()} className='rounded-full' alt='Product Logo' width={60} height={60} />
                    <Image
                      src={currency2.toLowerCase()}
                      className='rounded-full absolute left-[40px]'
                      alt='Product Logo'
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className='flex flex-col justify-around ml-3'>
                    <h5 className='text-[44px] text-black'>{product.underlying}</h5>
                    <span className='text-[20px] font-light text-gray-700'>{product.name}</span>
                  </div>
                </div>
                <div className={"flex flex-col items-center"}>
                  <span className='d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400'>Estimated APY</span>
                  <span className='font-medium leading-tight text-3xl text-transparent bg-primary-gradient bg-clip-text'>
                    {product.issuanceCycle.apy}
                  </span>
                </div>
              </div>

              <div className={"flex flex-col mt-[80px]"}>
                <TitleH3>Product Recap</TitleH3>
                <div className={"flex items-center justify-between space-x-2 mt-5"}>
                  <div className={`flex flex-col flex-1 items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4`}>
                    <p className='text-[12px] font-light text-gray-700'>{product.status == 3 ? "Time to Maturity" : "Time to Issuance"}</p>
                    <h3 className='text-[18px] font-light text-black'>
                      <Countdown 
                        intervalDelay={60000} 
                        date={(product.status == 3 ? product.issuanceCycle.maturityDate : product.issuanceCycle.issuanceDate) * 1000} 
                        renderer={issuance_date_renderer} 
                      />
                    </h3>
                  </div>
                  <RecapCard label={"Coupon"} value={`${product.issuanceCycle.coupon / 100}% / WEEK`} />
                  <RecapCard label={"Principal Protection"} value={"100%"} />
                </div>
                <div className={"flex items-center justify-between space-x-2 mt-2"}>
                  <RecapCard label={"Principal Amount"} value={`${principal.toLocaleString()} USDC`} />
                  <RecapCard label={"Product Lots"} value={`${principal / 1000} LOTS`} />
                  <RecapCard label={"Market Price"} value={"8,000 USDC"} />
                </div>
                <div className={"flex items-center justify-between space-x-2 mt-2"}>
                  <RecapCard label={"Strike 1 price"} value={formatStrikePrice(product.issuanceCycle.strikePrice1)} />
                  <RecapCard label={"Strike 2 price"} value={formatStrikePrice(product.issuanceCycle.strikePrice2)} />
                  <RecapCard label={"Strike 3 price"} value={formatStrikePrice(product.issuanceCycle.strikePrice3)} />
                  <RecapCard label={"Strike 4 price"} value={formatStrikePrice(product.issuanceCycle.strikePrice4)} />
                </div>
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>Product Lifecycle</TitleH3>
                <Timeline issuance={product.issuanceCycle.issuanceDate} maturity={product.issuanceCycle.maturityDate} />
              </div>

              <div className={"mt-[80px] flex flex-col space-y-5"}>
                <TitleH3>NFT Product</TitleH3>
                <ParaLight16>
                  You can withdraw your funds before Maturity date using ‘Marketplace’. Since each product is the actually minted in a form
                  of NFT, you can do P2P trading of the products owned. Just list your NFT on Marketplace.
                </ParaLight16>
                <NFTProductCard product={product} lots={principal / 1000} />
              </div>
            </div>
          )}
        </div>
        {!isLoading && product && <ActionArea productAddress={product.address} product={product} />}
      </div>
    </div>
  );
};

export default PositionDetail;
