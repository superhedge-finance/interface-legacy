import { SUPPORT_CHAIN_IDS } from "./enums";

export const DECIMAL: { [chainId: number]: number } = {
  [SUPPORT_CHAIN_IDS.GOERLI]: 6,
  [SUPPORT_CHAIN_IDS.MOONBEAM_ALPHA]: 18,
  [SUPPORT_CHAIN_IDS.ARBITRUM_GOERLI]: 6,
  [SUPPORT_CHAIN_IDS.MANTLE_TESTNET]: 6
};

export const EXPLORER: { [chainId: number]: string } = {
  [SUPPORT_CHAIN_IDS.GOERLI]: "https://goerli.etherscan.io",
  [SUPPORT_CHAIN_IDS.MOONBEAM_ALPHA]: "https://moonbase.moonscan.io",
  [SUPPORT_CHAIN_IDS.ARBITRUM_GOERLI]: "https://goerli.arbiscan.io",
  [SUPPORT_CHAIN_IDS.MANTLE_TESTNET]: "https://explorer.testnet.mantle.xyz/"
};
