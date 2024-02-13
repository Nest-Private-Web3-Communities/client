import {
  useAccount,
  useParticleProvider,
} from "@particle-network/connect-react-ui";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Abi,
  createWalletClient,
  custom,
  getContract,
  publicActions,
} from "viem";
import nest from "../contracts/nest";
import { sepolia } from "viem/chains";
import { EVMProvider } from "@particle-network/connect";
import TClient from "../client";

interface Web3ContextType {
  contracts:
    | {
        nest: ContractType<typeof nest.abi>;
      }
    | undefined;
}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const provider = useParticleProvider() as EVMProvider | undefined;
  const account = useAccount() as `0x${string}` | undefined;

  const [contracts, setContracts] = useState<{
    nest: ContractType<typeof nest.abi>;
  }>();

  useEffect(() => {
    if (provider && account) {
      const client = createWalletClient({
        chain: sepolia,
        account,
        transport: custom(provider),
      }).extend(publicActions);
      const nContract = getContract({ ...nest, client });

      setContracts({ nest: nContract });
    }
  }, [provider, account]);

  const value: Web3ContextType = { contracts };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export default function useWeb3() {
  return useContext(Web3Context);
}

type ContractType<TAbi extends Abi> = ReturnType<
  typeof getContract<any, any, TAbi, TClient>
>;
