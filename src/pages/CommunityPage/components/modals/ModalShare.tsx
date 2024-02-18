import { twMerge } from "tailwind-merge";
import useModal from "../../../../hooks/useModal";
import Icon from "../../../../common/Icon";

const directs = [
  {
    image: "https://img.icons8.com/ios-glyphs/48/e11d48/send.png",
    name: "Direct Message",
    link: "",
  },
  {
    image: "https://img.icons8.com/sf-black-filled/48/FFFFFF/copy-link.png",
    name: "Copy Link",
    link: "",
  },
  {
    image: "https://img.icons8.com/color/48/whatsapp--v1.png",
    name: "Whatsapp",
    link: "",
  },
  {
    image: "https://img.icons8.com/fluency/48/mail--v1.png",
    name: "Mail",
    link: "",
  },
];

export default function ModalShare() {
  const modal = useModal();
  return (
    <div className="relative bg-black p-6 w-[40vw] rounded-lg flex flex-col items-center border border-front/25 gap-y-6">
      <button
        className="absolute top-2 right-2 text-red-500 text-2xl "
        onClick={modal.hide}
      >
        <Icon icon="close" />
      </button>

      <h1 className="font-light text-2xl px-[3vw]">
        Share this post with others
      </h1>
      <div className="flex gap-x-8 justify-center">
        {directs.map((direct, key) => (
          <button
            key={key}
            className={twMerge(
              "flex flex-col gap-y-1 items-center justify-evenly aspect-square p-2 rounded-full relative group",
              key == 0 && "cursor-not-allowed"
            )}
          >
            {key == 0 && (
              <span className="absolute-center leading-none text-sm z-10 bg-black text-red-500 opacity-0 duration-200 group-hover:opacity-100">
                Coming Soon
              </span>
            )}
            <img
              src={direct.image}
              alt={direct.name}
              className={twMerge("", key == 0 && "opacity-60")}
            />
            <div
              className={twMerge(
                "text-xs flex-1 flex flex-col justify-center",
                key == 0 && "opacity-60"
              )}
            >
              {direct.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
