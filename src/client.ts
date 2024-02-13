import { createWalletClient, custom, publicActions } from "viem";

const client = createWalletClient({
  transport: custom((window as any).ethereum),
}).extend(publicActions);

type TClient = typeof client;

export default TClient;
