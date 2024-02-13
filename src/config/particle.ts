import {
  Ethereum,
  EthereumGoerli,
  Avalanche,
  AvalancheTestnet,
} from "@particle-network/chains";
import { evmWallets } from "@particle-network/connectors";

const particleConnectConfig = {
  projectId: import.meta.env.VITE_PARTICLE_PROJECT_ID,
  clientKey: import.meta.env.VITE_PARTICLE_CLIENT_KEY,
  appId: import.meta.env.VITE_PARTICLE_APP_ID,
  chains: [Avalanche, AvalancheTestnet],
  wallet: {
    visible: false,
    supportChains: [Avalanche, AvalancheTestnet],
    customStyle: {},
  },
  promptSettingConfig: {
    promptPaymentPasswordSettingWhenSign: 1,
    promptMasterPasswordSettingWhenLogin: 1,
  },
  connectors: evmWallets({
    projectId: "d80820321898edad271be12e8a54f5d5",
    showQrModal: false,
  }),
};

export default particleConnectConfig;
