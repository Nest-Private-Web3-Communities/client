import React from "react";
import Icon from "../../../common/Icon";

export default function Feed() {
  return (
    <div className="text-front h-screen border-x border-opacity-20 border-front px-4 py-10 w-[40vw] z-10 ">
      <div className="flex gap-x-3 bg-foreground p-2 rounded-md border border-front border-opacity-25">
        <div className="relative h-max">
          <img
            src="https://randomuser.me/api/portraits/women/12.jpg"
            className="rounded-full w-[4vw] aspect-square self-start"
          />
          <div className="bg-green-500 w-[2ch] rounded-full -right-1 bottom-0 border-4 border-foreground aspect-square absolute" />
        </div>

        <div className="w-full">
          <textarea
            placeholder="What's on your mind?!"
            className="text-front w-full bg-foreground focus:outline-none pt-2"
          />
          <div className="flex text-primary text-xl gap-x-1 items-center w-full">
            <Icon icon="photoLibrary" />
            <Icon icon="gif" />
            <Icon icon="mood" />

            <figure role="separator" className="flex-1" />

            <button className="text-front text-sm px-4 py-1 border border-primary hover:bg-primary duration-200 ease-in rounded-2xl font-medium">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
