import React, { useRef, useState } from "react";
import { TwitterPicker } from "react-color";
import useClickOutside from "../../../hooks/useClickOutside";
import CommunityPage from "../../CommunityPage/CommunityPage";

export default function CommunityThemePicker() {
  function getThemeColor(theme: string) {
    return `rgb(var(--color-${theme}))`;
  }

  function getTwString(hex: string) {
    hex = hex.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r} ${g} ${b}`;
  }

  const [theme, setTheme] = useState<Record<string, string>>({
    primary: getThemeColor("primary"),
    secondary: getThemeColor("secondary"),
    background: getThemeColor("background"),
    foreground: getThemeColor("foreground"),
    front: getThemeColor("front"),
    back: getThemeColor("back"),
  });

  const state = { value: theme, setter: setTheme };

  return (
    <div className="flex">
      <div className="flex flex-col basis-1/3 gap-y-10">
        <ColorPicker state={state} name="primary" title="Primary color" />
        <ColorPicker state={state} name="secondary" title="Secondary color" />
        <ColorPicker state={state} name="background" title="Background color" />
        <ColorPicker state={state} name="foreground" title="Foreground color" />
        <ColorPicker state={state} name="front" title="Front text color" />
        <ColorPicker state={state} name="back" title="Back text color" />
      </div>

      <div className="flex flex-1 relative">
        <div
          className="w-[30vw] h-[25vw] flex-1 overflow-hidden"
          style={
            {
              "--color-primary": getTwString(theme.primary),
              "--color-secondary": getTwString(theme.secondary),
              "--color-background": getTwString(theme.background),
              "--color-foreground": getTwString(theme.foreground),
              "--color-front": getTwString(theme.front),
              "--color-back": getTwString(theme.back),
            } as React.CSSProperties
          }
        >
          <CommunityPage />
        </div>
      </div>
    </div>
  );
}

function ColorPicker(props: {
  title: string;
  name: string;
  state: {
    value: Record<string, string>;
    setter: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  };
}) {
  const currentColor = props.state.value[props.name];

  const [showPicker, setShowPicker] = useState(false);

  const pickerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  useClickOutside(pickerRef, () => {
    if (showPicker) setShowPicker(false);
  });

  return (
    <div className="flex flex-col gap-y-4" ref={pickerRef}>
      <button
        onClick={() => setShowPicker((d) => !d)}
        type="button"
        className="flex gap-x-2 px-2"
      >
        <figure
          className="h-full aspect-square outline-offset-2 outline outline-1 outline-front rounded-full"
          style={{
            background: currentColor,
          }}
        />
        <p
          //  style={{ color: currentColor }}
          className="whitespace-nowrap font-extralight"
        >
          {props.title}
        </p>
      </button>

      {showPicker && (
        <TwitterPicker
          color={currentColor}
          onChangeComplete={(color) => {
            props.state.setter((t) => ({ ...t, [props.name]: color.hex }));
          }}
        />
      )}
    </div>
  );
}
