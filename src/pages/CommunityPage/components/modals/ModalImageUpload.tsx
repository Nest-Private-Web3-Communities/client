import React, { useState } from "react";
import Icon from "../../../../common/Icon";
import useModal from "../../../../hooks/useModal";
import { twMerge } from "tailwind-merge";

export default function ModalImageUpload(props: {
  callback: (img: string) => void;
}) {
  const modal = useModal();

  const [url, setUrl] = useState("");
  const [valid, setValid] = useState(false);

  return (
    <div className="relative bg-black p-6 w-[40vw] rounded-lg flex flex-col items-center border border-white/25 gap-y-6">
      <button
        type="button"
        className="absolute top-2 right-2 text-red-500 text-2xl "
        onClick={modal.hide}
      >
        <Icon icon="close" />
      </button>
      <img
        src={url || "/"}
        alt="preview"
        className="aspect-square object-contain w-1/2"
        onError={() => setValid(false)}
        onLoad={() => setValid(true)}
      />

      <input
        type="url"
        placeholder="Enter Image link"
        className="w-[70%] bg-black focus:outline-none border px-2 py-1 rounded-lg"
        onChange={(e) => {
          setValid(false);
          setUrl(e.target.value);
        }}
      />
      <button
        type="button"
        className={twMerge(
          "bg-green-800 p-2 rounded-lg font-semibold",
          !valid && "bg-red-800 cursor-not-allowed font-light opacity-50"
        )}
        onClick={() => {
          props.callback(url);
          modal.hide();
        }}
      >
        {valid ? "Submit" : "Invalid Image Url"}
      </button>
    </div>
  );
}
