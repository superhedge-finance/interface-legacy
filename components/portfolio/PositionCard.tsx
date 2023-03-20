import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { PrimaryButton } from "../basic";
import { IProduct } from "../../types";
import ProductABI from "../../utils/constants/abis/SHProduct.json";
import { useRouter } from "next/router";
import Timeline from "../product/Timeline";

export const PositionCard = ({ position, enabled }: { position: IProduct; enabled: boolean }) => {
  const Router = useRouter();
  const { address } = useAccount();
  const { data: signer } = useSigner();

  const [principal, setPrincipal] = useState<number>(0);

  const currency1 = useMemo(() => {
    return "/currency/" + position.underlying.split("/")[1].toLowerCase() + ".svg";
  }, [position]);

  const currency2 = useMemo(() => {
    return "/currency/" + position.underlying.split("/")[0].toLowerCase() + ".svg";
  }, [position]);

  const productInstance = useMemo(() => {
    if (!position || !signer || !address) return null;
    return new ethers.Contract(position.address, ProductABI, signer);
  }, [position, signer, address]);

  useEffect(() => {
    (async () => {
      if (productInstance && address) {
        const balance = await productInstance.principalBalance(address);
        setPrincipal(Number(ethers.utils.formatUnits(balance, 6)));
      }
    })();
  }, [productInstance, address]);

  return (
    <>
      <div className='flex flex-col py-11 px-12 w-full bg-white rounded-[16px] mt-6'>
        <div className={"flex justify-between items-start"}>
          <div className='flex flex-row'>
            <div className={"relative flex items-center mr-[40px]"}>
              <Image src={currency1} className='rounded-full' alt='Product Logo' width={60} height={60} />
              <Image src={currency2} className='rounded-full absolute left-[40px]' alt='Product Logo' width={60} height={60} />
            </div>
            <div className='flex flex-col justify-around ml-3'>
              <h5 className='text-[44px] leading-[44px] text-black'>{position.underlying}</h5>
              <span className='text-[20px] font-light text-gray-700'>{position.name}</span>
            </div>
          </div>
          <div className={"flex flex-col items-center"}>
            <span className='d-block mb-1 text-sm font-normal text-gray-700 dark:text-gray-400'>Estimated APY</span>
            <span className='font-medium leading-tight text-3xl text-transparent bg-primary-gradient bg-clip-text'>
              {position.issuanceCycle.apy}
            </span>
          </div>
        </div>

        <div className='flex flex-col flex-1 items-center bg-[#0000000a] h-[66px] rounded-[7px] py-3 px-4 mt-6'>
          <p className='text-[12px] font-light text-gray-700'>Principal Amount</p>
          <h3 className='text-[20px] font-light text-black'>
            <span className={"bg-primary-gradient bg-clip-text text-transparent"}>USDC {principal.toLocaleString()}</span>
            <span className={"ml-1"}>({principal / 1000} Lots)</span>
          </h3>
        </div>

        <div className={"mt-6"}>
          <Timeline issuance={position.issuanceCycle.issuanceDate} maturity={position.issuanceCycle.maturityDate} compact={true} />
        </div>

        <PrimaryButton label={"SEE DETAILS"} className={"mt-6"} onClick={() => Router.push(`/portfolio/position/${position.address}`)} />
      </div>

      {enabled && (
        <div className={"mt-6"}>
          <img src={position.issuanceCycle.image_uri || "/products/default_nft_image.png"} width={"100%"} alt={""} />
        </div>
      )}
    </>
  );
};
