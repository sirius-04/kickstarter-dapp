import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "" }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
});

export function getConfig() {
  return config;
}

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
