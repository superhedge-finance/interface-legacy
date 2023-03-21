import React from "react";
import { Toaster } from "react-hot-toast";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, moonbaseAlpha } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Chart as ChartJS, Title, Tooltip, Legend, Filler, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import Layout from "./Layout";
import { ToastProvider } from "./providers/ToastProvider";

ChartJS.register(Title, Tooltip, Legend, Filler, LineElement, CategoryScale, LinearScale, PointElement);

const { chains, provider, webSocketProvider } = configureChains(
  [...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS == "true" ? [goerli, moonbaseAlpha] : [])],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY_GOERLI || "" }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Superhedge demo",
  chains
});

const demoAppInfo = {
  appName: "Superhedge Demo"
};

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
});

type AppProps = {
  children?: React.ReactNode;
};

function App({ children }: AppProps) {
  return (
    <React.StrictMode>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
          <ToastProvider>
            <Layout>{children}</Layout>
          </ToastProvider>
          <Toaster position='top-right' />
        </RainbowKitProvider>
      </WagmiConfig>
    </React.StrictMode>
  );
}

export default App;
