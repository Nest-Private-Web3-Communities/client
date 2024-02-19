import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/index.css";
import { GlobalContextProvider } from "./contexts/globalContext";
import RefreshBoundary from "./common/RefreshBoundary";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <RefreshBoundary id="page">
        <App />
      </RefreshBoundary>
    </GlobalContextProvider>
  </React.StrictMode>
);
