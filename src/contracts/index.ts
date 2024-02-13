import {
  Abi,
  GetContractReturnType,
  createWalletClient,
  custom,
  getContract,
} from "viem";
import { useEffect, useState } from "react";
import { useEthereum } from "@particle-network/auth-core-modal";

import ens from "./ens";
import nest from "./nest";
import TClient from "../client";

const getContracts = () => ({
  ens: hookedContract(viemContract(ens)),
  nest: hookedContract(viemContract(nest)),
});

// partition
function hookedContract<T extends GetContractReturnType>(contract: T) {
  // function useRead<P extends Readonly<string>>(
  //   config: Parameters<typeof useContractRead<T["abi"], P>>[0] & {
  //     functionName: P;
  //   }
  // ) {
  //   return useContractRead<T["abi"], P>({
  //     abi: contract.abi,
  //     address: contract.address,
  //     ...config,
  //   });
  // }

  // function useEvent<P extends Readonly<string>>(
  //   config: Parameters<typeof useContractEvent<T["abi"], P>>[0] & {
  //     eventName: P;
  //   }
  // ) {
  //   return useContractEvent<T["abi"], P>({
  //     abi: contract.abi,
  //     address: contract.address,
  //     ...config,
  //   });
  // }

  return { ...contract };
}

function viemContract<T extends Abi, P extends `0x${string}`>(
  contractData: Readonly<{
    abi: T;
    address: P;
  }>
): GetContractReturnType<T, TClient, P> {
  const { provider } = useEthereum();

  const client = createWalletClient({ transport: custom(provider) });

  const [contract, setContract] = useState(
    getContract({
      abi: contractData.abi,
      address: contractData.address,
      client,
    })
  );

  useEffect(() => {
    console.log("updating contract ", contract.address);
    setContract(
      getContract({
        abi: contractData.abi,
        address: contractData.address,
        client,
      })
    );
  }, [client]);

  return contract;
}

export default getContracts;

export type ContractType = ReturnType<typeof getContracts>[keyof ReturnType<
  typeof getContracts
>];
