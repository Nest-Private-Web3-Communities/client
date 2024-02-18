import React, { useEffect, useState } from "react";
import useWeb3 from "../../../../../contexts/web3context";
import Icon from "../../../../../common/Icon";
import useModal from "../../../../../hooks/useModal";
import ModalInvite from "../../modals/ModalInvite";
import useCommunity from "../../../CommunityContext";

export default function Header() {
  const { data } = useCommunity();

  const modal = useModal();

  return (
    <header className="flex items-center justify-between px-5 py-2">
      <div className="flex items-center gap-x-2">
        <img
          src={data.imageUrl}
          className="w-1/5 aspect-square object-cover rounded-full"
        />
        <h1 className="font-semibold text-lg w-1/3 truncate">{data.name}</h1>
      </div>

      {data.userIsAdmin && (
        <div className="flex items-center gap-x-3 text-xl">
          <button>
            <Icon icon="edit" />
          </button>

          <button onClick={() => modal.show(<ModalInvite />)}>
            <Icon icon="personAdd" />
          </button>
        </div>
      )}
    </header>
  );
}
