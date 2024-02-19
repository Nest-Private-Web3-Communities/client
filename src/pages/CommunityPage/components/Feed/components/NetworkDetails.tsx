import React from "react";
import useCommunity from "../../../CommunityContext";

export default function NetworkDetails() {
  const { data, contract, pageConfig } = useCommunity();
  const { currentSelectedNetwork } = pageConfig;
  return <div>NetworkDetails</div>;
}
