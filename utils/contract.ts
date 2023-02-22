import { ethers } from "ethers";
import SHMARKETPLACE_ABI from "../constants/abis/SHMarketplace.json";
import NFT_ABI from "../constants/abis/NFT.json";

export const getMarketplaceInstance = (signer: ethers.Signer) => {
  return new ethers.Contract("0xB6C5423e7579953227D861Bc49f8c4e49A8398c5", SHMARKETPLACE_ABI, signer);
};

export const getNFTInstance = (signer: ethers.Signer) => {
  return new ethers.Contract("0x1be59D15ecf1a9c3Aa25102F61d746aC360aE3B4", NFT_ABI, signer);
};
