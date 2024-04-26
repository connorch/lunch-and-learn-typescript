import { Abi, ChainContract as ViemChainContract } from "viem";
import { Chain, Prettify } from "wagmi/chains";

export type ChainContract = Prettify<
  ViemChainContract & {
    /** any custom contract attributes go here */
    abi?: Abi;
  }
>;

export type ChainErc20Contract = Prettify<
  ChainContract & {
    ercType: "ERC-20";
    address: string;
    decimals: number;
    symbol: string;
  }
>;

/**
 * The type used in the `Chains` list.
 */
export type ChainContracts = Prettify<{
  // Defaults from viem
  ensRegistry?: ChainContract;
  ensUniversalResolver?: ChainContract;
  multicall3?: ChainContract;
  // Custom contracts
  uniswapV3Factory?: ChainContract;
  wrappedNativeToken?: ChainErc20Contract;
}>;
