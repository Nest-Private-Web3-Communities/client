import React, { useEffect, useRef, useState } from "react";
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
  const flag = useRef(false);

  const web3 = useWeb3();
  const { pageConfig } = useCommunity();
  const { currentSelectedNetwork } = pageConfig;
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
    contract.read.reactions().then((res) => {
      const regex = /(\w+)\s+([\d\s]+)/g;
      const result: { name: string; color: string }[] = [];
      let match;

      while ((match = regex.exec(res)) !== null) {
        const [, name, color] = match;
        result.push({ name, color });
      }
      setProperty("reactions", result);
    });

    contract.read.theme().then((res) =>
      setProperty("theme", {
        primary: res.slice(0, 11),
        secondary: res.slice(12, 23),
        background: res.slice(24, 35),
        foreground: res.slice(36, 47),
        front: res.slice(48, 59),
        back: res.slice(60, 71),
      })
    );

    contract.read
      .getMemberCount()
      .then((res) => setProperty("memberCount", Number(res)));

    contract.read
      .getNetworkCount()
      .then((res) => setProperty("networkCount", Number(res)));
  }

  useEffect(() => {
    loadData();
    if (contract) encryption.setCommunityContract(contract);
  }, [contract]);

  useEffect(() => {
    if (contract && web3.client) {
      if (!flag.current) {
        flag.current = true;
        contract.watchEvent.KeysCycled({ onLogs: (logs) => location.reload() });
      }
    }
  }, [web3.client, contract, flag]);

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
          <Feed key={currentSelectedNetwork} />
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
