import React, { useEffect, useRef, useState } from "react";
import useIdleScrollbar from "../../../../../hooks/useIdleScrollbar";
import useModal from "../../../../../hooks/useModal";
import Icon from "../../../../../common/Icon";
import useCommunity from "../../../CommunityContext";
import { rangeArray } from "../../../../../utils";
import { useIsInViewport } from "../../../../../hooks/useIsInView";
import useWeb3 from "../../../../../contexts/web3context";
import { Address } from "viem";
import CopyWrapper from "../../../../../common/CopyWrapper";

export default function Members() {
  const membersContainerRef =
    useRef() as React.MutableRefObject<HTMLDivElement>;
  useIdleScrollbar(membersContainerRef);

  const { data } = useCommunity();
  const { memberCount } = data;

  return (
    <section className="basis-1/3">
      <h1 className="mt-6 text-lg font-bold px-4 border-b border-front border-opacity-25 pb-1">
        Community Members
      </h1>
      <div className="flex gap-x-2 items-center border border-primary rounded-lg py-2 border-opacity-80 mx-4 my-2">
        <input
          placeholder="Search your friend"
          className="focus:outline-none bg-background px-3 w-[85%] border-r border-primary border-opacity-40"
        />
        <Icon icon="search" className="text-[1.4rem] text-primary" />
      </div>
      <div
        ref={membersContainerRef}
        className="mx-4 flex flex-col gap-y-4 bg-secondary p-4 rounded-lg border border-front border-opacity-20  overflow-y-scroll scrollbar-primary max-h-[30vh]"
      >
        {memberCount &&
          rangeArray(Number(memberCount)).map((i, key) => (
            <MemberCard userIdx={i} key={key} />
          ))}
      </div>
    </section>
  );
}

function MemberCard(props: { userIdx: number }) {
  const web3 = useWeb3();
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const isInView = useIsInViewport(cardRef);
  const flag = useRef(false);
  const { contract } = useCommunity();

  const [data, setData] = useState<{
    name: string;
    imageUrl: string;
    address: string;
  }>();

  useEffect(() => {
    if (!flag.current) flag.current = isInView;
  }, [isInView]);

  async function loadData() {
    if (!contract) return;
    const userAddress = await contract.read.members([BigInt(props.userIdx)]);
    const res = await web3.contracts.nest.read.getUserByAddress([userAddress]);
    setData({ imageUrl: res.imageUrl, name: res.name, address: userAddress });
  }

  useEffect(() => {
    if (contract && flag) loadData();
  }, [flag, contract]);

  return (
    <div
      ref={cardRef}
      key={data?.address}
      className="flex justify-between border-b pb-2 border-front border-opacity-20 gap-x-4"
    >
      <div className="flex gap-x-2 justify-center items-center relative">
        <div className="relative">
          {data ? (
            <img
              src={data.imageUrl}
              className="w-[3vw] aspect-square rounded-full object-cover"
            />
          ) : (
            <figure className="w-[3vw] aspect-square rounded-full bg-gray-500/50 animate-pulse" />
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold">{data?.name}</h2>

          <CopyWrapper>
            <p className="text-sm text-front text-opacity-50 w-[8vw] truncate">
              {data?.address}
            </p>
          </CopyWrapper>
        </div>
      </div>
      <button className="relative hover:bg-background rounded-full group px-3 py-1 aspect-square cursor-not-allowed border-front border-opacity-0 hover:border-opacity-20 border text-primary text-opacity-100 duration-200 ease-in">
        <Icon icon="chat" className="text-[1.2rem] " />
        <p className="absolute right-full -translate-x-3 top-1/2 -translate-y-1/2 px-2 py-1 opacity-0 duration-150 group-hover:opacity-100 rounded border border-white/40 text-[10px] bg-black text-white w-max">
          Messaging will be
          <br /> available soon
        </p>
      </button>
    </div>
  );
}
