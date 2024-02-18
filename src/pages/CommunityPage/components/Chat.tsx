import React, { useRef } from "react";
import Icon from "../../../common/Icon";
import { twMerge } from "tailwind-merge";
import useIdleScrollbar from "../../../hooks/useIdleScrollbar";

const messages = [
  { timestamp: "09:00", sender: "A", message: "Hey, how's it going?" },
  {
    timestamp: "09:05",
    sender: "B",
    message: "Not bad, just catching up on some work. You?",
  },
  {
    timestamp: "09:10",
    sender: "A",
    message: "Same here, trying to stay productive. Any plans for the weekend?",
  },
  {
    timestamp: "09:15",
    sender: "B",
    message:
      "Not really, just going to relax and maybe watch some movies. You?",
  },
  {
    timestamp: "09:20",
    sender: "A",
    message:
      "Thinking of going for a hike if the weather's good. Need some fresh air!",
  },
  {
    timestamp: "09:25",
    sender: "B",
    message: "That sounds nice, wish I could join. Maybe next time!",
  },
  {
    timestamp: "09:30",
    sender: "A",
    message: "Definitely! We should plan something soon.",
  },
  {
    timestamp: "09:35",
    sender: "B",
    message: "Absolutely, looking forward to it.",
  },
  {
    timestamp: "09:40",
    sender: "A",
    message:
      "By the way, did you hear about the new restaurant that opened downtown?",
  },
  {
    timestamp: "09:45",
    sender: "B",
    message: "Yeah, I saw some posts about it. Heard the food is amazing.",
  },
  {
    timestamp: "09:50",
    sender: "A",
    message: "We should check it out sometime. How about next Friday?",
  },
  {
    timestamp: "09:55",
    sender: "B",
    message: "Sounds like a plan! Count me in.",
  },
  {
    timestamp: "10:00",
    sender: "A",
    message: "Great, I'll make a reservation. Can't wait to try their menu.",
  },
  {
    timestamp: "10:05",
    sender: "B",
    message: "Me too! It's been a while since we tried a new place.",
  },
  {
    timestamp: "10:10",
    sender: "A",
    message: "Well, it's settled then. Friday it is!",
  },
  {
    timestamp: "10:15",
    sender: "B",
    message: "Looking forward to it. Catch you later!",
  },
  {
    timestamp: "10:20",
    sender: "A",
    message: "Take care! See you soon.",
  },
];

export default function Chat() {
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  useIdleScrollbar(containerRef);

  return (
    <div className="text-front flex-1 flex flex-col bg-foreground border-r border-front border-opacity-25 w-[35vw] relative">
      <div className="w-full h-full absolute backdrop-blur-sm opacity-90" />
      <div className="absolute top-80 left-20">
        <div className="flex flex-col items-center gap-y-2 w-[15vw] relative z-30">
          <div
            className="z-20 absolute-cover scale-90 bg-primary blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="z-10 absolute-cover scale-90 bg-secondary animate-pulse blur-3xl" />
          <div className="text-front text-lg font-black text-center z-30 bg-background rounded-2xl shadow-lg border border-front border-opacity-20 py-4 px-6">
            Chat feature coming soon!
          </div>
        </div>
      </div>
      <div className="text-xl w-full pl-4 pr-2 border-b bg-background border-front border-opacity-25 pb-1 items-center flex justify-between pt-4">
        <h1 className="tracking-wide font-semibold">Chat</h1>
        <button className="p-2 duration-200 ease-in hover:bg-background text-primary border border-front hover:border-opacity-25 border-opacity-0 rounded-full">
          <Icon icon="personAdd" className="text-[1.2rem] " />
        </button>
      </div>

      <div className="flex items-center justify-between pl-4 pr-2 py-2 bg-foreground">
        <div className="flex gap-x-2">
          <img
            src="https://randomuser.me/api/portraits/women/33.jpg"
            className="w-[3vw] rounded-full"
          />
          <div>
            <h1>Cassidy Williams</h1>
            <p className="text-sm text-front text-opacity-50 ">
              +3 New messages
            </p>
          </div>
        </div>
        <button className="hidden p-2 duration-200 ease-in hover:bg-background text-primary border border-front hover:border-opacity-25 border-opacity-0 rounded-full">
          <Icon icon="arrow_forward" className="rotate-180 text-[1.2rem]" />
        </button>
      </div>

      <div
        className="flex flex-col gap-y-3 overflow-y-scroll scrollbar-primary px-2 border-r border-r-foreground w-full"
        ref={containerRef}
      >
        {messages.map((data, i) => (
          <div
            className={twMerge(
              "max-w-[70%] py-2 px-4 rounded-t-3xl text-sm flex items-end",
              data.sender == "A"
                ? "self-end text-end bg-primary rounded-l-3xl flex-row-reverse"
                : "self-start text-start bg-secondary rounded-r-3xl text-back"
            )}
            key={i}
          >
            <span>{data.message}</span>
          </div>
        ))}
      </div>
      <div className="px-2 py-2 mt-2">
        <div className="flex gap-x-2 border px-2 py-2 rounded-3xl border-front border-opacity-25">
          <button className="p-1 rounded-full bg-background text-[1.2rem]">
            <Icon icon="add" />
          </button>
          <input
            className="w-full focus:outline-none bg-foreground"
            placeholder="Aa.."
          />
          <button className="  text-[1.2rem] text-primary px-1 duration-200 ease-in hover:bg-background border border-front hover:border-opacity-25 border-opacity-0 rounded-full ">
            <Icon icon="mood" />
          </button>
        </div>
      </div>
    </div>
  );
}
