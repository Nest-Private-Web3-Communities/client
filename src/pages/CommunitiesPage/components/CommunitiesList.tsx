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
  const [loading, setLoading] = useState(false);
  const cardRef = useRef() as React.MutableRefObject<HTMLAnchorElement>;
  const glowRef = useRef() as React.MutableRefObject<HTMLDivElement>;

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

  function glowWithMouse(event: { x: number; y: number }) {
    const cardRect = cardRef.current.getBoundingClientRect();
    glowRef.current.style.setProperty("--x", `${event.x - cardRect.x}px`);
    glowRef.current.style.setProperty("--y", `${event.y - cardRect.y}px`);

    useEffect(() => {
      loadData();
      if (data) {
        setLoading(false);
      }
    }, [data]);
  }

  useEffect(() => {
    const isSmallScreen = window.innerWidth < 768;

    if (!isSmallScreen) {
      window.addEventListener("mousemove", glowWithMouse);
    }

    return () => {
      if (!isSmallScreen) {
        window.removeEventListener("mousemove", glowWithMouse);
      }
    };
  }, []);

  return (
    <>
      {loading ? (
        <div
          className={twMerge(
            "rounded-lg shadow shadow-front/25 border overflow-hidden border-opacity-50 p-5 flex flex-col items-center gap-y-3 relative bg-background border-front duration-300 hover:scale-105 text-start min-w-[18vw]",
            props.className
          )}
        >
          <div className="aspect-square rounded-full object-contain w-[10vw] bg-primary bg-opacity-20 animate-pulse" />
          <div className="text-lg pb-1 w-full bg-primary rounded-3xl bg-opacity-20 animate-pulse h-[4vh]" />
          <div className="text-sm font-light text-center bg-primary bg-opacity-20 animate-pulse apsect-square w-full h-[10vh] rounded-xl" />
        </div>
      ) : (
        <Link
          ref={cardRef}
          to={`/community/${props.communityAddress}`}
          className={twMerge(
            "rounded-lg md:relative md:w-[calc(50%_-_1.25rem)] shadow shadow-front/25 border overflow-hidden border-opacity-50 p-5 flex flex-col items-center gap-y-3 relative bg-background border-front duration-300 hover:scale-105 text-start min-w-[18vw]",
            props.className
          )}
        >
          <div
            ref={glowRef}
            className="absolute bg-white bg-opacity-10 z-1 md:top-[var(--y)] md:left-[var(--x)] blur-3xl
      md:w-[20vw] w-full h-[20vw] rounded-full -translate-x-1/2 -translate-y-1/2"
          />
          <img
            src={data?.imageUrl}
            alt={data?.name}
            className="aspect-square rounded-lg object-contain w-[10vw]"
          />
          <h1 className="text-lg font-medium tracking-tight truncate border-b border-opacity-50 pb-1 w-full text-center border-front">
            {data?.name}
          </h1>
          <p className="text-sm font-light text-center">
            {data?.description.slice(0, 100)}
            {(data?.description.length || 0) > 101 && "..."}
          </p>
        </Link>
      )}
    </>
  );
}

// return (
//   <div
//     className="w-full min-h-[200px] md:relative flex flex-col items-center p-4 md:w-[calc(50%_-_1.25rem)] bg-black
//       rounded-lg border border-white border-opacity-20 gap-y-4 overflow-hidden"
//   >
//     <h3 className="text-2xl font-semibold">{props.title}</h3>
//     <p className="text-sm mt-2 text-white text-opacity-70">{props.content}</p>
//   </div>
// );
