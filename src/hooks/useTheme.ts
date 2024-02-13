import { useParticleTheme } from "@particle-network/connect-react-ui";
import useGlobalContext from "../contexts/globalContext";

export default function useTheme() {
  const { themeState } = useGlobalContext();
  const particle = useParticleTheme();

  function set(newTheme: Theme) {
    themeState.setTheme(newTheme);
    particle.setTheme && particle.setTheme(newTheme);
  }

  return { current: themeState.theme, set };
}

export type Theme = "light" | "dark";
