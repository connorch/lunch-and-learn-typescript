import { createConfig } from "wagmi";
import { ethereum, supportedChains } from "./chains";
import { http } from "viem";
import { avalanche } from "viem/chains";

/**
 * Global type-safety in all wagmi actions! (ex: useConfig / useReadContracts)
 */
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: supportedChains, // <- const asserted!
  transports: {
    [avalanche.id]: http(),
    [ethereum.id]: http(),
  },
});
