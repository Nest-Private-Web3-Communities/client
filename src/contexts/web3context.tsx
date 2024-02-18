import {
  useAccount,
  useParticleProvider,
} from "@particle-network/connect-react-ui";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Abi,
  Address,
  Chain,
  Client,
  CustomTransport,
  WalletActions,
  WalletRpcSchema,
  createPublicClient,
  createWalletClient,
  custom,
  getContract,
  publicActions,
} from "viem";
import contractDefinitions from "../contracts";
import { avalancheFuji } from "viem/chains";
import { EVMProvider } from "@particle-network/connect";

interface Web3ContextType {
  contracts: {
    nest: ContractType<typeof contractDefinitions.nest.abi>;
  };

  enabled: boolean;

  client: TClient | undefined;
}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const provider = useParticleProvider() as EVMProvider | undefined;
  const account = useAccount() as `0x${string}` | undefined;
  const enabled = provider && account ? true : false;
  const [client, setClient] = useState<TClient>();

  const [loading, setLoading] = useState(true);

  const [contracts, setContracts] = useState<{
    nest: ContractType<typeof contractDefinitions.nest.abi>;
  }>({} as any);

  useEffect(() => {
    if (provider && account) {
      const client = createWalletClient({
        chain: avalancheFuji,
        account,
        transport: custom(provider),
      }).extend(publicActions);
      setClient(client as TClient);
      const nContract = getContract({ ...contractDefinitions.nest, client });

      setContracts({ nest: nContract });
      setLoading(false);
    }
  }, [provider, account]);

  const value: Web3ContextType = { contracts, enabled, client };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export default function useWeb3() {
  return useContext(Web3Context);
}

type TClientA = ReturnType<
  typeof createWalletClient<CustomTransport, Chain, Address>
>;
type TClientB = ReturnType<typeof createPublicClient<CustomTransport, Chain>>;

type TClient = TClientA & Pick<TClientB, "waitForTransactionReceipt">;

export type ContractType<T extends Abi> = ReturnType<
  typeof getContract<any, any, T, TClient>
>;

export type AbiReadResponseType<
  C extends keyof typeof contractDefinitions,
  //@ts-ignore
  T extends keyof ContractType<(typeof contractDefinitions)[C]["abi"]>["read"]
> = Awaited<
  //@ts-ignore
  ReturnType<ContractType<(typeof contractDefinitions)[C]["abi"]>["read"][T]>
>;

export type AbiWriteResponseType<
  C extends keyof typeof contractDefinitions,
  //@ts-ignore
  T extends keyof ContractType<(typeof contractDefinitions)[C]["abi"]>["write"]
> = Awaited<
  //@ts-ignore
  ReturnType<ContractType<(typeof contractDefinitions)[C]["abi"]>["write"][T]>
>;
