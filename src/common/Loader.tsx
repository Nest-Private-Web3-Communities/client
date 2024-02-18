import React from "react";
import { twMerge } from "tailwind-merge";

export default function Loader(props: {
  image?: string;
  rgbColor?: string;
  className?: string;
}) {
  function getRandomDuration() {
    return 2500 + 1550 * Math.random();
  }

  return (
    <figure
      className={twMerge(
        "aspect-square flex justify-center items-center border-primary rounded-full border-solid bg-background",
        props.className
      )}
      style={{
        animation: `anim--loader-pulse ${getRandomDuration()}ms infinite, anim--loader-border ${getRandomDuration()}ms infinite, anim--loader-scale ${getRandomDuration()}ms infinite`,
      }}
    >
      <img
        src={props.image || "/logo.png"}
        className={twMerge(
          "w-1/2 rounded-full aspect-square object-contain",
          props.image && "object-cover"
        )}
      />
    </figure>
  );
}
