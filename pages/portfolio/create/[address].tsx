import { forwardRef, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { useAccount, useSigner } from "wagmi";
import { BigNumber, ethers } from "ethers";
import { PrimaryButton, SecondaryButton, TitleH2 } from "../../../components/basic";
import { getProduct } from "../../../service";
import { IProduct } from "../../../types";
import { getMarketplaceInstance, getNFTInstance } from "../../../utils/contract";
import "react-datepicker/dist/react-datepicker.css";
import ProductABI from "../../../constants/abis/SHProduct.json";
import NFTListedDialog from "../../../components/portfolio/NFTListedDialog";

const PortfolioCreatePage = () => {
  const router = useRouter();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { address: productAddress } = router.query;

  const [, setIsLoading] = useState(false);
  const [isListed, setIsListed] = useState(false);
  const [maxBalance, setMaxBalance] = useState(0);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [marketplaceInstance, setMarketplaceInstance] = useState<ethers.Contract>();
  const [currentTokenId, setCurrentTokenId] = useState<BigNumber>();
  const [txPending, setTxPending] = useState(false);
  const [nftInstance, setNFTInstance] = useState<ethers.Contract>();
  const [lots, setLots] = useState(1);
  const [price, setPrice] = useState(0);
  const [startingTime, setStartingTime] = useState<Date>(new Date());

  // eslint-disable-next-line react/display-name
  const CustomInput = forwardRef(({ value, onClick }: { value?: string; onClick?: () => void }) => (
    <div className={"relative flex items-center"}>
      <div className={"w-full py-3 px-4 bg-[#FBFBFB] border border-[1px] border-[#E6E6E6] rounded focus:outline-none"} onClick={onClick}>
        {value}
      </div>
      <span className={"absolute right-4 text-[#828A93]"}>
        <Image src={"/icons/calendar.svg"} alt={"calendar"} width={20} height={20} />
      </span>
    </div>
  ));

  const productInstance = useMemo(() => {
    if (signer && productAddress) return new ethers.Contract(productAddress as string, ProductABI, signer);
    else return null;
  }, [signer, productAddress]);

  const onListNFT = async () => {
    if (address && signer && marketplaceInstance && nftInstance && product && product.status === 3) {
      try {
        setTxPending(true);
        const isApprovedForAll = await nftInstance.isApprovedForAll(address, marketplaceInstance.address);
        if (!isApprovedForAll) {
          const approveTx = await nftInstance.setApprovalForAll(marketplaceInstance.address, true);
          await approveTx.wait();
        }

        const listTx = await marketplaceInstance.listItem(
          nftInstance.address,
          product.address,
          currentTokenId,
          lots,
          "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
          ethers.utils.parseUnits(price.toString(), 6),
          Math.floor(startingTime.getTime() / 1000)
        );
        await listTx.wait();
        setIsListed(true);
      } catch (e) {
        console.error(e);
      } finally {
        setTxPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsLoading(true);
      getProduct(productAddress as string)
        .then((product) => {
          setProduct(product);
        })
        .finally(() => setIsLoading(false));
    };
  }, [productAddress]);

  useEffect(() => {
    (async () => {
      if (productInstance && nftInstance && address) {
        const currentTokenId = await productInstance.currentTokenId();
        setCurrentTokenId(currentTokenId);
        const maxBalance = await nftInstance.balanceOf(address, currentTokenId);
        setMaxBalance(maxBalance.toNumber());
      }
    })();
  }, [productInstance, nftInstance, address]);

  useEffect(() => {
    if (signer) {
      setMarketplaceInstance(getMarketplaceInstance(signer));
      setNFTInstance(getNFTInstance(signer));
    }
  }, [signer]);

  return (
    <div className={"py-[80px] flex justify-center"}>
      <div className={"max-w-[650px] w-full"}>
        <div className={"flex flex-col items-center w-full"}>
          <div className={"w-full bg-black rounded-[16px]"}>
            <div className={"pl-10 h-[150px] flex items-center pt-5"}>
              <TitleH2 className={"text-white"}>Create NFT</TitleH2>
            </div>
            <img src={"/products/default_nft_image.png"} width={"100%"} alt={""} />
          </div>

          <div className={"w-full flex flex-col space-y-6 bg-white rounded-[16px] p-12 mt-5"}>
            <div className={"flex flex-col space-y-2"}>
              <div className={"text-[#494D51] text-[16px]"}>Product lots</div>

              <div className={"relative flex items-center"}>
                <input
                  className={"w-full py-3 px-4 bg-[#FBFBFB] border border-[1px] border-[#E6E6E6] rounded focus:outline-none"}
                  value={lots}
                  onChange={(e) => setLots(Number(e.target.value))}
                  type='text'
                />
                <div className={"absolute right-4 flex items-center space-x-[10px]"}>
                  <span
                    className={
                      "bg-grey-20 flex items-center justify-center px-3 h-[28px] w-[140px] rounded-[6px] text-[12px] leading-[12px]"
                    }
                    onClick={() => setLots(1)}
                  >
                    MIN
                  </span>
                  <span
                    className={
                      "bg-grey-20 flex items-center justify-center px-3 h-[28px] w-[140px] rounded-[6px] text-[12px] leading-[12px]"
                    }
                    onClick={() => setLots(maxBalance)}
                  >
                    MAX
                  </span>
                </div>
              </div>
            </div>
            <div className={"flex flex-col space-y-2"}>
              <div className={"text-[#494D51] text-[16px]"}>NFT Price (USDC)</div>

              <div className={"relative flex items-center"}>
                <input
                  className={"w-full py-3 px-4 bg-[#FBFBFB] border border-[1px] border-[#E6E6E6] rounded focus:outline-none"}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  type='text'
                />
                <span className={"absolute right-4 text-[#828A93]"}>Lots</span>
              </div>

              <div
                className={"rounded-[6px] bg-warning h-[32px] flex items-center justify-center px-3 text-[12px] leading-[12px] text-white"}
                style={{ inlineSize: "fit-content" }}
              >
                Market Price - 10,500 USDC - 10 Lots
              </div>
            </div>
            <div className={"flex flex-col space-y-2"}>
              <div className={"text-[#494D51] text-[16px]"}>Offer Start Since (GTC)</div>

              <div className={"relative flex items-center"}>
                <DatePicker
                  selected={startingTime}
                  showPopperArrow={false}
                  filterDate={(date: Date) => date.getTime() > Date.now()}
                  onChange={(date: Date) => setStartingTime(date)}
                  customInput={<CustomInput />}
                />
              </div>
            </div>

            <div className={"flex items-center space-x-6"}>
              <SecondaryButton label={"CANCEL"} onClick={() => router.push(`/portfolio/position/${product?.address}`)} />
              <PrimaryButton
                label={"LIST NFT"}
                disabled={!signer || !product || txPending}
                loading={txPending}
                className={"flex items-center justify-center"}
                onClick={onListNFT}
              />
            </div>
          </div>
        </div>
      </div>

      <NFTListedDialog open={isListed} setOpen={setIsListed} onConfirm={() => router.push("/portfolio")} />
    </div>
  );
};

export default PortfolioCreatePage;
