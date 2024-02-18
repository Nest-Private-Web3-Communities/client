import { useEffect } from "react";
import useGlobalContext from "../contexts/globalContext";
import { useAccount } from "@particle-network/connect-react-ui";
import useWeb3 from "../contexts/web3context";
import { Address } from "viem";

export default function useNestUser(address?: string) {
  const { userState } = useGlobalContext();
  const { user, setUser } = userState;
  const account = address || useAccount();
  const web3 = useWeb3();

  function fetchData() {
    web3.contracts.nest.read
      .users([account as Address])
      .then((res) => setUser(res));
  }

  useEffect(() => {
    if (!user && account) fetchData();
  }, [user]);

  useEffect(() => {
    if (account) fetchData();
  }, [account]);

  return {
    data: {
      Kpub: user?.[0],
      name: user?.[1],
      imageUrl: user?.[2],
      createdAt: user?.[3],
    },
    refetch: fetchData,
  };
}
