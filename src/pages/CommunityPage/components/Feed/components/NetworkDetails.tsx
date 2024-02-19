import React, { useEffect, useState } from "react";
import useCommunity from "../../../CommunityContext";
import { networkImagePlaceholder } from "../../../../../config";

export default function NetworkDetails() {
  const { data, contract, pageConfig } = useCommunity();
  const { currentSelectedNetwork } = pageConfig;

  const [imageUrl, setImageUrl] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (contract)
      contract.read.networks([currentSelectedNetwork]).then((res) => {
        setImageUrl(res[0]);
        setDesc(res[1]);
      });
  }, [contract, currentSelectedNetwork]);

  return (
    <section className="bg-foreground px-5 py-3 border border-front/25 border-t-transparent flex items-center">
      <img
        src={imageUrl || networkImagePlaceholder}
        onError={(e) => (e.currentTarget.src = networkImagePlaceholder)}
        alt={currentSelectedNetwork}
        className="w-[3vw] aspect-square rounded-full object-cover"
      />

      <div className="flex-1 pl-3">
        <h2 className="text-sm font-medium">{currentSelectedNetwork}</h2>
        <textarea
          value={desc}
          rows={2}
          disabled
          className="text-[10px] font-light text-front/70 resize-none bg-transparent w-full"
        />
      </div>
    </section>
  );
}
