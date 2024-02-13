import { WalletEntryPosition } from "@particle-network/auth";
import { Ethereum, EthereumSepolia } from "@particle-network/chains";
import { evmWallets } from "@particle-network/connect";

const particleConnectConfig = {
  projectId: import.meta.env.VITE_PARTICLE_PROJECT_ID,
  clientKey: import.meta.env.VITE_PARTICLE_CLIENT_KEY,
  appId: import.meta.env.VITE_PARTICLE_APP_ID,
  chains: [Ethereum, EthereumSepolia],
  particleWalletEntry: {
    //optional: particle wallet config
    displayWalletEntry: true, //display wallet button when connect particle success.
    defaultWalletEntryPosition: WalletEntryPosition.BR,
    supportChains: [Ethereum, EthereumSepolia],
    customStyle: {}, //optional: custom wallet style
  },
  securityAccount: {
    //optional: particle security account config
    //prompt set payment password. 0: None, 1: Once(default), 2: Always
    promptSettingWhenSign: 1,
    //prompt set master password. 0: None(default), 1: Once, 2: Always
    promptMasterPasswordSettingWhenLogin: 1,
  },
  wallets: evmWallets({
    projectId: "d80820321898edad271be12e8a54f5d5", //replace with walletconnect projectId
    showQrModal: false,
  }),
};

export default particleConnectConfig;
