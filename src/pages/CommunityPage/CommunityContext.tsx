import { createContext, useContext, useEffect, useState } from "react";
import { ContractType } from "../../contexts/web3context";
import contractDefinitions from "../../contracts";
import { Navigate, useParams } from "react-router-dom";
import { Address } from "viem";
import { useAccount } from "@particle-network/connect-react-ui";

type CommunityContract = ContractType<typeof contractDefinitions.community.abi>;

interface CommunityContextType {
  contract: CommunityContract | undefined;
  setContract: React.Dispatch<
    React.SetStateAction<CommunityContract | undefined>
  >;
  data: ICommunity;
  setData: React.Dispatch<React.SetStateAction<ICommunity>>;
}

const CommunityContext = createContext<CommunityContextType>(
  {} as CommunityContextType
);

export function CommunityContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  if (!params.address) return <Navigate to="/" />;

  const account = useAccount();

  const [contract, setContract] = useState<CommunityContract>();
  const [data, setData] = useState<ICommunity>({
    address: params.address as Address,
    userIsAdmin: false,
  });

  useEffect(() => {
    if (account && contract)
      contract.read
        .participationStage([account as Address])
        .then((res) => setData((p) => ({ ...p, userIsAdmin: res === 3 })));
  }, [account, contract]);

  const value: CommunityContextType = {
    contract,
    setContract,
    data,
    setData,
  };

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
}

export default function useCommunity() {
  return useContext(CommunityContext);
}

interface Community {
  name: string;
  description: string;
  imageUrl: string;
  theme: Record<
    "primary" | "secondary" | "background" | "foreground" | "front" | "back",
    string
  >;
  reactions: Array<{ name: string; color: string }>;
}

export type ICommunity = Partial<Community> & {
  address: `0x${string}`;
  userIsAdmin: boolean;
};