import useModal from "../../../../hooks/useModal";
import Icon from "../../../../common/Icon";
import useCommunity from "../../CommunityContext";
import Emote, { EmoteType } from "../../../../common/Emote";
import CopyWrapper from "../../../../common/CopyWrapper";

export default function ModalCommunityInfo() {
  const { data } = useCommunity();
  const modal = useModal();
  const emotes = data.reactions;

  return (
    <div className="relative bg-background p-6 w-[40vw] rounded-lg flex flex-col items-center border border-front/25 gap-y-6">
      <button
        className="absolute top-2 right-2 text-red-500 text-2xl "
        onClick={modal.hide}
      >
        <Icon icon="close" />
      </button>
      <div className="flex flex-col gap-y-6 w-full text-white">
        <div className="flex gap-x-4 items-start">
          <img
            src={data.imageUrl}
            className="w-[5vw] aspect-square rounded-full object-cover"
          />
          <div className="flex flex-col gap-y-1 w-full">
            <div className="flex gap-x-4 items-end">
              <h1 className="text-xl self-start">{data.name}</h1>
              <CopyWrapper className="w-[40%] self-start">
                <p className="truncate text-xs rounded-3xl border py-1 px-3 hover:bg-white/10 duration-200 ease-in">
                  {data.address}
                </p>
              </CopyWrapper>
            </div>
            <p className="text-sm text-white/80">{data.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <div>Community Theme</div>
          <div className="flex gap-x-2">
            <div className="bg-primary w-[2vw] aspect-square rounded-full  border-white border" />
            <div className="bg-secondary w-[2vw] aspect-square rounded-full  border-white border" />
            <div className="bg-background w-[2vw] aspect-square rounded-full border-white border" />
            <div className="bg-foreground w-[2vw] aspect-square rounded-full  border-white border" />
            <div className="bg-front w-[2vw] aspect-square rounded-full  border-white border" />
            <div className="bg-back w-[2vw] aspect-square rounded-full  border-white border" />
          </div>
        </div>
        {emotes?.length != 0 && (
          <div className="flex flex-col gap-y-1">
            <div>Community Emotes</div>
            <div className="bg-background p-1 flex items-center gap-x-1 rounded-md border border-front border-opacity-30 w-max">
              {emotes &&
                emotes.map((emote, key) => (
                  <button key={key} className="group/emote">
                    <Emote
                      name={emote.name as EmoteType}
                      color={`rgb(${emote.color})`}
                      className="text-[1.8vw]"
                    />
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
