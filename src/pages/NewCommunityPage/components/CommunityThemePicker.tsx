import React, { useRef, useState } from "react";
import { TwitterPicker } from "react-color";
import useClickOutside from "../../../hooks/useClickOutside";

export default function CommunityThemePicker() {
  function getThemeColor(theme: string) {
    return `rgb(var(--color-${theme}))`;
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
      <div className="basis-1/2 flex flex-col gap-y-10">
        <ColorPicker state={state} name="primary" title="Primary color" />
        <ColorPicker state={state} name="secondary" title="Secondary color" />
        <ColorPicker state={state} name="background" title="Background color" />
        <ColorPicker state={state} name="foreground" title="Foreground color" />
        <ColorPicker state={state} name="front" title="Front text color" />
        <ColorPicker state={state} name="back" title="Back text color" />
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
    <div className="flex flex-col gap-y-4 w-max" ref={pickerRef}>
      <button
        onClick={() => setShowPicker((d) => !d)}
        type="button"
        className="flex gap-x-2 px-2"
      >
        <figure
          className="h-full aspect-square outline-offset-2 outline outline-1 outline-white rounded-full"
          style={{
            background: currentColor,
            // outlineColor: currentColor,
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
