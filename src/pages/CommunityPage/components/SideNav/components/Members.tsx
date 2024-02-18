import React, { useRef } from "react";
import useIdleScrollbar from "../../../../../hooks/useIdleScrollbar";
import useModal from "../../../../../hooks/useModal";
import Icon from "../../../../../common/Icon";

const dummy2 = [
  {
    name: "Arial",
    image: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    name: "Alice",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },

  {
    name: "Ben Shapiro",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Luis",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Remo Singh",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: "Desuza",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Stepahno",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
];

export default function Members() {
  const membersContainerRef =
    useRef() as React.MutableRefObject<HTMLDivElement>;
  useIdleScrollbar(membersContainerRef);

  const modal = useModal();

  return (
    <section className="basis-1/2">
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
        className="mx-4 flex flex-col gap-y-4 bg-secondary p-4 rounded-lg border border-front border-opacity-20 basis-1/2 overflow-y-scroll scrollbar-primary"
      >
        {dummy2.map((member, i) => (
          <div
            key={i}
            className="flex justify-between border-b pb-2 border-front border-opacity-20 gap-x-4"
          >
            <div className="flex gap-x-2 justify-center items-center relative">
              <div className="relative">
                <img
                  src={member.image}
                  className="w-[3vw] aspect-square rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-semibold">{member.name}</h2>
                <div className="text-sm text-front text-opacity-50 w-[8vw] truncate">
                  1txWphwRPsAeQmoLPhFdIBV9Emhloxhb8l
                </div>
              </div>
            </div>
            <button className="hover:bg-background rounded-full px-3 py-1 aspect-square border-front border-opacity-0 hover:border-opacity-20 border text-primary text-opacity-100 duration-200 ease-in">
              <Icon icon="chat" className="text-[1.2rem] " />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
