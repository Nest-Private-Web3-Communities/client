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
];

export default function SubgroupList() {
  return (
    <div className="text-white py-10 flex flex-col gap-y-3 pr-8">
    <div className="text-xl border-b-2 border-white pb-1 border-opacity-20">Sub Groups</div>
      {dummy.map((data, i) => (
        <div
          key={i}
          className="bg-secondary bg-opacity-60 hover:bg-opacity-100 duration-200 ease-in px-3 border-white border border-opacity-20 py-4 rounded-lg flex items-center min-w-[18vw] justify-between"
        >
          <div className="flex gap-x-2">
            <img
              src={data.icon}
              className="rounded-full bg-white text-black text-center w-[3vw] aspect-square"
            />
            <div className="flex flex-col">
              <div className="font-bold">{data.name}</div>
              <div className="text-sm text-opacity-50 text-white">
                Active:{" "}
                <span className="text-green">{data.active} members</span>
              </div>
            </div>
          </div>
          <button className="bg-black rounded-full px-2 aspect-square border-white border-opacity-20 border text-primary text-opacity-100 duration-200 ease-in">
            <Icon icon="forum" className="text-[1.5rem] " />
          </button>
        </div>
      ))}
    </div>
  );
}
