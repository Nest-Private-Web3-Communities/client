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
    <div className="relative bg-background p-6 w-[40vw] rounded-lg flex flex-col items-center border border-front/25 gap-y-6">
      <button
        className="absolute top-2 right-2 text-red-500 text-2xl "
        onClick={modal.hide}
      >
        <Icon icon="close" />
      </button>

      <h1 className="font-light text-2xl px-[3vw]">
        Share this post with others
      </h1>
      <div className="gap-x-4">
        {directs.map((direct, i) => (
          <button key={i} className="">
            <img src={direct.image} alt={direct.name} />
            <p>Copy Link</p>
          </button>
        ))}
      </div>
    </div>
  );
}
