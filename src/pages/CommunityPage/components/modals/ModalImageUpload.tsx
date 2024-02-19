import Icon from "../../../../common/Icon";
import useModal from "../../../../hooks/useModal";

export default function ModalImageUpload() {
  const modal = useModal();
  return (
    <div className="relative bg-black p-6 w-[40vw] rounded-lg flex flex-col items-center border border-white/25 gap-y-6">
      <button
        className="absolute top-2 right-2 text-red-500 text-2xl "
        onClick={modal.hide}
      >
        <Icon icon="close" />
      </button>
      <input
        type="url"
        placeholder="Enter Image link"
        className="w-[70%] bg-black focus:outline-none border px-2 py-1 rounded-lg"
      />
      <button className="bg-green-800 p-2 rounded-lg font-semibold">
        Submit
      </button>
    </div>
  );
}
