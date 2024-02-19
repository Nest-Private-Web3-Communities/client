import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Theme } from "../hooks/useTheme";
import { AbiReadResponseType } from "./web3context";

interface GlobalContextType {
  modalState: {
    modal: ReactNode;
    setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  };
  themeState: {
    theme: Theme | undefined;
    setTheme: React.Dispatch<React.SetStateAction<Theme | undefined>>;
  };
  userState: {
    user: AbiReadResponseType<"nest", "users"> | undefined;
    setUser: React.Dispatch<
      React.SetStateAction<AbiReadResponseType<"nest", "users"> | undefined>
    >;
  };
  refreshState: {
    seeds: Record<string, number>;
    setSeeds: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  };
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>();
  const [modal, setModal] = useState<ReactNode | null>();
  const [user, setUser] = useState<AbiReadResponseType<"nest", "users">>();
  const [refreshSeeds, setRefreshSeeds] = useState<Record<string, number>>({});

  useEffect(() => {
    const storedTheme = localStorage.getItem("nest-theme");
    if (storedTheme == "dark" || storedTheme == "light") {
      setTheme(storedTheme);
    } else {
      const darkColorPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      setTheme(darkColorPreference.matches ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("nest-theme", theme);
    }
  }, [theme]);

  const value: GlobalContextType = {
    modalState: { modal, setModal },
    themeState: { theme, setTheme },
    userState: { user, setUser },
    refreshState: { seeds: refreshSeeds, setSeeds: setRefreshSeeds },
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(GlobalContext);
}
