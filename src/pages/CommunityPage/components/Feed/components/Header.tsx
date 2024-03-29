import { useState } from "react";
import CircularProgress from "../../../../../common/CircularProgress";
import Icon from "../../../../../common/Icon";
import useNestUser from "../../../../../hooks/useNestUser";
import { twMerge } from "tailwind-merge";
import { arrayToRgb, interpolateColors } from "../../../../../utils";
import useWeb3 from "../../../../../contexts/web3context";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FeedItem } from "../../../../../types";
import CryptoJS from "crypto-js";
import useEncryptionContext from "../../../../../contexts/encryptionContext";
import useCommunity from "../../../CommunityContext";
import ModalImageUpload from "../../modals/ModalImageUpload";
import useModal from "../../../../../hooks/useModal";

export default function Header() {
  const user = useNestUser();
  const modal = useModal();
  const web3 = useWeb3();
  const { contract, reload, data: communityData, pageConfig } = useCommunity();
  const encryption = useEncryptionContext();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const maxContentLength = 512;
  const wordUsage = content.length / maxContentLength;
  const wordUsageIndicatorColor = interpolateColors(
    [
      [34, 197, 94],
      [250, 204, 21],
      [220, 38, 38],
    ],
    wordUsage
  );

  function makePost(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);

    const data: FeedItem = { content: content };

    if (imageUrl && imageUrl != "") data.imageUrl = imageUrl;

    const dataString = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(
      dataString,
      encryption.keyMaster
    );

    contract?.write
      .makePost([pageConfig.currentSelectedNetwork, encryptedData.toString()])
      .then((res) =>
        web3.client
          ?.waitForTransactionReceipt({ hash: res })
          .then(() => reload())
      )
      .finally(() => setLoading(false));
  }
  function handleEmojiSelect(emoji: any) {
    setContent(content + emoji.native);
  }

  return (
    <header className="bg-foreground py-4 px-4 border-b border-front/25">
      <form
        onSubmit={makePost}
        className="flex gap-x-3 bg-secondary py-2 px-3 rounded-md border border-front/25"
      >
        <div className="relative h-max">
          <img
            src={user.data.imageUrl}
            className="rounded-full w-[4vw] aspect-square object-cover self-start border-primary border p-1"
          />
          <div className="bg-green-500 w-[2ch] rounded-full -right-1 bottom-0 border-4 border-secondary aspect-square absolute" />
        </div>

        <div className="w-full">
          <div className="flex items-center">
            <textarea
              placeholder={
                communityData.memberCount == 1
                  ? "Add members to the community before posting"
                  : "Share your thoughts..."
              }
              className={twMerge(
                "text-front flex-1 text-sm w-full bg-secondary focus:outline-none pt-2 resize-none scrollbar-primary placeholder:text-front/50",
                communityData.memberCount == 1 &&
                  "placeholder:bg-black placeholder:text-red-500"
              )}
              rows={3}
              maxLength={maxContentLength}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading || communityData.memberCount == 1}
              value={content}
            />
            {imageUrl && (
              <div className="relative">
                <img
                  src={imageUrl}
                  className="h-[3.5em] aspect-square rounded border border-front/25 bg-background/20 object-cover"
                />
                <button
                  className="bg-red-500 border-white/50 rounded-full aspect-square absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
                  onClick={() => setImageUrl("")}
                >
                  <Icon icon="close" />
                </button>
              </div>
            )}
          </div>
          <div className="flex text-primary text-xl justify-between items-center">
            <div className="flex items-center gap-x-1">
              {communityData.memberCount != 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      modal.show(
                        <ModalImageUpload
                          callback={(img) => {
                            setImageUrl(img);
                          }}
                        />
                      )
                    }
                  >
                    <Icon icon="photoLibrary" />
                  </button>
                  <Icon icon="gif" />
                  <div className="group relative">
                    <Icon icon="mood" />
                    <div className="opacity-0 group-hover:opacity-100 absolute pointer-events-none group-hover:pointer-events-auto z-20">
                      <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        className=""
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-x-2">
              <div
                className={twMerge(
                  "relative duration-200 opacity-0 scale-0",
                  content.length > 0 && "opacity-100 scale-100"
                )}
              >
                <CircularProgress
                  progress={wordUsage}
                  size={32}
                  thickness={3}
                />
                <figure
                  className={twMerge(
                    "absolute-center w-1/4 aspect-square rounded-full"
                  )}
                  style={{
                    backgroundColor: arrayToRgb(wordUsageIndicatorColor),
                  }}
                />
              </div>

              <button
                className="text-back bg-primary text-sm px-4 py-1 rounded-3xl font-medium disabled:opacity-40 disabled:animate-pulse disabled:cursor-not-allowed"
                disabled={loading || content.length < 3}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </header>
  );
}
