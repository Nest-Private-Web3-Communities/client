import React, { useState } from "react";

export default function CopyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  function copyContent(content: string) {
    const textarea = document.createElement("textarea");
    textarea.value = content;

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  }

  function handleCopy(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const content = (event.target as HTMLDivElement).innerText.trim();
    copyContent(content);
  }

  return (
    <div className="relative cursor-pointer" onClick={handleCopy}>
      {copied && (
        <div className="absolute bg-gray-800 text-white px-2 py-1 rounded top-0 left-1/2 transform -translate-x-1/2 mt-[-20px] text-sm">
          Copied!
        </div>
      )}
      {children}
    </div>
  );
}
