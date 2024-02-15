import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import useClickOutside from "../../../hooks/useClickOutside";
import CommunityPage from "../../CommunityPage/CommunityPage";

export default function CommunityThemePicker(props: {
  setter: React.Dispatch<React.SetStateAction<string>>;
}) {
  function getThemeColor(theme: string) {
    const col = getComputedStyle(document.documentElement).getPropertyValue(
      `--color-${theme}`
    );
    return col;
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

  useEffect(() => {
    const themeString = padNumbersInStringTo3(
      `${theme.primary} ${theme.secondary} ${theme.background} ${theme.foreground} ${theme.front} ${theme.back}`
    );

    props.setter(themeString);
  }, [theme]);

  return (
    <div className="flex">
      <div className="flex flex-col basis-1/3 pr-10 gap-y-10">
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
              "--color-primary": theme.primary,
              "--color-secondary": theme.secondary,
              "--color-background": theme.background,
              "--color-foreground": theme.foreground,
              "--color-front": theme.front,
              "--color-back": theme.back,
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
  const currentColor = `rgb(${props.state.value[props.name]})`;

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
        <p className="whitespace-nowrap font-extralight">{props.title}</p>
      </button>

      {showPicker && (
        <SketchPicker
          color={currentColor}
          disableAlpha
          onChange={(color) => {
            props.state.setter((t) => ({
              ...t,
              [props.name]: `${color.rgb.r} ${color.rgb.g} ${color.rgb.b}`,
            }));
          }}
        />
      )}
    </div>
  );
}

function padNumbersInStringTo3(input: string): string {
  const numbers = input.split(" ");

  const paddedNumbers = numbers.map((num) => {
    const numString = num.toString();
    const numLength = numString.length;
    const zerosToAdd = 3 - numLength;
    return "0".repeat(zerosToAdd) + numString;
  });

  const paddedString = paddedNumbers.join(" ");

  return paddedString;
}
