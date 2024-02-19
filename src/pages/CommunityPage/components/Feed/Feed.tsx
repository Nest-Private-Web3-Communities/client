import React, { useEffect, useRef, useState } from "react";
import Icon from "../../../../common/Icon";
import useIdleScrollbar from "../../../../hooks/useIdleScrollbar";
import Header from "./components/Header";
import useCommunity from "../../CommunityContext";
import FeedItem from "./components/FeedItem";
import NetworkDetails from "./components/NetworkDetails";
import { Mutable } from "../../../../types";

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
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);

  useEffect(() => {
    if (contract)
      contract.read
        .getPostsByNetwork([currentSelectedNetwork])
        .then((res) => setPosts(res as Mutable<typeof res>));

    const container = containerRef.current;
    if (container) {
      setIsScrollbarVisible(container.scrollHeight > container.clientHeight);
    }
  }, [contract, currentSelectedNetwork]);

  return (
    <div className="text-front flex flex-col h-screen border-x border-opacity-20 border-front w-[40vw] z-10 overflow-y-hidden bg-background">
      <Header />
      <NetworkDetails />

      <div
        className="overflow-y-scroll scrollbar-primary flex-1 flex flex-col"
        ref={containerRef}
      >
        {posts.map((post, key) => (
          <FeedItem postId={Number(post)} key={key} />
        ))}

        {isScrollbarVisible && (
          <div className="items-center w-full justify-center pt-6 pb-4 text-primary text-lg font-semibold tracking-wider flex flex-col">
            <button
              className="text-[2.5rem] animate-bounce"
              onClick={() => scrollBack()}
            >
              <Icon icon="keyboardDoubleArrowUp" />
            </button>
            <span className="">You have seen it all!</span>
          </div>
        )}
      </div>
    </div>
  );
}
