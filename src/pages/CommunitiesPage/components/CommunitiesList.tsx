import React, { useEffect, useState } from "react";
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
    <section className="p-page">
      {list &&
        list.map((uuid, key) => (
          <CommunityCard key={key} className="w-1/6" communityUUID={uuid} />
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
    <div className={twMerge("", props.className)}>
      <img
        src={community?.[2]}
        alt={community?.[0]}
        className="aspect-video object-cover"
      />
      <h1>{community?.[0]}</h1>
      <p>{community?.[1]}</p>
    </div>
  );
}
