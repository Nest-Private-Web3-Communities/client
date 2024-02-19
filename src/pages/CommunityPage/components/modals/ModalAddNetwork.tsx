import useModal from "../../../../hooks/useModal";
import Icon from "../../../../common/Icon";
import useCommunity from "../../CommunityContext";
import { useState } from "react";
import { networkImagePlaceholder } from "../../../../config";
import useWeb3 from "../../../../contexts/web3context";
import { twMerge } from "tailwind-merge";

export default function ModalAddNetowrk() {
  const [image, setImage] = useState<string>(networkImagePlaceholder);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [loading, setLoading] = useState(false);

  const web3 = useWeb3();
  const { contract, reload } = useCommunity();

  const modal = useModal();

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    contract?.write
      .createNetwork([name, desc, image])
      .then((res) =>
        web3.client
          ?.waitForTransactionReceipt({ hash: res })
          .then(() => {
            modal.hide();
            reload();
          })
          .finally(() => {
            setLoading(false);
          })
      )
      .catch(() => setLoading(false));
  }

  return (
    <div className="relative bg-background p-6 w-[40vw] rounded-lg flex flex-col items-center border border-front/25 gap-y-6">
      <button
        className="absolute top-2 right-2 text-red-500 text-2xl disabled:opacity-0"
        onClick={modal.hide}
        disabled={loading}
      >
        <Icon icon="close" />
      </button>
      <h2 className="text-xl">Add a new network</h2>

      <div className="flex gap-x-2">
        <img
          src={image || networkImagePlaceholder}
          onError={(e) => {
            e.currentTarget.src = networkImagePlaceholder;
            setImage(e.currentTarget.src);
          }}
          className={twMerge(
            "rounded-full bg-front text-background text-center w-[10vw] aspect-square object-cover",
            loading && "animate-pulse"
          )}
        />
      </div>
      <form onSubmit={submitHandler} className="flex flex-col gap-y-4 w-full">
        <input
          className="text-front bg-background border-primary px-4 py-2 h-max border rounded-xl focus:outline-none w-full disabled:animate-pulse"
          placeholder="Image link for the network"
          type="url"
          required
          disabled={loading}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          className="text-front bg-background border-primary px-4 py-2 h-max border rounded-xl focus:outline-none w-full disabled:animate-pulse"
          placeholder="Name of the network"
          required
          disabled={loading}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="text-front text-sm placeholder:text-base bg-background border-primary px-4 py-2 h-max border rounded-xl focus:outline-none w-full resize-none scrollbar-primary disabled:animate-pulse"
          placeholder="Description for the network"
          required
          rows={3}
          disabled={loading}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary self-center px-6 py-3 rounded-lg disabled:hidden"
          disabled={loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
