import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { IProduct } from "../../types";
import { getCurrencyIcon } from "../../utils/helpers";
import { RecapCard } from "../commons/RecapCard";
import { useRouter } from "next/router";
import Timeline from "../product/Timeline";
import { ethers } from "ethers";
import ProductABI from "../../utils/abis/SHProduct.json";
import { useAccount, useSigner, useNetwork } from "wagmi";
import { DECIMAL } from "../../utils/constants";
import { SUPPORT_CHAIN_IDS } from "../../utils/enums";
import toast from "react-hot-toast";

const PortfolioNFTCard = ({ product }: { product: IProduct }) => {
  const Router = useRouter();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const { currency1, currency2 } = getCurrencyIcon(product.underlying);
  const [principal, setPrincipal] = useState<number>(0);
  const [hover, setHover] = useState(false);

  const productInstance = useMemo(() => {
    if (signer && product) return new ethers.Contract(product.address as string, ProductABI, signer);
    else return null;
  }, [signer, product]);

  const chainId = useMemo(() => {
    if (chain) return chain.id;
    return SUPPORT_CHAIN_IDS.GOERLI;
  }, [chain]);

  const onClick = async() => {
    if (product.status != 3) return toast.error("Your product is not issued yet. Please wait until issuance date");
    Router.push(`/portfolio/create/${product.address}`)
  }

  useEffect(() => {
    (async () => {
      if (productInstance && address) {
        const balance = await productInstance.principalBalance(address);
        setPrincipal(Number(ethers.utils.formatUnits(balance, DECIMAL[chainId])));
      }
    })();
  }, [productInstance, address, chainId]);

  return (
    <div
      className={`flex flex-col space-y-6 p-6 md:py-11 md:px-12 rounded-[16px] bg-white cursor-pointer ${hover ? "gradient-border" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick()}
    >
      <div className={"flex justify-between items-start"}>
        <div className='flex flex-row'>
          <div className={"relative flex items-center mr-[40px]"}>
            <Image src={currency1} className='rounded-full' alt='Product Logo' width={60} height={60} />
            <Image src={currency2} className='rounded-full absolute left-[40px]' alt='Product Logo' width={60} height={60} />
          </div>
          <div className='flex flex-col justify-around ml-3'>
            <h5 className='text-[44px] leading-[44px] text-black'>{product.underlying}</h5>
            <span className='text-[20px] font-light text-gray-700'>{product.name}</span>
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
                {product.estimatedApy}
              </span>
            </div>
          </div>
          <span className='font-medium leading-tight text-3xl text-transparent bg-primary-gradient bg-clip-text'>
            {product.issuanceCycle.apy}
          </span>
        </div>
      </div>

      <RecapCard label={"Principal Amount"} value={`USDC ${principal.toLocaleString()} (${Math.floor(principal / 1000)} Lots)`} />

      <Timeline issuance={product.issuanceCycle.issuanceDate} maturity={product.issuanceCycle.maturityDate} />
    </div>
  );
};

export default PortfolioNFTCard;
