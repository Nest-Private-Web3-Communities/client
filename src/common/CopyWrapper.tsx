import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface CopyWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function CopyWrapper({ children, className }: CopyWrapperProps) {
  const [copied, setCopied] = useState(false);

  function copyContent(content: string) {
    const textarea = document.createElement("textarea");
    textarea.value = content;

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    setCopied(true);
    setTimeout(() => setCopied(false), 1000); // Reset copied state after 2 seconds
  }

  function handleCopy(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const content = (event.target as HTMLDivElement).innerText.trim();
    copyContent(content);
  }

  return (
    <div
      className={twMerge(className, "relative cursor-pointer")}
      onClick={handleCopy}
    >
      <div
        className={twMerge(
          "absolute bg-gray-800 text-white px-2 py-1 rounded top-0 left-1/2 transform -translate-x-1/2 -mt-5 text-sm duration-200 ease-in",
          copied ? "opacity-100" : "opacity-0"
        )}
      >
        Copied!
      </div>
      {children}
    </div>
  );
}
