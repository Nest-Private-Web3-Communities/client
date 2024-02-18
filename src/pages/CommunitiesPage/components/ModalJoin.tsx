import useModal from "../../../hooks/useModal";
import DataForm from "../../../common/DataForm";
import Icon from "../../../common/Icon";
import { useEffect, useState } from "react";
import useWeb3, { AbiReadResponseType } from "../../../contexts/web3context";
import { Address, getContract } from "viem";
import contracts from "../../../contracts";
import { useAccount } from "@particle-network/connect-react-ui";
import { isAddress } from "../../../utils";
import useEncryptionContext from "../../../contexts/encryptionContext";

export default function ModalJoin() {
  const modal = useModal();
  const web3 = useWeb3();
  const encryption = useEncryptionContext();
  const account = useAccount();

  const [address, setAddress] = useState("");
  const [msg, setMsg] = useState("");

  const [communityName, setCommunityName] =
    useState<AbiReadResponseType<"community", "name">>();
  const [participationStage, setParticipationStage] =
    useState<AbiReadResponseType<"community", "participationStage">>();

  function join() {
    if (!account || !web3.client) return;
    const contract = getContract({
      abi: contracts.community.abi,
      address: address as Address,
      client: web3.client,
    });
    // const c = contract.read.
  }

  function loadData() {
    if (!account || !web3.client) return;
    const contract = getContract({
      abi: contracts.community.abi,
      address: address as Address,
      client: web3.client,
    });
    contract.read.name().then((res) => setCommunityName(res));
    contract.read
      .participationStage([account as Address])
      .then((res) => setParticipationStage(res));
  }

  useEffect(() => {
    setCommunityName("");
    setParticipationStage(-1);
    if (isAddress(address)) loadData();
  }, [address]);

  return (
    <div className="max-w-[50vw] min-w-[35vw] bg-background border border-front border-opacity-20 p-5 rounded-lg flex flex-col items-center gap-y-1 relative">
      <button className="absolute top-3 right-3 text-xl" onClick={modal.hide}>
        <Icon icon="close" />
      </button>

      <img src="/logo.png" className="h-12 select-none" draggable={false} />
      <h1 className="text-lg font-medium text-front">Join community</h1>
      <p className="text-xs font-thin">
        Make sure you are invited to join the community
      </p>

      <input
        placeholder="Address Of Community"
        className="bg-background border border-front rounded p-1 border-opacity-20 mt-4 text-xs w-4/5"
        onChange={(e) => setAddress(e.target.value)}
      />

      {communityName && participationStage == 1 && (
        <button className="px-10 py-1 text-sm rounded-md bg-primary mt-4">
          Join {communityName}
        </button>
      )}

      {participationStage && (
        <div className="mt-3 font-light text-primary cursor-default">
          {participationStage == -1 && <p>Invalid Community Address</p>}
          {participationStage == 0 && <p>You are not invited to join</p>}
          {participationStage >= 2 && <p>You are already in this community</p>}
        </div>
      )}
    </div>
  );
}
