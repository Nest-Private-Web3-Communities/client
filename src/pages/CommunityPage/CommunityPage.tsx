import React from "react";
import SubgroupList from "./components/SubgroupList";
import Feed from "./components/Feed";
import Chat from "./components/chat";

export default function CommunityPage() {
  return (
    <div className="bg-background p-page flex w-full">
      <SubgroupList />
      <Feed />
      <Chat />
    </div>

  );
}
