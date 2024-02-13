import { ModalProvider } from "@particle-network/connect-react-ui";
import { RouterProvider } from "react-router-dom";
import particleConnectConfig from "./config/particle";
import router from "./pages/router";

export default function App() {
  return (
    <ModalProvider options={particleConnectConfig}>
      <RouterProvider router={router} />
    </ModalProvider>
  );
}
