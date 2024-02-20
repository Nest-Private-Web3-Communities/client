import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useCommunity from "../../CommunityContext";
import { Address } from "viem";
import useEncryptionContext from "../../../../contexts/encryptionContext";
import useWeb3, { AbiReadResponseType } from "../../../../contexts/web3context";
import { Mutable } from "../../../../types";
import { useAccount } from "@particle-network/connect-react-ui";
import { useNavigate } from "react-router-dom";
import CopyWrapper from "../../../../common/CopyWrapper";
import useClickOutside from "../../../../hooks/useClickOutside";
import useIdleScrollbar from "../../../../hooks/useIdleScrollbar";
import { rangeArray } from "../../../../utils";

export default function ModalPost(props: { post: string }) {
  const [loaded, setLoaded] = useState(false);
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
      network: string;
    }>
  >({});
  const postId = BigInt(props.post);

  const { contract, data: communityInfo } = useCommunity();
  const { decrypt } = useEncryptionContext();
  const web3 = useWeb3();
  const account = useAccount();
  const navigate = useNavigate();

  const [commentInput, setCommentInput] = useState("");
  const [pending, setPending] = useState(false);

  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useClickOutside(modalRef, () => loaded && navigate({ search: "" }));
  useIdleScrollbar(modalRef);

  function setProperty<K extends keyof typeof data>(
    key: K,
    value: (typeof data)[K]
  ) {
    setData((p) => ({ ...p, [key]: value }));
  }

  const shouldHide =
    data.createdAt &&
    communityInfo.userJoinedAt &&
    data.createdAt < communityInfo.userJoinedAt;

  async function loadData() {
    if (!contract) return;
    const postData = await contract.read.posts([postId]);
    const userAddress = postData[1];
    const createdAt = Number(postData[0]);
    setProperty("userAddress", userAddress);
    setProperty("createdAt", createdAt);
    setProperty("content", JSON.parse(decrypt(postData[2], createdAt)));
    setProperty("network", postData[3]);

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

  function commentHandler() {
    setPending(true);
    contract?.write
      .commentOnPost([postId, commentInput])
      .then((res) =>
        web3.client?.waitForTransactionReceipt({ hash: res }).finally(() => {
          setPending(false);
          loadData();
          setCommentInput("");
        })
      )
      .catch(() => setPending(false));
  }

  useEffect(() => {
    setLoaded(true);
    loadData();
  }, []);

  useEffect(() => {
    if (shouldHide) navigate({ search: "" });
  }, [shouldHide]);

  return (
    <div
      ref={modalRef}
      className={twMerge(
        "bg-background pt-5 h-[90vh] overflow-y-scroll scrollbar-primary pb-6 flex flex-col items-stretch w-[35vw] rounded-t-3xl shadow-[0px_-2px_4px] shadow-front/30 duration-500",
        loaded ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex trunacte items-end relative">
        <span className="text-xs text-front/50 pl-5 absolute bottom-0 left-2">
          #{props.post}
        </span>
        <h1 className="flex-1 text-center text-sm ">
          Posted to network : {data.network}
        </h1>
      </div>
      <div className="border-t border-front/30 mt-4 py-3 px-10 flex">
        <img
          className="aspect-square object-cover w-1/6 rounded-full  "
          src={data.userImage}
          alt="user show"
        />
        <div className="px-4 flex flex-col gap-y-1">
          <p className="font-light">Author :</p>
          <p className="truncate text-sm font-medium">{data.userName}</p>
          <CopyWrapper className="truncate w-1/2 text-xs font-light text-front/70">
            {data.userAddress}
          </CopyWrapper>
        </div>
      </div>
      {data.content?.imageUrl && (
        <img src={data.content.imageUrl} className="my-2" />
      )}
      <div className="text-opacity-80 text-front px-5 pt-2 pb-4 border-b border-front/30">
        {data.content?.content}
      </div>

      <div className="flex items-end p-4 gap-x-4">
        <textarea
          className="bg-transparent flex-1 resize-none border border-front/40 rounded p-1 text-xs"
          placeholder="Comment on this post..."
          rows={3}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <button
          className="bg-primary text-back px-4 text-sm py-1 rounded-md disabled:opacity-50 disabled:animate-pulse"
          onClick={commentHandler}
          disabled={pending}
        >
          Comment
        </button>
      </div>

      {data.commentCount != undefined &&
        data.commentCount > 0 &&
        rangeArray(data.commentCount).map((commentIdx) => (
          <CommentCard postId={postId} commentId={BigInt(commentIdx)} />
        ))}
    </div>
  );
}

function CommentCard(props: { commentId: bigint; postId: bigint }) {
  const [data, setData] =
    useState<AbiReadResponseType<"community", "getCommentOnPostById">>();
  const [user, setUser] = useState<AbiReadResponseType<"nest", "users">>();

  const { contract } = useCommunity();
  const web3 = useWeb3();

  useEffect(() => {
    contract?.read
      .getCommentOnPostById([props.postId, props.commentId])
      .then((res) => setData(res));
  }, []);

  useEffect(() => {
    if (data)
      web3.contracts.nest.read.users([data.sender]).then((res) => setUser(res));
  }, [data]);

  const formattedDate = data?.createdAt
    ? new Date(Number(data.createdAt) * 1000).toLocaleString()
    : "";

  return (
    <div className="border-y flex items-start gap-x-3 border-front/20 px-5 py-3 text-sm">
      {/* <img
        className="w-[3vw] text-base object-cover aspect-square rounded-full"
        src={user?.[2]}
        alt={user?.[1]}
      />

      <div className="flex gap-x-3 flex-col">
        <p className="">{user?.[1]}</p>
        <span className="text-sm mt-2 text-front">{data?.content}</span>
      </div> */}
      {user?.[2] ? (
        <img
          src={user[2]}
          className="rounded-full w-[3vw] aspect-square h-max object-cover"
        />
      ) : (
        <figure className="w-[3vw] rounded-full bg-gray-500/50 animate-pulse aspect-square" />
      )}

      <div className="w-full">
        <div className="flex items-center gap-x-2">
          <h1 className="">{user?.[1]}</h1>
          <div className="bg-front h-[1.4ch] w-[1px] bg-opacity-50" />
          <CopyWrapper>
            <h2 className="border-primary border text-front w-[5vw] truncate px-2 text-center text-xs h-max rounded-xl">
              {data?.sender}
            </h2>
          </CopyWrapper>

          <figure className="flex-1" role="separator" />

          <p className="text-xs text-front/40 self-end">{formattedDate}</p>
        </div>

        <div className="text-opacity-80 text-front mt-1">{data?.content}</div>
      </div>
    </div>
  );
}
