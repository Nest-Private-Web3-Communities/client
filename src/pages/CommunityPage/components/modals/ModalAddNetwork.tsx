import useModal from "../../../../hooks/useModal";
import Icon from "../../../../common/Icon";
import useCommunity from "../../CommunityContext";
import { useState } from "react";

export default function ModalAddNetowrk() {
  const [image, setImage] = useState<string>(
    "https://www.tutorialspoint.com/basics_of_computer_science/images/computer_networking.jpg"
  );

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

      <div className="flex gap-x-2">
        <img
          src={image}
          onError={(e) => {
            e.currentTarget.src =
              "https://www.tutorialspoint.com/basics_of_computer_science/images/computer_networking.jpg";
            setImage(e.currentTarget.src);
          }}
          className="rounded-full bg-front text-background text-center w-[10vw] aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-4 w-full">
        <input
          className="text-front bg-background border-primary px-4 py-2 h-max border rounded-xl focus:outline-none w-full"
          placeholder="Image link for the network"
          type="url"
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          className="text-front bg-background border-primary px-4 py-2 h-max border rounded-xl focus:outline-none w-full"
          placeholder="Name of the network"
        />
        <textarea
          className="text-front bg-background border-primary px-4 py-2 h-max border rounded-xl focus:outline-none w-full"
          placeholder="Description for the network"
        />
      </div>
      <div className="flex justify-evenly w-full">
        <button className="bg-primary px-4 py-3 rounded-lg">Submit</button>
      </div>
    </div>
  );
}
