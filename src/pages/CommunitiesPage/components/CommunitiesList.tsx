import React, { useEffect, useRef, useState } from "react";
import useWeb3 from "../../../contexts/web3context";
import { twMerge } from "tailwind-merge";

export default function CommunitiesList() {
  const web3 = useWeb3();

  const [list, setList] = useState<readonly string[]>();

  async function loadData() {
    const data = await web3.contracts.nest.read.getCommunitiesOfSender();
    if (data) setList(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section className="p-page flex gap-x-4">
      {list &&
        list.map((uuid, key) => (
          <CommunityCard
            key={key}
            className="w-[calc(16.667%)]"
            communityUUID={uuid}
          />
        ))}
    </section>
  );
}

function CommunityCard(props: { communityUUID: string; className?: string }) {
  const web3 = useWeb3();

  const [community, setCommunity] =
    useState<Awaited<ReturnType<typeof web3.contracts.nest.read.groups>>>();

  async function loadData() {
    const data = await web3.contracts.nest.read.groups([props.communityUUID]);
    if (data) setCommunity(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      className={twMerge(
        "rounded-lg border border-front/30 overflow-hidden p-5 flex flex-col gap-y-3 relative bg-foreground duration-300 hover:scale-105",
        props.className
      )}
    >
      <h1 className="text-lg font-medium tracking-tight truncate">
        {community?.[0]}
      </h1>

      <img
        src={community?.[2]}
        alt={community?.[0]}
        className="aspect-square object-cover rounded-lg"
      />

      <p className="text-sm font-light">
        {community?.[1].slice(0, 50)}
        {(community?.[1].length || 0) > 51 && "..."}
      </p>
    </div>
  );
}
