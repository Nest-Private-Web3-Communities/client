import React, { createContext, useContext } from "react";
import getContracts from "../contracts";

interface Web3ContextType {
  contracts: ReturnType<typeof getContracts>;
}

const Web3Context = createContext<Web3ContextType>({} as Web3ContextType);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <WagmiProvider config={wagmiConfig}> */}
      <Wrapper>{children}</Wrapper>
      {/* </WagmiProvider> */}
    </>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const contracts = getContracts();

  const value = {
    contracts,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export default function useWeb3() {
  return useContext(Web3Context);
}
