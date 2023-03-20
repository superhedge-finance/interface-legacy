import { ethers } from "ethers";
import SHMARKETPLACE_ABI from "./constants/abis/SHMarketplace.json";
import NFT_ABI from "./constants/abis/NFT.json";
import ERC20_ABI from "./constants/abis/ERC20.json";
import { MARKETPLACE_ADDRESS, NFT_ADDRESS, USDC_ADDRESS } from "./constants/address";

export const getMarketplaceInstance = (signer: ethers.Signer, chainId: number) => {
  return new ethers.Contract(MARKETPLACE_ADDRESS[chainId], SHMARKETPLACE_ABI, signer);
};

export const getERC20Instance = (signer: ethers.Signer, chainId: number) => {
  return new ethers.Contract(USDC_ADDRESS[chainId], ERC20_ABI, signer);
};

export const getNFTInstance = (signer: ethers.Signer, chainId: number) => {
  return new ethers.Contract(NFT_ADDRESS[chainId], NFT_ABI, signer);
};
