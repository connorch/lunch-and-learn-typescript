import { Abi, ChainContract, createPublicClient, erc20Abi, http } from "viem";
import {
  Chain,
  Prettify,
  avalanche as wagmiAvalanche,
  mainnet as wagmiEthereum,
} from "wagmi/chains";
import { ChainContracts } from "./contracts";
import { ExtractObject } from "./extract-object";

// only used internally within this file.
type SupportedChainBase = Prettify<
  Omit<Chain, "contracts"> & {
    // This duplicates wagmi's Chain['contracts'] type, but with custom contract attributes.
    contracts?: ChainContracts;
    // Custom chain attributes go here - especially ones that are used to type-guard (booleans, enums, etc.)
    isUniswapV3Enabled: boolean;
  }
>;

export const avalanche = {
  ...wagmiAvalanche,
  isUniswapV3Enabled: false,
} as const satisfies SupportedChainBase;

const { multicall3, ...restContracts } = wagmiEthereum.contracts;

export const ethereum = {
  ...wagmiEthereum,
  isUniswapV3Enabled: true,
  contracts: {
    ...restContracts,
    uniswapV3Factory: {
      address: "0x123",
      blockCreated: 123,
      abi: erc20Abi, // just using erc20 abi as an example
    },
  },
} as const satisfies SupportedChainBase;

export const supportedChains = [avalanche, ethereum] as const;
export type SupportedChain<
  partialChain extends Partial<(typeof supportedChains)[number]> = Partial<
    (typeof supportedChains)[number]
  >
> = ExtractObject<(typeof supportedChains)[number], partialChain>;
