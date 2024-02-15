import React from "react";
import SubgroupList from "./components/SubgroupList";
import Feed from "./components/Feed";
import Chat from "./components/Chat";

export default function CommunityPage() {
  return (
    <main className="bg-background px-[8vw] flex h-screen w-full">
      <SubgroupList />
      <Feed />
      <Chat />
    </main>
  );
}
