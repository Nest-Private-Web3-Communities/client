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
    <section className="p-page flex gap-x-6">
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
        "rounded-lg shadow shadow-front/25 border overflow-hidden border-opacity-50 p-5 flex flex-col items-center gap-y-3 relative bg-background border-front duration-300 hover:scale-105 text-start min-w-[18vw]",
        props.className
      )}
    >
      <h1 className="text-lg font-medium tracking-tight truncate border-b border-opacity-50 pb-1 w-full text-center border-front">
        {data?.name}
      </h1>

      <img
        src={data?.imageUrl}
        alt={data?.name}
        className="aspect-square rounded-lg object-contain w-[10vw]"
      />

      <p className="text-sm font-light text-center">
        {data?.description.slice(0, 100)}
        {(data?.description.length || 0) > 101 && "..."}
      </p>
    </Link>
  );
}
