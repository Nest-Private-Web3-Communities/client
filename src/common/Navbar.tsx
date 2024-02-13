import { ConnectButton } from "@particle-network/connectkit";
import "@particle-network/connectkit/dist/index.css";
import ThemeButton from "./ThemeButton";

export default function Navbar() {
  return (
    <nav className="flex p-page fixed w-full z-10 py-4">
      <div className=""></div>
      <div className="flex-1" role="separator" />
      <div className=""></div>
      <div className="flex items-center gap-x-3">
        <ConnectButton />
        <ThemeButton className="text-2xl self-stretch aspect-square bg-foreground rounded-full " />
      </div>
    </nav>
  );
}
