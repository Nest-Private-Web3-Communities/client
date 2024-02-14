import React from "react";
import { twMerge } from "tailwind-merge";

interface PageSeparatorProps {
  className?: string;
}

export default function PageSeparator(props: PageSeparatorProps) {
  return (
    <div className="p-page" role="separator">
      <figure
        className={twMerge(
          "border border-front border-opacity-10 my-10",
          props.className
        )}
      />
    </div>
  );
}
