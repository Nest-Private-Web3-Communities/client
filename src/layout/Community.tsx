import { ConnectButton } from "@particle-network/connect-react-ui";
import { Outlet } from "react-router-dom";

export default function Community() {
  return (
    <main className="relative">
      <div className="absolute scale-0 pointer-events-none">
        <ConnectButton />
      </div>
      <Outlet />
    </main>
  );
}
