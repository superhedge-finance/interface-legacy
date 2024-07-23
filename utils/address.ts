import { SUPPORT_CHAIN_IDS } from "./enums";

export const MARKETPLACE_ADDRESS: { [chainId: number]: string } = {
  [SUPPORT_CHAIN_IDS.GOERLI]: "0xbBA5bf9bce64A23C7d460513a759905b51ecC0AA",
  [SUPPORT_CHAIN_IDS.MOONBEAM_ALPHA]: "0x1104dfa78a525009145d84dce9eb559ec15aba70",
  [SUPPORT_CHAIN_IDS.ARBITRUM_GOERLI]: "0x18649FfD8B3c3392bEc2B8413E9a09C559170E22",
  [SUPPORT_CHAIN_IDS.MANTLE_TESTNET]: "0x334E9874Fab7Ef1f8b5f44f8fFa9cEeB45cDB8D6",
  [SUPPORT_CHAIN_IDS.ARBITRUM]: "0x1aE6794a97Ab36c577687432852374Fbe17b04F5"
};
export const NFT_ADDRESS: { [chainId: number]: string } = {
  [SUPPORT_CHAIN_IDS.GOERLI]: "0xC21d745013cB1A8fa6Fa6575D842524650f0F610",
  [SUPPORT_CHAIN_IDS.MOONBEAM_ALPHA]: "0x9CC080062ddd770ef30C7a33a5764174FB6d022C",
  [SUPPORT_CHAIN_IDS.ARBITRUM_GOERLI]: "0x3248b7280C7e741e171306ac5b278D2739a1f7B2",
  [SUPPORT_CHAIN_IDS.MANTLE_TESTNET]: "0xF4dd2b016e0914388BbBCf47A04683F41006de59",
  [SUPPORT_CHAIN_IDS.ARBITRUM]: "0x585Bf48e3Bf873347249f255C9F2b1089B9902C6"
};
export const USDC_ADDRESS: { [chainId: number]: string } = {
  [SUPPORT_CHAIN_IDS.GOERLI]: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  [SUPPORT_CHAIN_IDS.MOONBEAM_ALPHA]: "0x3799D95Ee109129951c6b31535b2B5AA6dbF108c",
  [SUPPORT_CHAIN_IDS.ARBITRUM_GOERLI]: "0x72A9c57cD5E2Ff20450e409cF6A542f1E6c710fc",
  [SUPPORT_CHAIN_IDS.MANTLE_TESTNET]: "0xb5ca840de205CDf0757681FdBF17e528Dc4433cF",
  [SUPPORT_CHAIN_IDS.ARBITRUM]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
};
