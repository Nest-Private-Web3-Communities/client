import React from "react";
import { twMerge } from "tailwind-merge";
import { IconType } from "../../../common/Icon";
import useModal from "../../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import ModalJoin from "./ModalJoin";

export default function Header() {
  const modal = useModal();
  const navigate = useNavigate();

  return (
    <header className="pt-32 flex p-page">
      <div className="bg-primary basis-2/3 rounded-2xl relative flex">
        <img
          src="/images/person.png"
          alt="person"
          className="h-[115%] left-6 absolute bottom-0"
        />

        <figure className="w-1/4" role="separator" />

        <div className="flex flex-col py-5 gap-y-4 w-3/4 pr-10 text-back">
          <h1 className="text-xl font-medium">Your Communities on Nest</h1>
          <p className="font-light text-sm">
            Communities are your gateway to Nest! Create a community or join one
            to start interacting with people on nest. Communities represent
            meaningful groups of people and you may add people as per your
            accord. Your content on each community is encrypted and is private
            and secure.
          </p>

          <button
            className="bg-background text-front w-max px-6 py-2 rounded"
            onClick={() =>
              window.open(
                "https://www.youtube.com/watch?v=WqT1THswinI",
                "_blank"
              )
            }
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-y-8">
        <CustomHeaderButton
          title="Create Community"
          className="bg-primary text-back w-1/2"
          onClick={() => navigate("/communities/new")}
        />
        <CustomHeaderButton
          title="Join Community"
          className="bg-primary text-back w-1/2"
          onClick={() => modal.show(<ModalJoin />)}
        />
      </div>
    </header>
  );
}

function CustomHeaderButton(props: {
  title: string;
  className?: string;
  icon?: IconType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className={twMerge(
        "py-3 rounded-lg duration-300 hover:scale-105 hover:shadow-sm hover:shadow-front/50",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}
