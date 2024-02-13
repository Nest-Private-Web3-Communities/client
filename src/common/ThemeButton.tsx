import React from "react";
import useTheme from "../hooks/useTheme";
import Icon from "./Icon";

interface ThemeButtonProps {
  className?: string;
}

export default function ThemeButton(props: ThemeButtonProps) {
  const theme = useTheme();

  function toggleTheme() {
    if (theme.current == "dark") theme.set("light");
    if (theme.current == "light") theme.set("dark");
  }

  return (
    <button onClick={toggleTheme}>
      <Icon icon="dark_mode" />
    </button>
  );
}
