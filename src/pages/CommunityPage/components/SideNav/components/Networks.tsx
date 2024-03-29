import React, { useEffect, useRef, useState } from "react";
import useIdleScrollbar from "../../../../../hooks/useIdleScrollbar";
import useModal from "../../../../../hooks/useModal";
import Icon from "../../../../../common/Icon";
import useCommunity from "../../../CommunityContext";
import ModalAddNetowrk from "../../modals/ModalAddNetwork";
import { useIsInViewport } from "../../../../../hooks/useIsInView";
import { rangeArray } from "../../../../../utils";
import { twMerge } from "tailwind-merge";
import { networkImagePlaceholder } from "../../../../../config";

export default function SubgroupList() {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useIdleScrollbar(containerRef);
  const { data } = useCommunity();
  const { networkCount } = data;
  const modal = useModal();

  return (
    <section className="basis-1/2">
      <h1 className="text-xl font-bold px-4 border-b border-front border-opacity-25 pb-1 pt-2">
        Networks
      </h1>
      <div
        ref={containerRef}
        className="flex flex-col max-h-[40vh] gap-y-3 flex-1 overflow-y-scroll scrollbar-primary mt-2 px-2 py-2 rounded-lg border border-opacity-25 border-front mx-4 bg-secondary"
      >
        {networkCount != undefined &&
          networkCount > 0 &&
          rangeArray(Number(networkCount)).map((i, key) => (
            <NetworkCard networkIdx={i} key={key} />
          ))}
        {data.userIsAdmin && (
          <button
            onClick={() => modal.show(<ModalAddNetowrk />)}
            className=" bg-foreground bg-opacity-60 hover:bg-opacity-100 duration-200 ease-in px-3 border-front border border-opacity-20 py-4 rounded-lg flex items-center min-w-[15vw] justify-between"
          >
            <div className="flex gap-x-4 items-center w-full justify-center">
              <Icon
                icon="add"
                className="rounded-full bg-front text-background w-[2.5vw] h-full p-2"
              />
              <div className="flex flex-col">
                <h2 className="font-semibold whitespace-nowrap">
                  Add a new network
                </h2>
              </div>
            </div>
          </button>
        )}
      </div>
    </section>
  );
}

function NetworkCard(props: { networkIdx: number }) {
  const cardRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const isInView = useIsInViewport(cardRef);
  const flag = useRef(false);
  const { contract, pageConfig, setPageConfig } = useCommunity();

  const [data, setData] = useState<{
    name: string;
    imageUrl: string;
    description: string;
  }>();

  useEffect(() => {
    if (!flag.current) flag.current = isInView;
  }, [isInView]);

  async function loadData() {
    if (!contract) return;
    const networkName = await contract.read.networkNames([
      BigInt(props.networkIdx),
    ]);
    const res = await contract.read.networks([networkName]);
    setData({ imageUrl: res[0], name: networkName, description: res[1] });
  }

  useEffect(() => {
    if (contract && flag) loadData();
  }, [flag, contract]);

  return (
    <div
      role="button"
      ref={cardRef}
      onClick={() =>
        data &&
        setPageConfig((p) => ({ ...p, currentSelectedNetwork: data.name }))
      }
      className={twMerge(
        "cursor-pointer bg-foreground  bg-opacity-40 duration-200 ease-in px-3 border-front border border-opacity-20 py-4 rounded-lg flex items-center min-w-[15vw] gap-x-3",
        pageConfig.currentSelectedNetwork == data?.name
          ? "bg-opacity-100 border-opacity-100 outline outline-front/40 pointer-events-none select-none"
          : "hover:bg-opacity-75"
      )}
    >
      <img
        draggable={false}
        src={data?.imageUrl || networkImagePlaceholder}
        onError={(e) => (e.currentTarget.src = networkImagePlaceholder)}
        className="rounded-full bg-front text-background text-center w-[3vw] aspect-square object-cover"
      />
      <div className="flex flex-col truncate">
        <h2 className="font-semibold truncate">{data?.name}</h2>
        <p className="text-xs text-front/60 truncate">{data?.description}</p>
      </div>
    </div>
  );
}
