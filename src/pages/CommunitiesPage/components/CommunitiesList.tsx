import React, { useEffect, useRef, useState } from "react";
import useWeb3, { AbiReadResponseType } from "../../../contexts/web3context";
import { twMerge } from "tailwind-merge";
import { Link, Navigate } from "react-router-dom";
import { Address, getContract } from "viem";
import community from "../../../contracts/community";

export default function CommunitiesList() {
  const web3 = useWeb3();

  const [list, setList] =
    useState<AbiReadResponseType<"nest", "getCommunitiesOfSender">>();

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
        list.map((addr, key) => (
          <CommunityCard
            key={key}
            className="w-[calc(16.667%)]"
            communityAddress={addr}
          />
        ))}
    </section>
  );
}

function CommunityCard(props: {
  communityAddress: Address;
  className?: string;
}) {
  const web3 = useWeb3();
  if (!web3.client) return <Navigate to="/" />;

  const [data, setData] =
    useState<Record<"name" | "description" | "imageUrl", string>>();

  const communityContract = getContract({
    abi: community.abi,
    address: props.communityAddress,
    client: web3.client,
  });

  async function loadData() {
    const name = await communityContract.read.name();
    const description = await communityContract.read.description();
    const imageUrl = await communityContract.read.imageUrl();
    setData({ name, description, imageUrl });
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Link
      to={`/community/${props.communityAddress}`}
      className={twMerge(
        "rounded-lg border border-front/30 overflow-hidden p-5 flex flex-col gap-y-3 relative bg-foreground duration-300 hover:scale-105 text-start",
        props.className
      )}
    >
      <h1 className="text-lg font-medium tracking-tight truncate">
        {data?.name}
      </h1>

      <img
        src={data?.imageUrl}
        alt={data?.name}
        className="aspect-square object-cover rounded-lg"
      />

      <p className="text-sm font-light">
        {data?.description.slice(0, 50)}
        {(data?.description.length || 0) > 51 && "..."}
      </p>
    </Link>
  );
}
