import React, { useEffect, useState } from "react";
import SubgroupList from "./components/SubgroupList";
import Feed from "./components/Feed/Feed";
import Chat from "./components/Chat";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useWeb3 from "../../contexts/web3context";
import Loader from "../../common/Loader";
import { Address, Chain, Client, CustomTransport, getContract } from "viem";
import contractDefinitions from "../../contracts";
import { Mutable } from "../../types";
import { useAccount } from "@particle-network/connect-react-ui";

export default function CommunityPage() {
  const params = useParams();
  if (!params.address) return <Navigate to="/" />;

  const [community, setCommunity] = useState<
    Partial<Community> & { address: Address }
  >({ address: params.address as Address });
  const [contract, setContract] =
    useState<
      ReturnType<
        typeof getContract<
          CustomTransport,
          Address,
          typeof contractDefinitions.community.abi,
          Client<CustomTransport, Chain>
        >
      >
    >();

  const web3 = useWeb3();
  const navigate = useNavigate();
  const account = useAccount();

  function setProperty<T extends keyof Community>(
    property: T,
    value: Community[T]
  ) {
    setCommunity((p) => ({ ...p, [property]: value }));
  }

  function loadData() {
    if (!contract) return;

    contract.read.name().then((res) => setProperty("name", res));
    contract.read.description().then((res) => setProperty("description", res));
    contract.read.imageUrl().then((res) => setProperty("imageUrl", res));
    contract.read
      .getReactions()
      .then((res) => setProperty("reactions", res as Mutable<typeof res>));

    contract.read.theme().then((res) =>
      setProperty("theme", {
        primary: res[0],
        secondary: res[1],
        background: res[2],
        foreground: res[3],
        front: res[4],
        back: res[5],
      })
    );
  }

  useEffect(() => {
    loadData();
  }, [contract]);

  useEffect(() => {
    if (web3.client && !contract)
      setContract(
        getContract({
          abi: contractDefinitions.community.abi,
          address: community.address,
          client: web3.client,
        })
      );
  }, [web3.client]);

  return (
    <>
      {community.theme && contract && (
        <main
          className="bg-background px-[8vw] flex h-screen w-full"
          style={
            {
              "--color-primary": community.theme.primary,
              "--color-secondary": community.theme.secondary,
              "--color-background": community.theme.background,
              "--color-foreground": community.theme.foreground,
              "--color-front": community.theme.front,
              "--color-back": community.theme.back,
            } as React.CSSProperties
          }
        >
          <SubgroupList />
          {community.reactions && <Feed emotes={community.reactions} />}
          <Chat />
        </main>
      )}

      {!(community.theme && contract && community.imageUrl) && (
        <main className="flex flex-col h-screen justify-center items-center relative z-[100]">
          <Loader className="w-1/5" />
          <p className="mt-[10vh] text-primary font-medium">Powered by NEST</p>
        </main>
      )}
    </>
  );
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
