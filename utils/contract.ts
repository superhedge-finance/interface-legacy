import {ethers} from "ethers";
import SHMARKETPLACE_ABI from "../constants/abis/SHMarketplace.json";
import NFT_ABI from "../constants/abis/NFT.json";

export const getMarketplaceInstance = (signer: ethers.Signer) => {
  return new ethers.Contract("0x2462e81559750ddc2447A3b2dE54dC3E3eBc1f21", SHMARKETPLACE_ABI, signer);
}

export const getNFTInstance = (signer: ethers.Signer) => {
  return new ethers.Contract("0x1be59D15ecf1a9c3Aa25102F61d746aC360aE3B4", NFT_ABI, signer);
}
