import { createContext, useContext, useEffect, useState } from "react";
import { ContractType } from "../../contexts/web3context";
import contractDefinitions from "../../contracts";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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

  pageConfig: Config;
  setPageConfig: React.Dispatch<React.SetStateAction<Config>>;

  reload: () => void;
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
  if (!params.cid) return <Navigate to="/" />;

  const account = useAccount();
  const navigate = useNavigate();

  const [seed, setSeed] = useState(1);
  const [contract, setContract] = useState<CommunityContract>();
  const [data, setData] = useState<ICommunity>({
    address: params.cid as Address,
    userIsAdmin: false,
  });
  const [pageConfig, setPageConfig] = useState<Config>({
    currentSelectedNetwork: "General",
    sidenavCollapse: { members: false, networks: false },
  });

  function reload() {
    setSeed(Math.random());
  }

  useEffect(() => {
    if (account && contract)
      contract.read.participationStage([account as Address]).then((res) => {
        if (res < 2) navigate("/communities");
        setData((p) => ({ ...p, userIsAdmin: res === 3 }));
      });
  }, [account, contract]);

  const value: CommunityContextType = {
    contract,
    setContract,
    data,
    setData,
    pageConfig,
    setPageConfig,
    reload,
  };

  return (
    <CommunityContext.Provider value={value}>
      <div key={seed}>{children}</div>
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
  memberCount: number;
  networkCount: number;
  userJoinedAt: number;
}

interface Config {
  currentSelectedNetwork: string;
  sidenavCollapse: { members: boolean; networks: boolean };
}

export type ICommunity = Partial<Community> & {
  address: `0x${string}`;
  userIsAdmin: boolean;
};
