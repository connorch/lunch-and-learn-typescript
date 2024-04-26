import { createWalletClient, createPublicClient, http } from "viem";
import { SupportedChain, avalanche, ethereum, supportedChains } from "./chains";
import { polygon, mainnet as wagmiMainnet } from "wagmi/chains";
import {
  useReadContract,
  useReadContracts,
  usePublicClient,
  useConnectorClient,
  useConfig,
  useWalletClient,
  useAccount,
  useAccountEffect,
} from "wagmi";
import { readContracts, readContract } from "wagmi/actions";
import { useQuery } from "@tanstack/react-query";
import { readContractsQueryOptions } from "wagmi/query";

/**
 * Examples of simplified type-guarding.
 *
 * No more need for custom-named chain variants! Naming things is hard.
 */
const useUniswapV3Name = (
  // 🔥 convenient syntax for type-narrowing
  chain: SupportedChain<{ isUniswapV3Enabled: true }>
) => {
  return useReadContract({
    abi: chain.contracts.uniswapV3Factory.abi,
    address: chain.contracts.uniswapV3Factory.address,
    functionName: "name",
    chainId: chain.id,
  });
};

const useUniswapV3NameThatFails = (chain: SupportedChain) => {
  return useReadContracts({
    contracts: [
      {
        // @ts-expect-error 👍 - this is good since we haven't confirmed that this contract exists on the chain!
        abi: chain.contracts.uniswapV3Factory.abi,
        // @ts-expect-error 👍
        address: chain.contracts.uniswapV3Factory.address,
        functionName: "name",
      },
    ],
  });
};

const doStuff = (chain: SupportedChain) => {
  // ✨ We can infer other attributes from the chain without any extra work!
  if (chain.isUniswapV3Enabled) {
    chain.contracts.uniswapV3Factory;
  }
};
