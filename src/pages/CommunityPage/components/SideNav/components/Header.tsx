import Icon from "../../../../../common/Icon";
import useModal from "../../../../../hooks/useModal";
import ModalInvite from "../../modals/ModalInvite";
import useCommunity from "../../../CommunityContext";
import ModalSettings from "../../modals/ModalSettings";
import ModalCommunityInfo from "../../modals/ModalCommunityInfo";
import CopyWrapper from "../../../../../common/CopyWrapper";

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
        <div className="flex flex-col">
          <h1 className="font-semibold text-base w-[8em] truncate">
            {data.name}
          </h1>
          <CopyWrapper className="flex">
            <div className="text-xs w-[8vw] truncate">{data.address}</div>
            <Icon icon="contentCopy" className="text-[1vw]" />
          </CopyWrapper>
        </div>
      </div>

      <div className="flex items-center gap-x-3 text-xl text-front">
        {data.userIsAdmin && (
          <button onClick={() => modal.show(<ModalInvite />)}>
            <Icon icon="personAdd" />
          </button>
        )}
        <button onClick={() => modal.show(<ModalCommunityInfo />)}>
          <Icon icon="eye" className="text-xl" />
        </button>
      </div>
    </header>
  );
}
