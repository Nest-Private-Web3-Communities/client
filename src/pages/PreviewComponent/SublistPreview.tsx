import React, { useRef } from "react";
import Icon from "../../common/Icon";
import useIdleScrollbar from "../../hooks/useIdleScrollbar";
import ThemeButton from "../../common/ThemeButton";
import useModal from "../../hooks/useModal";

const dummy = [
  {
    name: "Decentralize Devs",
    members: 30,
    active: 10,
    icon: "https://hbr.org/resources/images/article_assets/2022/04/01-BI_WEB3_STACKPOLE_HERO.jpg",
  },
  {
    name: "Crypto Crew",
    members: 70,
    active: 27,
    icon: "https://knowledge.wharton.upenn.edu/wp-content/uploads/2022/10/10.19.22-hosanagar-web3-GettyImages-1384870944.jpg",
  },
  {
    name: "Web3 Wizards",
    members: 50,
    active: 23,
    icon: "https://www.xrtoday.com/wp-content/uploads/2022/10/What_Web3_Going_2023.jpg",
  },
  {
    name: "DigiAssets Alliance",
    members: 30,
    active: 12,
    icon: "https://www.gettingsmart.com/wp-content/uploads/2022/08/c0e334cb-b270-4be4-a8a2-59f14426370b_Group20562-1024x456.png",
  },
  {
    name: "Distributed Developers",
    members: 200,
    active: 42,
    icon: "https://digiday.com/wp-content/uploads/sites/3/2022/01/Future-1030x600-1.png",
  },
];

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

export default function SublistPreview() {
  const subgroupContainerRef =
    useRef() as React.MutableRefObject<HTMLDivElement>;
  const membersContainerRef =
    useRef() as React.MutableRefObject<HTMLDivElement>;
  useIdleScrollbar(subgroupContainerRef);
  useIdleScrollbar(membersContainerRef);

  return (
    <div className="text-front py-2 flex flex-col h-screen border-l border-front border-opacity-25 w-[20vw] bg-background">
      <div className="px-4 flex gap-x-3 justify-end">
        <ThemeButton className="text-2xl p-1 aspect-square bg-foreground rounded-full flex justify-center w-max items-center border border-front border-opacity-40" />
        <button>
          <Icon icon="manageAccounts" className="text-[1.8em]" />
        </button>
      </div>
      <h1 className="text-xl font-bold px-4 border-b border-front border-opacity-25 pb-1 pt-2">
        Sub Groups
      </h1>
      <div
        ref={subgroupContainerRef}
        className="flex flex-col gap-y-3 basis-1/2 overflow-y-scroll scrollbar-primary mt-2 px-2 py-2 rounded-lg border border-opacity-25 border-front mx-4 bg-secondary"
      >
        {dummy.map((data, i) => (
          <div
            key={i}
            className=" bg-foreground bg-opacity-60 hover:bg-opacity-100 duration-200 ease-in px-3 border-front border border-opacity-20 py-4 rounded-lg flex items-center min-w-[15vw] justify-between"
          >
            <div className="flex gap-x-2">
              <img
                src={data.icon}
                className="rounded-full bg-front text-background text-center w-[3vw] aspect-square object-cover"
              />
              <div className="flex flex-col">
                <h2 className="font-semibold whitespace-nowrap truncate w-[75%]">
                  {data.name}
                </h2>
                <h3 className="text-sm text-opacity-50 text-front">
                  Active:{" "}
                  <span className="text-green text-xs">
                    {data.active} members
                  </span>
                </h3>
              </div>
            </div>
            <button className="bg-background rounded-full px-2 aspect-square border-front border-opacity-20 border text-primary text-opacity-100 duration-200 ease-in">
              <Icon icon="forum" className="text-[1.2rem]" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-lg font-bold px-4 border-b border-front border-opacity-25 pb-1">
        Community Members
      </div>
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
    </div>
  );
}
