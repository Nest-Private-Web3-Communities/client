import React, { useEffect, useRef, useState } from "react";
import { useIsInViewport } from "../../../../../hooks/useIsInView";
import useCommunity from "../../../CommunityContext";
import useEncryptionContext from "../../../../../contexts/encryptionContext";
import { Address } from "viem";
import useWeb3 from "../../../../../contexts/web3context";
import Emote, { EmoteType } from "../../../../../common/Emote";
import ModalShare from "../../modals/ModalShare";
import useModal from "../../../../../hooks/useModal";
import Icon from "../../../../../common/Icon";

export default function FeedItem(props: { postId: number }) {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const isInView = useIsInViewport(containerRef);
  const flag = useRef(false);

  const web3 = useWeb3();
  const { contract, data: communityInfo } = useCommunity();
  const emotes = communityInfo.reactions;
  const { decrypt } = useEncryptionContext();
  const modal = useModal();

  const [data, setData] = useState<
    Partial<{
      content: Record<string, string>;
      createdAt: number;
      userImage: string;
      userAddress: Address;
      userName: string;
    }>
  >({});

  function setProperty<K extends keyof typeof data>(
    key: K,
    value: (typeof data)[K]
  ) {
    setData((p) => ({ ...p, [key]: value }));
  }

  useEffect(() => {
    if (!flag.current) flag.current = isInView;
  }, [isInView]);

  async function loadData() {
    if (!contract) return;
    const postData = await contract.read.posts([BigInt(props.postId)]);
    const userAddress = postData[1];
    const createdAt = Number(postData[0]);
    setProperty("userAddress", userAddress);
    setProperty("createdAt", createdAt);
    setProperty("content", JSON.parse(decrypt(postData[2], createdAt)));

    web3.contracts.nest.read.getUserByAddress([userAddress]).then((res) => {
      setProperty("userImage", res.imageUrl), setProperty("userName", res.name);
    });
  }

  useEffect(() => {
    if (contract && flag) loadData();
  }, [flag, contract]);

  return (
    <div>
      <div className="flex py-4 px-4 border-b border-front border-opacity-25 justify-start gap-x-3">
        {data.userImage ? (
          <img
            src={data.userImage}
            className="rounded-full w-[3vw] aspect-square h-max"
          />
        ) : (
          <figure className="w-[3vw] rounded-full bg-gray-500/50 animate-pulse aspect-square" />
        )}

        <div className="flex flex-col">
          <div className="flex items-center gap-x-2">
            <h1 className="">{data.userName}</h1>
            <div className="bg-front h-[1.4ch] w-[1px] bg-opacity-50" />
            <h2 className="border-primary border text-front w-[5vw] truncate px-2 text-center text-xs h-max rounded-xl">
              {data.userAddress}
            </h2>
          </div>
          <div className="text-opacity-80 text-front">
            {data.content?.content}
          </div>
          {data.content?.imageUrl && (
            <img src={data.content.imageUrl} className="my-2 rounded-xl" />
          )}
          <div className="text-sm text-front text-opacity-40 self-end">
            {data.createdAt}
          </div>
          <div className="mt-2 flex justify-between">
            <div className="flex gap-x-4 relative">
              <div className="flex gap-x-1 group/open cursor-pointer">
                <div className="opacity-0 duration-100 pointer-events-none group-hover/open:pointer-events-auto group-hover/open:opacity-100 absolute bottom-full py-2">
                  <div className="bg-background p-1 flex items-center gap-x-1 rounded-md border border-front border-opacity-30">
                    {emotes &&
                      emotes.map((emote, key) => (
                        <button key={key} className="group/emote">
                          <Emote
                            name={emote.name as EmoteType}
                            color={`rgb(${emote.color})`}
                            className="text-[1.8vw] group-hover/emote:-translate-y-3 duration-150 bg-background rounded-full"
                          />
                        </button>
                      ))}
                  </div>
                </div>
                {/* <figure className="flex gap-x-1 items-center duration-200 ease-in">
                  <Icon icon="addReaction" className="text-[1.2rem]  " />
                  <p className="text-xs">{data.comments}</p>
                </figure> */}
              </div>
              {/* <button className="flex items-center gap-x-1 hover:text-primary text-front duration-150 ease-in">
                <Icon icon="chatBubble" className="text-[1.2rem]" />
                <p className="text-xs">{data.comments}</p>
              </button> */}
            </div>
            <button
              onClick={() => modal.show(<ModalShare />)}
              className="flex items-center gap-x-1 hover:text-primary text-front duration-150 ease-in hover:border-primary border px-2 py-1 rounded-full border-front"
            >
              <Icon icon="share" className="text-[1rem]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}