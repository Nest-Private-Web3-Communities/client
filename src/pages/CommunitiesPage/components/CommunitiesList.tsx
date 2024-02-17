import React, { useEffect, useRef, useState } from "react";
import useWeb3, { AbiReadResponseType } from "../../../contexts/web3context";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

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
    <section className="p-page flex gap-x-6">
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
    useState<AbiReadResponseType<"communities">>();

  async function loadData() {
    const data = await web3.contracts.nest.read.communities([
      props.communityUUID,
    ]);
    if (data) setCommunity(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Link
      to={`/community/${props.communityUUID}`}
      className={twMerge(
        "rounded-lg shadow shadow-front/25 overflow-hidden p-5 flex flex-col items-center gap-y-3 relative bg-background border-foreground duration-300 hover:scale-105 text-start min-w-[18vw]",
        props.className
      )}
    >
      <h1 className="text-lg font-medium tracking-tight truncate border-b w-full text-center border-front border-opacity-20 pb-1">
        {community?.[0]}
      </h1>

      <img
        src={community?.[2]}
        alt={community?.[0]}
        className="aspect-square object-cover rounded-lg w-[12vw]"
      />

      <p className="text-sm font-light text-center">
        {community?.[1].slice(0, 150)}
        {(community?.[1].length || 0) > 151 && "..."}
      </p>
    </Link>
  );
}
