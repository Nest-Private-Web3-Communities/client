import useModal from "../../../../hooks/useModal";
import Icon from "../../../../common/Icon";
import useCommunity from "../../CommunityContext";
import { useState } from "react";

export default function ModalAddNetowrk() {
  interface Network {
    name: string;
    description: string;
    imageUrl: string;
  }
  const [network, setNetwork] = useState<Network>({
    name: "New Network",
    description:
      "This is a dummy description for your network his is a dummy description for your network",
    imageUrl:
      "https://www.tutorialspoint.com/basics_of_computer_science/images/computer_networking.jpg",
  });

  function handleChange() {
    console.log("first");
  }
  const modal = useModal();
  return (
    <div className="relative bg-background p-6 w-[40vw] rounded-lg flex flex-col items-center border border-front/25 gap-y-6">
      <button
        className="absolute top-2 right-2 text-red-500 text-2xl "
        onClick={modal.hide}
      >
        <Icon icon="close" />
      </button>
      <h2 className="text-xl">Add a new network</h2>
      <div className=" bg-foreground bg-opacity-60 hover:bg-opacity-100 duration-200 ease-in px-3 border-front border border-opacity-20 py-4 rounded-lg flex items-center max-w-[30vw] justify-between">
        <div className="flex gap-x-2">
          <img
            src={network.imageUrl}
            className="rounded-full bg-front text-background text-center w-[4vw] aspect-square object-cover"
          />
          <div className="flex flex-col">
            <h2 className="font-semibold whitespace-nowrap truncate">
              {network.name}
            </h2>
            <h3 className="text-sm text-opacity-50 text-front">
              {network.description}
            </h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 w-full">
        <input
          className="text-front bg-background border-primary px-4 py-2 h-max border rounded-xl focus:outline-none w-full"
          placeholder="Name of the network"
        />
        <input
          className="text-front bg-background border-primary px-4 py-2 h-max border rounded-xl focus:outline-none w-full"
          placeholder="Description for the network"
        />
        <input
          className="text-front bg-background border-primary px-4 py-2 h-max border rounded-xl focus:outline-none w-full"
          placeholder="Image link for the network"
        />
      </div>
      <div className="flex justify-evenly w-full">
        <button
          className="bg-red-500 bg-opacity-80 rounded-lg px-4 py-3"
          onClick={() => handleChange()}
        >
          Preview
        </button>
        <button className="bg-primary px-4 py-3 rounded-lg">Submit</button>
      </div>
    </div>
  );
}
