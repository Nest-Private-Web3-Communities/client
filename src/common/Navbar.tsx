import { ConnectButton } from "@particle-network/connectkit";
import "@particle-network/connectkit/dist/index.css";
import ThemeButton from "./ThemeButton";

export default function Navbar() {
  return (
    <nav className="flex p-page fixed w-full z-10 py-3 border-b border-front border-opacity-20 bg-background">
      <div className="flex gap-x-3 items-center">
        <img src="/logo.png" className="h-[2.3em]" />
        <h1 className="">lazy</h1>
      </div>
      <div className="flex-1" role="separator" />
      <div className=""></div>
      <div className="flex items-center gap-x-3">
        <ConnectButton />
        <ThemeButton className="text-2xl p-2 aspect-square bg-foreground rounded-full flex justify-center items-center border border-front border-opacity-40" />
      </div>
    </nav>
  );
}
