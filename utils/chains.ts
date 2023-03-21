import { Chain } from "wagmi";

export const moonbeam_alpha = {
  id: 1287,
  name: "Moonbase Alpha",
  network: "moonbase",
  nativeCurrency: {
    name: "Dev",
    symbol: "DEV",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.api.moonbase.moonbeam.network"],
      webSocket: ["wss://wss.api.moonbase.moonbeam.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Moonscan",
      url: "https://moonbase.moonscan.io"
    }
  }
} as Chain;
