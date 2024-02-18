import { useState } from "react";
import CircularProgress from "../../../../../common/CircularProgress";
import Icon from "../../../../../common/Icon";
import useNestUser from "../../../../../hooks/useNestUser";
import { twMerge } from "tailwind-merge";
import { arrayToRgb, interpolateColors } from "../../../../../utils";

export default function Header() {
  const user = useNestUser();

  const [content, setContent] = useState("");
  const maxContentLength = 1024;
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
    const dataString = JSON.stringify({});
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
            className="rounded-full w-[4vw] aspect-square self-start"
          />
          <div className="bg-green-500 w-[2ch] rounded-full -right-1 bottom-0 border-4 border-secondary aspect-square absolute" />
        </div>

        <div className="w-full">
          <textarea
            placeholder="Share your thoughts..."
            className="text-front text-sm w-full bg-secondary focus:outline-none pt-2 resize-none scrollbar-primary placeholder:text-front/50"
            rows={3}
            maxLength={maxContentLength}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex text-primary text-xl justify-between items-center">
            <div className="flex items-center gap-x-1">
              <Icon icon="photoLibrary" />
              <Icon icon="gif" />
              <Icon icon="mood" />
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

              <button className="text-back bg-primary text-sm px-4 py-1 rounded-3xl font-medium disabled:opacity-30 disabled:cursor-not-allowed">
                Post
              </button>
            </div>
          </div>
        </div>
      </form>
    </header>
  );
}
