import React from "react";
import Icon from "../../../common/Icon";

const dummy = [
  {
    name: "Riya Jain",
    content:
      "Something is coming tonight. If i like your reply, you are whitelisted.",
    comments: 353,
    userImage: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    name: "Sarthak Singh",
    content:
      "🚨 Delhi to become the 3rd largest city globally in terms of electric buses. CM Arvind Kejriwal to flag off 350 new e-buses today.",
    comments: 23,
    imageUrl:
      "https://pbs.twimg.com/media/GGRcseZWIAAkpJb?format=jpg&name=small",
    userImage: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    name: "Sanjana Sangani",
    content: "Git Cheat Sheet:",
    comments: "23",
    imageUrl:
      "https://pbs.twimg.com/media/GGR6bhfXEAA8CIg?format=jpg&name=900x900",
    userImage: "https://randomuser.me/api/portraits/women/94.jpg",
  },
];

export default function Feed() {
  return (
    <div className="text-front h-screen border-x border-opacity-20 border-front py-10 w-[40vw] z-10">
      <div className="flex gap-x-3 bg-foreground p-2 rounded-md border border-front border-opacity-25 mx-4">
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

            <button
              className="text-white bg-primary text-sm px-4 py-1 rounded-3xl font-medium disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={true}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="w-full border-b border-front border-opacity-25 mt-4" />
      <div>
        {dummy.map((data, i) => (
          <div key={i}>{
            <div>
              {/* <img src="" */}
              {/* // <div>{data.name}</div> */}
              </div>
          }</div>
        ))}
      </div>
    </div>
  );
}
