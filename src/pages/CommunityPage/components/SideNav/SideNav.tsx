import React, { useRef } from "react";
import Header from "./components/Header";
import Members from "./components/Members";
import Networks from "./components/Networks";
import useCommunity from "../../CommunityContext";

export default function SideNav() {
  const community = useCommunity();
  const { data } = community;

  return (
    <div className="text-front py-2 flex flex-col h-screen border-l border-front border-opacity-25 w-[20vw] bg-background">
      <Header />

      <div className="flex-1">
        <Networks />
        <Members />
      </div>
    </div>
  );
}
