import React, { useEffect, useRef, useState } from "react";
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
import FeedItem from "./components/FeedItem";
import NetworkDetails from "./components/NetworkDetails";
import { Mutable } from "../../../../types";

// const dummy = [
//   {
//     name: "Katherine",
//     address: "1Bm6jeIxA6aTCGSLU0iJLljE9OUPmEBjjU",
//     content: "I am loving this Web3 space, what about you people?",
//     comments: "23",
//     imageUrl:
//       "https://dailycoin.com/wp-content/uploads/2023/05/gaming_vr_money_dollar_world__metaverse_pixel_web.jpg",
//     userImage: "https://randomuser.me/api/portraits/women/42.jpg",
//     timestamp: "12:23, 2nd Feb' 2023",
//   },
//   {
//     name: "Sanjana Sangani",
//     address: "1Bm6jeIxA6aTCGSLU0iJLljE9OUPmEBjjU",
//     content:
//       "Just staked my $AVAX on the Avalanche network! 💎 Excited to be part of the decentralized future and earn rewards while securing the network. #Avalanche #DeFi #Web3",
//     comments: "23",
//     imageUrl:
//       "https://assets.finbold.com/uploads/2022/10/Final-Fantasy-developer-partners-with-Avalanche-to-launch-its-first-Web3-game.jpg",
//     userImage: "https://randomuser.me/api/portraits/women/94.jpg",
//     timestamp: "12:23, 2nd Feb' 2023",
//   },
//   {
//     name: "Jasmine",
//     address: "1dIHQCQ6Nd80a45Yuk4ibkgc4vzMgvQBno",
//     content:
//       "Something is coming tonight. If i like your reply, you are whitelisted.",
//     comments: 353,
//     userImage: "https://randomuser.me/api/portraits/women/19.jpg",
//     timestamp: "12:23, 2nd Feb' 2023",
//   },
//   {
//     name: "Sarthak Singh",
//     address: "1dkAmfiK9945y77Sfs2GyDf5ay018oug7J",
//     content: "We are thinking about doing a giveaway soon? Should we?!?! 😁",
//     comments: 23,
//     imageUrl:
//       "https://pbs.twimg.com/media/GGVbVhabkAAPRjF?format=jpg&name=900x900",
//     userImage: "https://randomuser.me/api/portraits/men/23.jpg",
//     timestamp: "12:23, 2nd Feb' 2023",
//   },
//   {
//     name: "Nikola",
//     address: "1txWphwRPsAeQmoLPhFdIBV9Emhloxhb8l",
//     content:
//       "Drop your wallet addys, Will pick one for a free airdrop ;) Have your DMs open",
//     comments: 23,
//     userImage: "https://randomuser.me/api/portraits/men/3.jpg",
//     timestamp: "12:23, 2nd Feb' 2023",
//   },
//   {
//     name: "MooPals",
//     address: "1Auqo9hBSvOC3VJiVWvtXzn30MVMefkCQR",
//     content: "It's nearly time…🥛 But wen is wen?",
//     comments: 353,
//     userImage: "https://randomuser.me/api/portraits/women/45.jpg",
//     imageUrl:
//       "https://pbs.twimg.com/media/GGLDb_3WwAAakuj?format=jpg&name=900x900",
//     timestamp: "12:23, 2nd Feb' 2023",
//   },
// ];

export default function Feed() {
  const { contract, pageConfig } = useCommunity();
  const { currentSelectedNetwork } = pageConfig;

  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useIdleScrollbar(containerRef);

  function scrollBack() {
    if (containerRef.current !== null) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const [posts, setPosts] = useState<bigint[]>([]);

  useEffect(() => {
    if (contract)
      contract.read
        .getPostsByNetwork([currentSelectedNetwork])
        .then((res) => setPosts(res as Mutable<typeof res>));
  }, [contract, currentSelectedNetwork]);

  return (
    <div className="text-front flex flex-col h-screen border-x border-opacity-20 border-front w-[40vw] z-10 overflow-y-hidden bg-background">
      <Header />
      <NetworkDetails />

      <div
        className="overflow-y-scroll scrollbar-primary flex-1"
        ref={containerRef}
      >
        {posts.map((post, key) => (
          <FeedItem postId={Number(post)} key={key} />
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
