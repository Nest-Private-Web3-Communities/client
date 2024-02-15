import ThemeButton from "./ThemeButton";
import { Link } from "react-router-dom";
import {
  ConnectButton,
  useParticleTheme,
} from "@particle-network/connect-react-ui";
import "@particle-network/connect-react-ui/dist/index.css";
import useTheme from "../hooks/useTheme";
import { useEffect } from "react";

export default function Navbar() {
  const theme = useTheme();
  const particleTheme = useParticleTheme();

  useEffect(() => {
    if (particleTheme.setTheme && theme.current)
      particleTheme.setTheme(theme.current);
  }, [theme.current]);

  return (
    <nav className="flex p-page fixed w-full z-[999] py-3 border-b border-front border-opacity-20 bg-background">
      <div className="flex gap-x-1 items-center">
        <img src="/logo.png" className="h-[2.3em]" />
        <h1 className="text-2xl font-medium text-primary tracking-tighter">
          NEST
        </h1>
      </div>

      <ul className="flex items-center gap-x-8 text-sm ml-12">
        {navLinks.map((item, key) => (
          <li key={key}>
            <Link to={item.to}>{item.title}</Link>
          </li>
        ))}
      </ul>

      <div className="flex-1 flex items-center gap-x-5">
        <figure className="flex-1" role="separator" />
        <ConnectButton />
        <ThemeButton className="text-2xl p-2 aspect-square bg-foreground rounded-full flex justify-center items-center border border-front border-opacity-40" />
      </div>
    </nav>
  );
}

const navLinks = [
  { title: "Communities", to: "/communities" },
  { title: "About", to: "/about" },
  { title: "FAQs", to: "/faq" },
  { title: "Community", to: "/community" },
];
