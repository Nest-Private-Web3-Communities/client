import React, { useEffect, useState } from "react";
import SubgroupList from "./components/SubgroupList";
import Feed from "./components/Feed";
import Chat from "./components/Chat";
import { useNavigate, useParams } from "react-router-dom";
import useWeb3, { AbiReadResponseType } from "../../contexts/web3context";
import Loader from "../../common/Loader";

export default function CommunityPage() {
  const [data, setData] = useState<AbiReadResponseType<"communities">>();
  const [emotes, setEmotes] =
    useState<AbiReadResponseType<"getCommunityReactionSet">>();
  const [loading, setLoading] = useState(true);

  const web3 = useWeb3();

  const params = useParams();

  const navigate = useNavigate();

  async function loadData() {
    if (!params.uuid) {
      return navigate("/");
    }
    await web3.contracts.nest.read
      .communities([params.uuid])
      .then((res) => setData(res));

    await web3.contracts.nest.read
      .getCommunityReactionSet([params.uuid])
      .then((res) => setEmotes(res));

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {!loading && data && emotes && (
        <main
          className="bg-background px-[8vw] flex h-screen w-full"
          style={
            {
              "--color-primary": data[3].primary,
              "--color-secondary": data[3].secondary,
              "--color-background": data[3].background,
              "--color-foreground": data[3].foreground,
              "--color-front": data[3].front,
              "--color-back": data[3].back,
            } as React.CSSProperties
          }
        >
          <SubgroupList />
          <Feed emotes={emotes} />
          <Chat />
        </main>
      )}

      {loading && (
        <main className="flex flex-col h-screen justify-center items-center">
          <Loader className="w-1/5" />
          <p className="mt-[10vh] text-primary font-medium">Powered by NEST</p>
        </main>
      )}
    </>
  );
}
