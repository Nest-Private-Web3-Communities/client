import React, { FormEvent, useState } from "react";
import useWeb3 from "../../contexts/web3context";
import useEncryptionContext from "../../contexts/encryptionContext";
import { useNavigate } from "react-router-dom";
import { keyBase } from "../../config";

export default function NewAccountPage() {
  const inputStyle: React.CSSProperties = {
    padding: "14px 16px",
    fontSize: "17px",
    borderRadius: "6px",
  };

  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const web3 = useWeb3();
  const encryption = useEncryptionContext();

  function createAccountHandler(event: React.FormEvent) {
    event.preventDefault();
    const key = encryption.keyPub.toString(keyBase);

    setLoading(true);

    web3.contracts.nest.write
      .createAccount([key, name, image])
      .then((res) =>
        web3.client
          ?.waitForTransactionReceipt({ hash: res })
          .then((_) => navigate("/"))
      )
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <section className="flex items-center h-screen px-[13vw] select-none relative">
        <div className="absolute-cover opacity-60 blur-2xl -z-1">
          <video
            src="/videos/faq-gradient.mp4"
            autoPlay
            loop
            muted
            className="absolute-cover object-cover blur-3xl"
          />
          <article className="bg-primary absolute-cover mix-blend-hue" />
        </div>
        <div className="flex-1 flex flex-col justify-center pr-[10vw]">
          <div className="flex items-center text-[4vw] gap-x-2">
            <img src="/logo.png" className="h-[1em]" draggable={false} />
            <h1 className="text-primary font-semibold">NEST</h1>
          </div>
          <p className="text-3xl mt-3">
            This is how you will appear throughout all communities on Nest.
          </p>
        </div>

        <div className="basis-[33%]">
          <form
            onSubmit={createAccountHandler}
            className="bg-background p-5 rounded-xl flex flex-col gap-y-3 shadow-[-4px_8px_1rem] shadow-front/20 border border-front border-opacity-10 w-full"
          >
            <img
              src={image}
              onError={(e) => {
                e.currentTarget.src =
                  "https://pics.craiyon.com/2023-11-11/9jWcbVArTPGpAod1GkLSlg.webp";
                setImage(e.currentTarget.src);
              }}
              draggable={false}
              className="rounded-full mb-3 w-1/2 self-center border border-front border-opacity-30 aspect-square object-cover"
            />
            <input
              name="name"
              style={inputStyle}
              placeholder="Enter your Name"
              className="border border-front/20 bg-background"
              type="text"
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <input
              name="image"
              style={inputStyle}
              placeholder="Enter Image Url"
              className="border border-front/20 bg-background"
              type="url"
              onChange={(e) => setImage(e.target.value)}
              disabled={loading}
            />
            <input
              type="submit"
              value="Proceed"
              role="button"
              disabled={loading}
              className="text-xl font-bold text-back bg-primary p-4 rounded-md mt-1 cursor-pointer disabled:opacity-50 disabled:animate-pulse"
            />
          </form>
        </div>
      </section>
    </>
  );
}
