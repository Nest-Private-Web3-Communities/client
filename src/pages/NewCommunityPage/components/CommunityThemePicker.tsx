import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import useClickOutside from "../../../hooks/useClickOutside";
import SubgroupList from "../../CommunityPage/components/SubgroupList";
import Chat from "../../CommunityPage/components/Chat";
import Feed from "../../CommunityPage/components/Feed";
import { twMerge } from "tailwind-merge";
import { padNumbersInStringTo3 } from "../../../utils";

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

  const components = [<SubgroupList />, <Feed />, <Chat />];

  const state = { value: theme, setter: setTheme };
  const [currComponent, setCurrComponent] = useState(1);

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

      <div className="flex flex-col flex-1 relative w-[30vw] h-[40vw] items-center gap-y-4">
        <div
          className="flex-1 overflow-hidden flex justify-center pointer-events-none cursor-not-allowed"
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
          {components[currComponent]}
        </div>
        <div className="flex gap-x-6 border-t border-front pt-4 w-full justify-center border-opacity-25">
          {components.map((_, i) => (
            <button
              className={twMerge(
                "rounded-full w-4 aspect-square bg-front bg-opacity-30 duration-300",
                i == currComponent ? "bg-opacity-80" : "scale-90"
              )}
              type="button"
              key={i}
              onClick={() => setCurrComponent(i)}
            />
          ))}
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
    <div className="flex flex-col gap-y-4 text-front" ref={pickerRef}>
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
          className="text-front"
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
