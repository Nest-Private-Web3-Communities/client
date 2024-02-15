import React, { useRef, useState } from "react";
import Emote, { EmoteType, emoteDeclarations } from "../../../common/Emote";
import Icon from "../../../common/Icon";
import useModal from "../../../hooks/useModal";
import { getTypedKeys } from "../../../utils";
import { TwitterPicker } from "react-color";
import useClickOutside from "../../../hooks/useClickOutside";

export default function CommunityEmotesSelector() {
  const [emotes, setEmotes] = useState<Array<Emote>>([]);

  const modal = useModal();

  const remainingEmotes = getTypedKeys(emoteDeclarations).filter(
    (str) => !emotes.some((obj) => obj.name === str)
  );

  const [showingColorPickerFor, setShowingColorPickerFor] = useState(-1);

  const state = { value: emotes, setter: setEmotes };

  const outclickRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useClickOutside(outclickRef, () => setShowingColorPickerFor(-1));

  return (
    <div ref={outclickRef} className="flex gap-x-5 my-5">
      {emotes.map((emote, key) => (
        <div className="relative">
          <button
            type="button"
            className="absolute top-0 right-0 bg-red-500 translate-x-1/2 -translate-y-1/2 p-1 rounded-full text-lg text-black"
            onClick={() => setEmotes((p) => [...p].filter((_, i) => i != key))}
          >
            <Icon icon="delete" />
          </button>
          <div
            key={key}
            role="button"
            className="flex flex-col gap-y-2 border p-2 rounded-lg items-center cursor-pointer w-max"
            onClick={() => {
              setShowingColorPickerFor(key);
            }}
          >
            <Emote
              name={emote.name}
              color={`rgb(${emote.color})`}
              className="text-[4vw]"
            />
            <p className="flex gap-x-1 -translate-x-1 items-center">
              <Icon icon="edit" />
              <span className="text-xs">Color</span>
            </p>
          </div>
          {showingColorPickerFor == key && (
            <div className="absolute top-full">
              <TwitterPicker
                onChange={(color) => {
                  setEmotes((p) =>
                    p.map((emote, i) =>
                      i == showingColorPickerFor
                        ? {
                            name: emote.name,
                            color: `${color.rgb.r} ${color.rgb.g} ${color.rgb.b}`,
                          }
                        : emote
                    )
                  );
                }}
              />
            </div>
          )}
        </div>
      ))}

      {emotes.length < 6 && (
        <button
          type="button"
          className="text-[3vw]"
          onClick={() =>
            modal.show(
              <ModalNewEmote state={state} remainingEmotes={remainingEmotes} />
            )
          }
        >
          <Icon icon="add" />
        </button>
      )}
    </div>
  );
}

function ModalNewEmote(props: {
  remainingEmotes: EmoteType[];
  state: {
    value: Emote[];
    setter: React.Dispatch<React.SetStateAction<Emote[]>>;
  };
}) {
  const modal = useModal();

  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue(`--color-primary`);

  return (
    <div className="flex flex-col items-center gap-y-5 bg-background p-6 rounded-md w-[30vw] border border-front border-opacity-20">
      <div className="flex flex-wrap gap-3">
        {props.remainingEmotes.map((e, key) => (
          <button
            type="button"
            key={key}
            onClick={() => {
              props.state.setter((p) => [
                ...p,
                { name: e, color: primaryColor },
              ]);
              modal.hide();
            }}
            className="border border-front p-1 rounded-lg border-opacity-20 duration-200 bg-foreground hover:bg-primary hover:bg-opacity-20"
          >
            <Emote className="text-4xl" name={e} />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={modal.hide}
        className="bg-red-500 text-black px-8 py-2 rounded font-medium w-max"
      >
        Cancel
      </button>
    </div>
  );
}

interface Emote {
  name: EmoteType;
  color: string;
}
