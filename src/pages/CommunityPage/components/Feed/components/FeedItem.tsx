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
import CopyWrapper from "../../../../../common/CopyWrapper";
import { Mutable } from "../../../../../types";
import { useAccount } from "@particle-network/connect-react-ui";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function FeedItem(props: { postId: number }) {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const isInView = useIsInViewport(containerRef);
  const flag = useRef(false);
  const params = useParams();
  const communityAddress = params.cid;

  const web3 = useWeb3();
  const { contract, data: communityInfo } = useCommunity();
  const emotes = communityInfo.reactions;
  const { decrypt } = useEncryptionContext();
  const modal = useModal();
  const account = useAccount();

  const [data, setData] = useState<
    Partial<{
      content: Record<string, string>;
      createdAt: number;
      userImage: string;
      userAddress: Address;
      userName: string;
      reactors: Address[];
      commentCount: number;
      userReaction: number;
      shouldHide: boolean;
    }>
  >({});
  const [pending, setPending] = useState(false);

  function setProperty<K extends keyof typeof data>(
    key: K,
    value: (typeof data)[K]
  ) {
    setData((p) => ({ ...p, [key]: value }));
  }

  useEffect(() => {
    if (!flag.current) flag.current = isInView;
  }, [isInView]);

  const postId = BigInt(props.postId);

  async function loadData() {
    if (!contract) return;
    const postData = await contract.read.posts([postId]);
    const userAddress = postData[1];
    const createdAt = Number(postData[0]);
    setProperty("userAddress", userAddress);
    setProperty("createdAt", createdAt);
    setProperty("content", JSON.parse(decrypt(postData[2], createdAt)));

    web3.contracts.nest.read.getUserByAddress([userAddress]).then((res) => {
      setProperty("userImage", res.imageUrl), setProperty("userName", res.name);
    });

    contract.read
      .getCommentCountOnPost([postId])
      .then((res) => setProperty("commentCount", Number(res)));

    contract.read.getReactorsOnPost([postId]).then((res) => {
      setProperty("reactors", res as Mutable<typeof res>);
      if (
        res
          .map((a) => a.toUpperCase())
          .includes(account?.toUpperCase() as Address)
      ) {
        contract.read
          .getReactionOnPostByUser([postId, account as Address])
          .then((res) => setProperty("userReaction", res));
      }
    });
  }

  const formattedDate = data.createdAt
    ? new Date(data.createdAt * 1000).toLocaleString()
    : "";

  function reactHandler(reactionIdx: number) {
    setPending(true);
    contract?.write.reactToPost([postId, reactionIdx]).then((res) => {
      web3.client?.waitForTransactionReceipt({ hash: res }).then(() => {
        setPending(false);
        loadData();
      });
    });
  }

  useEffect(() => {
    if (contract && flag) loadData();
  }, [flag, contract]);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "relative flex py-4 px-4 border-b border-front border-opacity-25 justify-start gap-x-3",
        data?.shouldHide && "hidden"
      )}
    >
      {pending && (
        <figure className="z-10 bg-gray-500/50 cursor-not-allowed absolute-cover animate-pulse" />
      )}

      {data.userImage ? (
        <img
          src={data.userImage}
          className="rounded-full w-[3vw] aspect-square h-max object-cover"
        />
      ) : (
        <figure className="w-[3vw] rounded-full bg-gray-500/50 animate-pulse aspect-square" />
      )}

      <div className="flex flex-col w-full">
        <div className="flex items-center gap-x-2">
          <h1 className="">{data.userName}</h1>
          <div className="bg-front h-[1.4ch] w-[1px] bg-opacity-50" />
          <CopyWrapper>
            <h2 className="border-primary border text-front w-[5vw] truncate px-2 text-center text-xs h-max rounded-xl">
              {data.userAddress}
            </h2>
          </CopyWrapper>

          <figure className="flex-1" role="separator" />

          <p className="text-xs text-front/40 self-end">{formattedDate}</p>
        </div>

        <div className="text-opacity-80 text-front">
          {data.content?.content}
        </div>
        {data.content?.imageUrl && (
          <img src={data.content.imageUrl} className="my-2 rounded-xl" />
        )}
        <div className="mt-2 flex justify-between w-full">
          <div className="flex gap-x-4 relative">
            {emotes?.length != 0 && (
              <div className="flex gap-x-1 group/open cursor-pointer">
                <div className="opacity-0 duration-100 pointer-events-none group-hover/open:pointer-events-auto group-hover/open:opacity-100 absolute bottom-full py-2">
                  <div className="bg-background p-1 flex items-center gap-x-1 rounded-md border border-front border-opacity-30">
                    {emotes &&
                      emotes.map((emote, key) => (
                        <button
                          key={key}
                          className="group/emote"
                          onClick={() => {
                            reactHandler(key);
                          }}
                          disabled={pending}
                        >
                          <Emote
                            name={emote.name as EmoteType}
                            color={`rgb(${emote.color})`}
                            className="text-[1.8vw] group-hover/emote:-translate-y-3 duration-150 bg-background rounded-full"
                          />
                        </button>
                      ))}
                  </div>
                </div>
                <button
                  disabled={pending}
                  className="flex gap-x-1 items-center duration-200 ease-in"
                >
                  {emotes && data.userReaction != undefined ? (
                    <Emote
                      name={emotes[data.userReaction - 1].name as EmoteType}
                      color={`rgb(${emotes[data.userReaction - 1].color})`}
                      className="text-[1.2rem]"
                    />
                  ) : (
                    <Icon icon="addReaction" className="text-[1.2rem]" />
                  )}
                  <p className="text-xs">{data.reactors?.length}</p>
                </button>
              </div>
            )}
            <button
              className="flex items-center gap-x-1 hover:text-primary text-front duration-150 ease-in"
              disabled={pending}
            >
              <Icon icon="chatBubble" className="text-[1.2rem]" />
              <p className="text-xs">{data.commentCount}</p>
            </button>
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
  );
}
