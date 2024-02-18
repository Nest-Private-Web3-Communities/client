import React, { useRef, useState } from "react";
import Icon from "../../../../common/Icon";
import useIdleScrollbar from "../../../../hooks/useIdleScrollbar";
import Emote, { EmoteType } from "../../../../common/Emote";
import Header from "./components/Header";
import useCommunity from "../../CommunityContext";
import useModal from "../../../../hooks/useModal";
import ModalShare from "../modals/ModalShare";
import useEncryptionContext from "../../../../contexts/encryptionContext";
import CryptoJS from "crypto-js";
import { keyBase } from "../../../../config";

const dummy = [
  {
    name: "Katherine",
    address: "1Bm6jeIxA6aTCGSLU0iJLljE9OUPmEBjjU",
    content: "I am loving this Web3 space, what about you people?",
    comments: "23",
    imageUrl:
      "https://dailycoin.com/wp-content/uploads/2023/05/gaming_vr_money_dollar_world__metaverse_pixel_web.jpg",
    userImage: "https://randomuser.me/api/portraits/women/42.jpg",
    timestamp: "12:23, 2nd Feb' 2023",
  },
  {
    name: "Sanjana Sangani",
    address: "1Bm6jeIxA6aTCGSLU0iJLljE9OUPmEBjjU",
    content:
      "Just staked my $AVAX on the Avalanche network! 💎 Excited to be part of the decentralized future and earn rewards while securing the network. #Avalanche #DeFi #Web3",
    comments: "23",
    imageUrl:
      "https://assets.finbold.com/uploads/2022/10/Final-Fantasy-developer-partners-with-Avalanche-to-launch-its-first-Web3-game.jpg",
    userImage: "https://randomuser.me/api/portraits/women/94.jpg",
    timestamp: "12:23, 2nd Feb' 2023",
  },
  {
    name: "Jasmine",
    address: "1dIHQCQ6Nd80a45Yuk4ibkgc4vzMgvQBno",
    content:
      "Something is coming tonight. If i like your reply, you are whitelisted.",
    comments: 353,
    userImage: "https://randomuser.me/api/portraits/women/19.jpg",
    timestamp: "12:23, 2nd Feb' 2023",
  },
  {
    name: "Sarthak Singh",
    address: "1dkAmfiK9945y77Sfs2GyDf5ay018oug7J",
    content: "We are thinking about doing a giveaway soon? Should we?!?! 😁",
    comments: 23,
    imageUrl:
      "https://pbs.twimg.com/media/GGVbVhabkAAPRjF?format=jpg&name=900x900",
    userImage: "https://randomuser.me/api/portraits/men/23.jpg",
    timestamp: "12:23, 2nd Feb' 2023",
  },
  {
    name: "Nikola",
    address: "1txWphwRPsAeQmoLPhFdIBV9Emhloxhb8l",
    content:
      "Drop your wallet addys, Will pick one for a free airdrop ;) Have your DMs open",
    comments: 23,
    userImage: "https://randomuser.me/api/portraits/men/3.jpg",
    timestamp: "12:23, 2nd Feb' 2023",
  },
  {
    name: "MooPals",
    address: "1Auqo9hBSvOC3VJiVWvtXzn30MVMefkCQR",
    content: "It's nearly time…🥛 But wen is wen?",
    comments: 353,
    userImage: "https://randomuser.me/api/portraits/women/45.jpg",
    imageUrl:
      "https://pbs.twimg.com/media/GGLDb_3WwAAakuj?format=jpg&name=900x900",
    timestamp: "12:23, 2nd Feb' 2023",
  },
];

export default function Feed() {
  const { data, contract } = useCommunity();
  const encryption = useEncryptionContext();
  const emotes = data.reactions;
  const modal = useModal();

  console.log(encryption.keyMaster);

  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useIdleScrollbar(containerRef);

  function scrollBack() {
    if (containerRef.current !== null) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="text-front flex flex-col h-screen border-x border-opacity-20 border-front w-[40vw] z-10 overflow-y-hidden bg-background">
      <Header />

      <div
        className="overflow-y-scroll scrollbar-primary flex-1"
        ref={containerRef}
      >
        {dummy.map((data, i) => (
          <div key={i}>
            <div className="flex py-4 px-4 border-b border-front border-opacity-25 justify-start gap-x-3">
              <img
                src={data.userImage}
                className="rounded-full w-[3vw] aspect-square h-max"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-x-2">
                  <h1 className="">{data.name}</h1>
                  <div className="bg-front h-[1.4ch] w-[1px] bg-opacity-50" />
                  <h2 className="border-primary border text-front w-[5vw] truncate px-2 text-center text-xs h-max rounded-xl">
                    {data.address}
                  </h2>
                </div>
                <div className="text-opacity-80 text-front">{data.content}</div>
                {data.imageUrl && (
                  <img src={data.imageUrl} className="my-2 rounded-xl" />
                )}
                <div className="text-sm text-front text-opacity-40 self-end">
                  {data.timestamp}
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
                      <figure className="flex gap-x-1 items-center duration-200 ease-in">
                        <Icon icon="addReaction" className="text-[1.2rem]  " />
                        <p className="text-xs">{data.comments}</p>
                      </figure>
                    </div>
                    <button className="flex items-center gap-x-1 hover:text-primary text-front duration-150 ease-in">
                      <Icon icon="chatBubble" className="text-[1.2rem]" />
                      <p className="text-xs">{data.comments}</p>
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
          </div>
        ))}
        <div className="items-center w-full justify-center pt-6 pb-4 text-primary text-lg font-semibold tracking-wider flex flex-col">
          <button
            className="text-[2.5rem] animate-bounce"
            onClick={() => scrollBack()}
          >
            <Icon icon="keyboardDoubleArrowUp" />
          </button>
          <span className="">You have seen it all!</span>
        </div>
      </div>
    </div>
  );
}
