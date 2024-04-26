import { Abi, ChainContract, createPublicClient, erc20Abi, http } from "viem";
import {
  Chain,
  Prettify,
  avalanche as wagmiAvalanche,
  mainnet as wagmiEthereumMainnet,
} from "wagmi/chains";

type CustomChainContract = ChainContract & {
  /** any custom contract attributes go here */
  abi?: Abi;
};

// only used internally within this file.
type SupportedChainBase = Chain & {
  // This duplicates wagmi's Chain['contracts'] type, but with any custom contract attributes.
  contracts?: Prettify<
    {
      [key: string]:
        | CustomChainContract
        | { [sourceId: number]: CustomChainContract | undefined }
        | undefined;
    } & {
      ensRegistry?: CustomChainContract;
      ensUniversalResolver?: CustomChainContract;
      multicall3?: CustomChainContract;
    }
  >;

  /** any custom chain attributes go here */
  isUniswapV3Enabled: boolean;
};

const avalanche = {
  ...wagmiAvalanche,
  isUniswapV3Enabled: true,
  contracts: {
    ...wagmiAvalanche.contracts,
    uniswapV3Factory: {
      address: "0x123",
      blockCreated: 123,
      abi: erc20Abi, // just using erc20 abi as an example
    },
  },
} as const satisfies SupportedChainBase;

const ethereumMainnet = {
  ...wagmiEthereumMainnet,
  isUniswapV3Enabled: false,
} as const satisfies SupportedChainBase;

const supportedChains = [avalanche, ethereumMainnet] as const;
type SupportedChain = (typeof supportedChains)[number];

const doThing = (chain: SupportedChain) => {
  if (chain.isUniswapV3Enabled) {
    chain.contracts.uniswapV3Factory.address;
    chain.contracts.uniswapV3Factory.abi;
    //                                 ^? "0x123" - typescript automagically infers the type based on chain.isUniswapV3Enabled!
  }

  createPublicClient({
    chain: avalanche, // SupportedChain still works in all places that wagmi/viem need, since SupportedChain is strictly a "narrower" type than Chain.
    transport: http(),
  });
};
