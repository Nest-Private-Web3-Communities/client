import React, { useEffect, useState } from "react";
import useCommunity from "../../CommunityContext";
import Icon from "../../../../common/Icon";
import useModal from "../../../../hooks/useModal";
import useWeb3, { AbiReadResponseType } from "../../../../contexts/web3context";
import { Address } from "viem";
import { isAddress } from "../../../../utils";
import Loader from "../../../../common/Loader";
import { twMerge } from "tailwind-merge";

export default function ModalInvite() {
  const { contract, data } = useCommunity();
  const web3 = useWeb3();
  const modal = useModal();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [userDetails, setUserDetails] =
    useState<AbiReadResponseType<"nest", "getUserByAddress">>();
  const [participationStage, setParticipationStage] = useState(-1);

  function inviteHandler() {
    setPending(true);
    contract?.write.invite([address as Address]).then(modal.hide);
  }

  useEffect(() => {
    if (isAddress(address)) {
      setLoading(true);
      setUserDetails(undefined);
      web3.contracts.nest.read
        .getUserByAddress([address as Address])
        .then((res) => setUserDetails(res))
        .finally(() => {
          setLoading(false);
        });
      contract?.read
        .participationStage([address])
        .then((res) => setParticipationStage(res));
    }
  }, [address]);

  return (
    <div className="relative bg-background p-6 w-[40vw] rounded-lg flex flex-col items-center border border-front/25 gap-y-6">
      <button
        className="absolute top-2 right-2 text-red-500 text-2xl disabled:opacity-0"
        onClick={modal.hide}
        disabled={pending}
      >
        <Icon icon="close" />
      </button>

      <h1 className="font-light text-2xl px-[3vw]">
        Invite people to join <span className="font-semibold">{data.name}</span>
      </h1>

      <div className="w-2/3 flex items-center gap-x-2 p-2 border border-front/25 rounded-md">
        <Icon icon="search" className="text-lg" />
        <input
          onChange={(e) => setAddress(e.target.value)}
          type="search"
          placeholder="Address of user to invite"
          className="bg-background outline-none text-xs flex-1"
          role="searchbox"
          disabled={pending}
        />
      </div>

      {userDetails && userDetails.flag && (
        <div
          className={twMerge(
            "flex flex-col items-center",
            pending && "animate-pulse"
          )}
        >
          <div className="flex items-center gap-x-5 justify-center bg-primary/10 px-10 py-4 rounded-xl">
            <img
              className="w-[6vw] aspect-square object-cover rounded-full truncate"
              src={userDetails.imageUrl}
              alt={userDetails.name}
            />
            <div className="">
              <h3 className="text-2xl pb-2">{userDetails.name}</h3>

              {participationStage == 0 && (
                <button
                  className="bg-background text-front px-6 py-2 rounded-md border-front/25 disabled:opacity-0"
                  onClick={inviteHandler}
                  disabled={pending}
                >
                  Invite
                </button>
              )}
              {participationStage == 1 && (
                <p className="font-extralight">
                  Already Invited to join {data.name}
                </p>
              )}
              {participationStage >= 2 && (
                <p className="text-primary font-extralight">
                  Already a memeber of {data.name}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {userDetails && !userDetails.flag && (
        <p>Invalid Address, No Nest Account</p>
      )}

      {loading && <Loader className="w-[10vw]" image={data.imageUrl} />}
    </div>
  );
}
