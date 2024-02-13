import React from "react";
import Icon from "../../../common/Icon";
const dummy = [
  {
    name: "IIT Bombay",
    members: 30,
    active: 10,
    icon: "https://qph.cf2.quoracdn.net/main-qimg-2f77f788f5dd67e52133595d1153522b.webp",
  },
  {
    name: "IIT Dhanbad",
    members: 70,
    active: 27,
    icon: "https://qph.cf2.quoracdn.net/main-qimg-e3a6ac2523f4f85d3830be83e1e94082",
  },
  {
    name: "IIT Kharagpur",
    members: 50,
    active: 23,
    icon: "https://i0.wp.com/iitaza.com/wp-content/uploads/2023/02/pngfind.com-little-krishna-png-1079961.png?resize=336%2C376&ssl=1",
  },
  {
    name: "IIT Kanpur",
    members: 30,
    active: 12,
    icon: "https://i0.wp.com/iitaza.com/wp-content/uploads/2023/02/PngItem_3517133.png?resize=354%2C354&ssl=1",
  },
  {
    name: "IIT Goa",
    members: 200,
    active: 42,
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Indian_Institute_of_Technology_Goa_Logo.svg/1200px-Indian_Institute_of_Technology_Goa_Logo.svg.png"
  }
];

const dummy2 = [
  {
    name: "Arial",
    active: true,
    image: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    name: "Alice",
    active: false,
    lastActive: "12 Minutes ago",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },

  {
    name: "Ben Shapiro",
    active: true,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Luis",
    active: false,
    lastActive: "7 hours ago",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Remo Singh",
    active: false,
    lastActive: "1 week ago",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: "Desuza",
    active: false,
    lastActive: "1 Day ago",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    name: "Stepahno",
    active: true,
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
];

export default function SubgroupList() {
  return (
    <div className="text-front py-10 flex flex-col gap-y-3 pr-8 h-screen">
      <h1 className="text-xl border-b-2 font-bold border-front pb-1 border-opacity-20">
        Sub Groups
      </h1>
      <div className="flex flex-col gap-y-3 basis-1/2 overflow-y-scroll scrollbar-primary">
        {dummy.map((data, i) => (
          <div
            key={i}
            className=" bg-foreground bg-opacity-60 hover:bg-opacity-100 duration-200 ease-in px-3 border-front border border-opacity-20 py-4 rounded-lg flex items-center min-w-[18vw] justify-between"
          >
            <div className="flex gap-x-2">
              <img
                src={data.icon}
                className="rounded-full bg-front text-background text-center w-[3vw] aspect-square"
              />
              <div className="flex flex-col">
                <h2 className="font-bold">{data.name}</h2>
                <h3 className="text-sm text-opacity-50 text-front">
                  Active:{" "}
                  <span className="text-green">{data.active} members</span>
                </h3>
              </div>
            </div>
            <button className="bg-background rounded-full px-2 aspect-square border-front border-opacity-20 border text-primary text-opacity-100 duration-200 ease-in">
              <Icon icon="forum" className="text-[1.5rem]" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 border-b-2 border-front border-opacity-20 text-lg pb-1 font-bold">
        Community Members
      </div>
      <div className="flex flex-col gap-y-4 bg-foreground p-4 rounded-lg border border-front border-opacity-20 basis-1/2 overflow-y-scroll scrollbar-primary">
        {dummy2
          .sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1))
          .map((member, i) => (
            <div
              key={i}
              className="flex justify-between border-b pb-3 border-front border-opacity-20"
            >
              <div className="flex gap-x-2 justify-center items-center relative">
                <div className="relative">
                  <img
                    src={member.image}
                    className="w-[3vw] aspect-square rounded-full"
                  />
                  {member.active && (
                    <div className="bg-green-500 w-[12px] rounded-full right-0 bottom-0 border-2 border-foreground aspect-square absolute" />
                  )}
                </div>
                <div className="flex flex-col">
                  <h2 className="font-semibold">{member.name}</h2>
                  {member.active ? (
                    <div className="text-sm text-green-500">Active Now</div>
                  ) : (
                    <div className="text-sm text-front text-opacity-50">
                      {member.lastActive}{" "}
                    </div>
                  )}
                </div>
              </div>
              <button className="bg-background rounded-full px-2 aspect-square border-front border-opacity-20 border text-primary text-opacity-100 duration-200 ease-in">
                <Icon icon="chat" className="text-[1.5rem] " />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
