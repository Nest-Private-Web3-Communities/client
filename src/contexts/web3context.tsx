import {
  useAccount,
  useParticleProvider,
} from "@particle-network/connect-react-ui";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Abi,
  Chain,
  CustomTransport,
  createWalletClient,
  custom,
  getContract,
  publicActions,
} from "viem";
import nest from "../contracts/nest";
import { avalancheFuji } from "viem/chains";
import { EVMProvider } from "@particle-network/connect";

interface Web3ContextType {
  contracts: {
    nest: ContractType<typeof nest.abi>;
  };

  enabled: boolean;
}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const provider = useParticleProvider() as EVMProvider | undefined;
  const account = useAccount() as `0x${string}` | undefined;
  const enabled = provider && account ? true : false;

  const [loading, setLoading] = useState(true);

  const [contracts, setContracts] = useState<{
    nest: ContractType<typeof nest.abi>;
  }>({} as any);

  useEffect(() => {
    if (provider && account) {
      const client = createWalletClient({
        chain: avalancheFuji,
        account,
        transport: custom(provider),
      }).extend(publicActions);
      const nContract = getContract({ ...nest, client });

      setContracts({ nest: nContract });
      setLoading(false);
    }
  }, [provider, account]);

  const value: Web3ContextType = { contracts, enabled };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export default function useWeb3() {
  return useContext(Web3Context);
}

type ContractType<TAbi extends Abi> = ReturnType<
  typeof getContract<
    any,
    any,
    TAbi,
    ReturnType<typeof createWalletClient<CustomTransport, Chain, `0x4`>>
  >
>;

export type AbiReadResponseType<
  T extends keyof Web3ContextType["contracts"]["nest"]["read"]
> = Awaited<ReturnType<Web3ContextType["contracts"]["nest"]["read"][T]>>;
