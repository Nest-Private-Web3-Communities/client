import { ModalProvider } from "@particle-network/connectkit";

import { RouterProvider } from "react-router-dom";
import router from "./pages/router";
import particleConnectConfig from "./config/particle";
import useTheme from "./hooks/useTheme";

export default function App() {
  const theme = useTheme();

  return (
    <>
      <ModalProvider
        options={particleConnectConfig}
        theme={theme.current}
        walletSort={["Wallet", "Particle Auth"]}
      >
        <RouterProvider router={router} />
      </ModalProvider>
    </>
  );
}
