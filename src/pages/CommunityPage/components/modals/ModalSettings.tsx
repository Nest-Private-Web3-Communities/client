import { twMerge } from "tailwind-merge";
import useModal from "../../../../hooks/useModal";
import Icon from "../../../../common/Icon";
import useCommunity from "../../CommunityContext";

export default function ModalSettings() {
  const { data } = useCommunity();
  const modal = useModal();

  return (
    <div className="relative bg-background p-6 w-[40vw] rounded-lg flex flex-col items-center border border-front/25 gap-y-6">
      <button
        className="absolute top-2 right-2 text-red-500 text-2xl "
        onClick={modal.hide}
      >
        <Icon icon="close" />
      </button>
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex gap-x-4 items-center">
          <img
            src={data.imageUrl}
            className="w-[5vw] aspect-square rounded-full object-cover"
          />
          <input
            value={data.imageUrl}
            className="text-front bg-background border-primary px-4 py-2 h-max border rounded-xl focus:outline-none w-full"
          />
          <Icon icon="edit" />
        </div>
        <div className="flex gap-x-4 items-center ">
          <div className="">Name</div>
          <input
            value={data.name}
            className="text-front bg-background border-primary px-4 py-2 border rounded-xl focus:outline-none w-full"
          />
          <Icon icon="edit" />
        </div>
        <div className="flex gap-x-4 items-center ">
          <div className="">Description</div>
          <input
            value={data.description}
            className="text-front bg-background border-primary px-4 py-2 border rounded-xl focus:outline-none w-full"
          />
          <Icon icon="edit" />
        </div>
        <div className="flex flex-col gap-y-2">
          <div>Theme</div>
          <div className="flex gap-x-2">
            <div className="bg-primary w-[2vw] aspect-square rounded-full" />
            <div className="bg-secondary w-[2vw] aspect-square rounded-full" />
            <div className="bg-background w-[2vw] aspect-square rounded-full border-white border" />
            <div className="bg-foreground w-[2vw] aspect-square rounded-full" />
            <div className="bg-front w-[2vw] aspect-square rounded-full" />
            <div className="bg-back w-[2vw] aspect-square rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
