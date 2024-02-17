import { twMerge } from "tailwind-merge";
import DataForm from "../../common/DataForm";
import PageSeparator from "../../common/PageSeparator";
import useWeb3 from "../../contexts/web3context";
import CommunityThemePicker from "./components/CommunityThemePicker";
import CommunityEmotesSelector from "./components/CommunityEmotesSelector";
import { useState } from "react";
import community from "../../contracts/community";
import { useCurrentChain } from "@particle-network/connect-react-ui/dist/hooks";
import nest from "../../contracts/nest";
import { avalancheFuji } from "viem/chains";

export default function NewCommunityPage() {
  const web3 = useWeb3();

  const [themeString, setThemeString] = useState("");
  const [emoteString, setEmoteString] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle =
    "bg-background border border-front border-opacity-30 outline-none p-2 rounded-md";

  function createCommunityHandler(data: Record<string, string>) {
    const args = [
      nest.address,
      data.name,
      data.description,
      data.img,
      themeString,
      emoteString,
    ] as const;

    setLoading(true);

    web3.client?.deployContract({
      abi: community.abi,
      bytecode: `0x${community.bytecode}`,
      args,
    });

    // web3.contracts.nest.write
    //   .newCommunity(args)
    //   .then(() => navigate("/communities"))
    //   .catch((err) => console.error(err))
    //   .finally(() => setLoading(false));
  }

  return (
    <>
      <header className="pt-24 p-page flex flex-col gap-y-2">
        <h1 className="font-medium text-xl">Create New Community</h1>
        <p className="font-light leading-tight text-front text-opacity-70">
          We hope you create a thriving community on nest! <br />
          You can make a nest community which represents a real life community
        </p>
      </header>

      <PageSeparator />

      <DataForm.Container
        className="p-page flex flex-col gap-y-5"
        onSubmit={createCommunityHandler}
      >
        <div className="flex gap-x-5">
          <DataForm.Input
            name="name"
            placeholder="Community Name"
            className={twMerge(inputStyle, "basis-1/2")}
          />
          <DataForm.Input
            name="img"
            placeholder="ImageUrl"
            className={twMerge(inputStyle, "basis-1/2")}
          />
        </div>

        <DataForm.Textarea
          name="description"
          placeholder="Enter a description for your community, be creative..."
          rows={5}
          className={twMerge(inputStyle, "resize-none")}
        />

        <div className="flex flex-col gap-y-6 mt-5">
          <div className="px-0">
            <h1 className="text-xl font-medium">
              Create a color theme for your community
            </h1>
            <p className="text-sm font-extralight text-front text-opacity-75">
              Let your creativity come out. Your community page is your own.
              Represent your community with colors
            </p>
          </div>

          <CommunityThemePicker setter={setThemeString} />
        </div>

        <div className="mt-10">
          <div className="px-0">
            <h1 className="text-xl font-medium">Reactions</h1>
            <p className="text-sm font-extralight text-front text-opacity-75">
              These are how people can react to each other's posts in your
              community. Don't pick any if you would like to disable reactions.
            </p>
            <p className="text-red-500 text-xs font-light">
              Note : You can not change these later
            </p>
          </div>

          <CommunityEmotesSelector setter={setEmoteString} />
        </div>

        <DataForm.Input
          type="submit"
          value="Confirm"
          className="cursor-pointer w-max px-10 py-2 rounded-md bg-primary my-6 text-back disabled:opacity-70 disabled:cursor-not-allowed disabled:animate-pulse"
          disabled={loading}
        />
      </DataForm.Container>
    </>
  );
}
