import { ModalProvider } from "@particle-network/connect-react-ui";
import { RouterProvider } from "react-router-dom";
import particleConnectConfig from "./config/particle";
import router from "./pages/router";
import { Web3Provider } from "./contexts/web3context";
import { EncryptionContextProvider } from "./contexts/encryptionContext";

export default function App() {
  return (
    <ModalProvider options={particleConnectConfig}>
      <Web3Provider>
        <EncryptionContextProvider>
          <RouterProvider router={router} />
        </EncryptionContextProvider>
      </Web3Provider>
    </ModalProvider>
  );
}
