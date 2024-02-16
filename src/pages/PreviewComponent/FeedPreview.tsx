import React, { useRef, useState } from "react";
import Icon from "../../common/Icon";
import useIdleScrollbar from "../../hooks/useIdleScrollbar";
import Emote from "../../common/Emote";
import { emoteDeclarations } from "../../common/Emote";

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
    content: "It’s nearly time…🥛 But wen is wen?",
    comments: 353,
    userImage: "https://randomuser.me/api/portraits/women/45.jpg",
    imageUrl:
      "https://pbs.twimg.com/media/GGLDb_3WwAAakuj?format=jpg&name=900x900",
    timestamp: "12:23, 2nd Feb' 2023",
  },
];

export default function FeedPreview() {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useIdleScrollbar(containerRef);
  const emojis = [
    "smile_face",
    "sad_face",
    "natural_face",
    "heart",
    "like",
    "dislike",
  ];

  function scrollBack() {
    if (containerRef.current !== null) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const [showReactions, setShowReactions] = useState(false);

  return (
    <div className="text-front flex flex-col h-screen border-x border-opacity-20 border-front w-[40vw] z-10 overflow-y-hidden bg-background">
      <div className="bg-foreground py-4 px-4">
        <div className="flex gap-x-3 bg-secondary py-2 px-3 rounded-md border border-front border-opacity-25">
          <div className="relative h-max">
            <img
              src="https://randomuser.me/api/portraits/women/12.jpg"
              className="rounded-full w-[4vw] aspect-square self-start"
            />
            <div className="bg-green-500 w-[2ch] rounded-full -right-1 bottom-0 border-4 border-foreground aspect-square absolute" />
          </div>

          <div className="w-full">
            <textarea
              placeholder="What's on your mind?!"
              className="text-front w-full bg-secondary focus:outline-none pt-2"
            />
            <div className="flex text-primary text-xl gap-x-1 items-center w-full">
              <Icon icon="photoLibrary" />
              <Icon icon="gif" />
              <Icon icon="mood" />

              <figure role="separator" className="flex-1" />

              <button
                className="text-white bg-primary text-sm px-4 py-1 rounded-3xl font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={true}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full border-b border-front border-opacity-25" />
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
                    <button className="flex items-center gap-x-1 text-front duration-150 ease-in group">
                      <div className="absolute hidden duration-300 ease-in group-hover:-translate-y-9 shadow-primary gap-x-2 rounded-lg shadow-sm border border-primary bg-background p-1 group-hover:flex">
                        <Emote
                          name="aaa"
                          color={`rgb(199 196 51)`}
                          className="text-[1.8vw] hover:-translate-y-3 duration-150 ease-in bg-background rounded-full"
                        />
                        <Emote
                          name="aab"
                          color={`rgb(33 101 219`}
                          className="text-[1.8vw]  hover:-translate-y-3 duration-150 ease-in bg-background rounded-full"
                        />
                        <Emote
                          name="aac"
                          color={`rgb(219 33 33)`}
                          className="text-[1.8vw]  hover:-translate-y-3 duration-150 ease-in bg-background rounded-full"
                        />
                        <Emote
                          name="aad"
                          color={`rgb(44 219 33))`}
                          className="text-[1.8vw]  hover:-translate-y-3 duration-150 ease-in bg-background rounded-full"
                        />
                        <Emote
                          name="aae"
                          color={`rgb(241 250 15)`}
                          className="text-[1.8vw] hover:-translate-y-3 duration-150 ease-in bg-background rounded-full"
                        />
                        <Emote
                          name="aaf"
                          color={`rgb(180 33 219)`}
                          className="text-[1.8vw]  hover:-translate-y-3 duration-150 ease-in bg-background rounded-full"
                        />
                      </div>
                      <div className="hover:text-primary flex gap-x-1 items-center duration-200 ease-in">
                        <Icon icon="addReaction" className="text-[1.2rem]  " />
                        <p className="text-xs">{data.comments}</p>
                      </div>
                    </button>
                    <button className="flex items-center gap-x-1 hover:text-primary text-front duration-150 ease-in">
                      <Icon icon="chatBubble" className="text-[1.2rem]" />
                      <p className="text-xs">{data.comments}</p>
                    </button>
                  </div>
                  <button className="flex items-center gap-x-1 hover:text-primary text-front duration-150 ease-in hover:border-primary border px-2 py-1 rounded-full border-front">
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
