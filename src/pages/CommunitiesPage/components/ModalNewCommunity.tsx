import React from "react";

export default function ModalNewCommunity() {
  return (
    <div className="max-w-[50vw] bg-background border border-front border-opacity-20 p-5 rounded-lg flex flex-col items-center gap-y-5 relative">
      <img src="/logo.png" className="h-12" />
      <h1 className="text-lg font-medium text-front">
        Create your own community
      </h1>

      <div className="flex gap-x-2">
        <button className="flex-1 bg-primary">Cancel</button>
        <button className="flex-1 bg-primary">Next</button>
      </div>
    </div>
  );
}
