import { ModalProvider } from "@particle-network/connect-react-ui";
import { RouterProvider } from "react-router-dom";
import particleConnectConfig from "./config/particle";
import router from "./pages/router";
import { Web3Provider } from "./contexts/web3context";

export default function App() {
  return (
    <ModalProvider options={particleConnectConfig}>
      <Web3Provider>
        <RouterProvider router={router} />
      </Web3Provider>
    </ModalProvider>
  );
}
