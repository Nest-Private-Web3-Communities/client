import { useParticleProvider } from "@particle-network/connect-react-ui";
import { useEffect, useState } from "react";
import { createWalletClient, custom, getContract } from "viem";
import nest from "../../contracts/nest";

export default function CommunitiesPage() {
  const provider = useParticleProvider();

  return (
    <>
      <section className="pt-20 p-page">{/* <ConnectButton /> */}</section>
    </>
  );
}
