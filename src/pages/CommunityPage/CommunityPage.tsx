import React, { useEffect, useState } from "react";
import SubgroupList from "./components/SubgroupList";
import Feed from "./components/Feed/Feed";
import Chat from "./components/Chat";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useWeb3, { ContractType } from "../../contexts/web3context";
import Loader from "../../common/Loader";
import { Address, Chain, Client, CustomTransport, getContract } from "viem";
import contractDefinitions from "../../contracts";
import { Mutable } from "../../types";
import { useAccount } from "@particle-network/connect-react-ui";
import useEncryptionContext from "../../contexts/encryptionContext";
import SideNav from "./components/SideNav/SideNav";
import Modal from "../../common/Modal";
import useCommunity from "./CommunityContext";

export default function CommunityPage() {
  const community = useCommunity();
  const { contract } = community;
  const { theme } = community.data;

  const web3 = useWeb3();
  const encryption = useEncryptionContext();

  function setProperty<T extends keyof typeof community.data>(
    property: T,
    value: (typeof community.data)[T]
  ) {
    community.setData((p) => ({ ...p, [property]: value }));
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
    if (contract) encryption.setCommunityContract(contract);
  }, [contract]);

  useEffect(() => {
    if (web3.client && !contract)
      community.setContract(
        getContract({
          abi: contractDefinitions.community.abi,
          address: community.data.address,
          client: web3.client,
        })
      );
  }, [web3.client]);

  return (
    <>
      {theme && contract && (
        <main
          className="bg-background px-[8vw] flex h-screen w-full"
          style={
            {
              "--color-primary": theme.primary,
              "--color-secondary": theme.secondary,
              "--color-background": theme.background,
              "--color-foreground": theme.foreground,
              "--color-front": theme.front,
              "--color-back": theme.back,
            } as React.CSSProperties
          }
        >
          <SideNav />
          <Feed />
          <Chat />
          <Modal />
        </main>
      )}

      {!(theme && contract && community.data.imageUrl) && (
        <main className="flex flex-col h-screen justify-center items-center relative z-[100]">
          <Loader className="w-1/5" />
          <p className="mt-[10vh] text-primary font-medium">Powered by NEST</p>
        </main>
      )}
    </>
  );
}
