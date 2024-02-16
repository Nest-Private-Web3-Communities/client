import { twMerge } from "tailwind-merge";

interface IconProps {
  name: keyof typeof emotes;
  className?: string;
  color?: string;
}

export default function Emote(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      className={twMerge("fill-current w-[1em] h-[1em]", props.className)}
      style={{
        color: props.color,
      }}
    >
      {emotes[props.name]}
    </svg>
  );
}

export type EmoteType = keyof typeof emotes;

const emotes = {
  aaa: (
    <path d="M616.176-540q17.324 0 30.074-12.927Q659-565.853 659-583.176q0-17.324-12.927-30.074Q633.147-626 615.824-626q-17.324 0-30.074 12.927Q573-600.147 573-582.824q0 17.324 12.927 30.074Q598.853-540 616.176-540Zm-272 0q17.324 0 30.074-12.927Q387-565.853 387-583.176q0-17.324-12.926-30.074Q361.147-626 343.824-626q-17.324 0-30.074 12.927Q301-600.147 301-582.824q0 17.324 12.926 30.074Q326.853-540 344.176-540ZM480-282q58.598 0 106.799-31.5Q635-345 659-397H301q24 52 72.201 83.5Q421.402-282 480-282Zm.174 166q-74.814 0-141.626-28.622-66.812-28.622-116.234-77.688t-77.868-115.884Q116-405.012 116-479.826q0-74.814 28.622-141.626 28.622-66.811 77.688-116.234 49.066-49.422 115.884-77.868Q405.012-844 479.826-844q74.814 0 141.626 28.622 66.811 28.622 116.234 77.688 49.422 49.066 77.868 115.884Q844-554.988 844-480.174q0 74.814-28.622 141.626-28.622 66.812-77.688 116.234t-115.884 77.868Q554.988-116 480.174-116ZM480-480Zm.084 329q137.291 0 233.104-95.896Q809-342.792 809-480.084q0-137.291-95.896-233.104Q617.208-809 479.916-809q-137.291 0-233.104 95.896Q151-617.208 151-479.916q0 137.291 95.896 233.104Q342.792-151 480.084-151Z" />
  ),
  aab: (
    <path d="M616.176-540q17.324 0 30.074-12.927Q659-565.853 659-583.176q0-17.324-12.927-30.074Q633.147-626 615.824-626q-17.324 0-30.074 12.927Q573-600.147 573-582.824q0 17.324 12.927 30.074Q598.853-540 616.176-540Zm-272 0q17.324 0 30.074-12.927Q387-565.853 387-583.176q0-17.324-12.926-30.074Q361.147-626 343.824-626q-17.324 0-30.074 12.927Q301-600.147 301-582.824q0 17.324 12.926 30.074Q326.853-540 344.176-540Zm136.318 122q-57.744 0-106.619 31.5T301-302h37q22.319-37.925 60.521-60.462Q436.723-385 480.173-385t81.479 22.538Q599.681-339.925 623-302h36q-24-53-72.381-84.5Q538.237-418 480.494-418Zm-.32 302q-74.814 0-141.626-28.622-66.812-28.622-116.234-77.688t-77.868-115.884Q116-405.012 116-479.826q0-74.814 28.622-141.626 28.622-66.811 77.688-116.234 49.066-49.422 115.884-77.868Q405.012-844 479.826-844q74.814 0 141.626 28.622 66.811 28.622 116.234 77.688 49.422 49.066 77.868 115.884Q844-554.988 844-480.174q0 74.814-28.622 141.626-28.622 66.812-77.688 116.234t-115.884 77.868Q554.988-116 480.174-116ZM480-480Zm.084 329q137.291 0 233.104-95.896Q809-342.792 809-480.084q0-137.291-95.896-233.104Q617.208-809 479.916-809q-137.291 0-233.104 95.896Q151-617.208 151-479.916q0 137.291 95.896 233.104Q342.792-151 480.084-151Z" />
  ),
  aac: (
    <path d="M616.176-540q17.324 0 30.074-12.927Q659-565.853 659-583.176q0-17.324-12.927-30.074Q633.147-626 615.824-626q-17.324 0-30.074 12.927Q573-600.147 573-582.824q0 17.324 12.927 30.074Q598.853-540 616.176-540Zm-272 0q17.324 0 30.074-12.927Q387-565.853 387-583.176q0-17.324-12.926-30.074Q361.147-626 343.824-626q-17.324 0-30.074 12.927Q301-600.147 301-582.824q0 17.324 12.926 30.074Q326.853-540 344.176-540ZM363-351h234v-32H363v32Zm117.174 235q-74.814 0-141.626-28.622-66.812-28.622-116.234-77.688t-77.868-115.884Q116-405.012 116-479.826q0-74.814 28.622-141.626 28.622-66.811 77.688-116.234 49.066-49.422 115.884-77.868Q405.012-844 479.826-844q74.814 0 141.626 28.622 66.811 28.622 116.234 77.688 49.422 49.066 77.868 115.884Q844-554.988 844-480.174q0 74.814-28.622 141.626-28.622 66.812-77.688 116.234t-115.884 77.868Q554.988-116 480.174-116ZM480-480Zm.084 329q137.291 0 233.104-95.896Q809-342.792 809-480.084q0-137.291-95.896-233.104Q617.208-809 479.916-809q-137.291 0-233.104 95.896Q151-617.208 151-479.916q0 137.291 95.896 233.104Q342.792-151 480.084-151Z" />
  ),
  aad: (
    <path d="M339-156v-35h124v-159q-55-9-96-45.5T311-486q-65-6-110-50.5T156-644v-42q0-14 10-24.5t25-10.5h114v-83h350v83h114q15 0 25 10.5t10 24.5v42q0 63-45 107.5T649-486q-15 54-56 90.5T498-350v159h124v35H339Zm-34-367v-163H191v42q0 48 33.5 82t80.5 39Zm175 138q57 0 97.5-40.5T618-523v-246H342v246q0 57 40.5 97.5T480-385Zm175-138q47-5 80.5-39t33.5-82v-42H655v163Zm-175-54Z" />
  ),
  aae: (
    <path d="m480-172-25-24q-102.768-95.121-168.884-161.561Q220-424 182-473.5t-52-89.172Q116-602.343 116-641q0-74.736 52.205-126.868Q220.409-820 296-820q51 0 98.5 28.5T480-707q39-56 85.356-84.5Q611.712-820 664-820q75.591 0 127.795 52.132Q844-715.736 844-641q0 38.657-14 78.328-14 39.672-51.886 88.957-37.885 49.285-104.116 115.939Q607.768-291.121 505-196l-25 24Zm0-48q98.291-89.549 162.125-153.156t100.854-111.226Q780-532 794.5-568.791q14.5-36.791 14.5-72.328Q809-702 767.5-743.5T664.225-785q-49.524 0-91.375 29.5Q531-726 496-667h-32q-36-59-78.331-88.5-42.33-29.5-89.894-29.5Q235-785 193-743.786q-42 41.215-42 103.433 0 34.96 14.66 71.697 14.66 36.738 51.5 83.697T317.5-374Q381-310 480-220Zm0-283Z" />
  ),
  aaf: (
    <path d="M699.038-148H292v-444l253-253 14.895 13.158q5.98 4.971 9.043 12.907Q572-811 572-803.68v4.68l-42 207h286q25.8 0 46.4 20.6Q883-550.8 883-525v44.25q0 5.371-.5 12.061Q882-462 879-457L768.353-193.255q-9.905 19.69-29.975 32.472Q718.308-148 699.038-148ZM327-183h370q10 0 22-6t18-20l111-264v-52q0-13-9.5-22.5T816-557H487l47-230-207 210v394Zm0-394v394-394Zm-35-15v35H150v374h142v35H115v-444h177Z" />
  ),
  aba: (
    <path d="M259.813-765H667v444L413-68l-14.018-13.158q-5.857-4.971-8.92-12.906Q387-102 387-110.32V-114l41-207H143q-25.8 0-46.4-20.6Q76-362.2 76-388v-56.311Q76-451 79-456l111.647-263.745q8.552-19.523 28.798-32.389Q239.692-765 259.813-765ZM632-730H262q-11 0-22.5 6T222-704L111-440v52q0 13 9 22.5t23 9.5h329l-47 229 207-209v-394Zm0 394v-394 394Zm35 15v-35h142v-374H667v-35h177v444H667Z" />
  ),
  abc: (
    <path d="M480-110q-28 0-49-18t-24-46h146q-3 28-24 46t-49 18ZM337-252v-35h286v35H337Zm2-112q-57-39-89.5-95.507Q217-516.014 217-585q0-109.25 76.926-186.125Q370.853-848 480.176-848q109.324 0 186.074 76.875Q743-694.25 743-585q0 68.986-32.5 125.493Q678-403 621-364H339Zm10.737-35h260.526Q656-431 682-479.587q26-48.588 26-105.263 0-95.15-66.615-161.65-66.616-66.5-161.5-66.5Q385-813 318.5-746.701q-66.5 66.3-66.5 161.592 0 56.759 26 105.434T349.737-399ZM480-399Z" />
  ),
  tmp: (
    <path d="M624.126-519.693q25.95 0 44.143-18.165 18.192-18.165 18.192-44.115 0-25.95-18.165-44.142-18.165-18.192-44.115-18.192-25.95 0-44.142 18.165-18.193 18.165-18.193 44.115 0 25.95 18.165 44.142 18.165 18.192 44.115 18.192Zm-288.307 0q25.95 0 44.142-18.165 18.193-18.165 18.193-44.115 0-25.95-18.165-44.142-18.165-18.192-44.115-18.192-25.95 0-44.143 18.165-18.192 18.165-18.192 44.115 0 25.95 18.165 44.142 18.165 18.192 44.115 18.192ZM480-252.309q70.213 0 128.26-39.538T690.922-398H269.078q24.615 66.615 82.662 106.153 58.047 39.538 128.26 39.538Zm.067 184.308q-85.476 0-160.684-32.44-75.209-32.44-130.842-88.05-55.634-55.611-88.087-130.789-32.453-75.177-32.453-160.653 0-85.476 32.44-160.684 32.44-75.209 88.05-130.842 55.611-55.634 130.789-88.087 75.177-32.453 160.653-32.453 85.476 0 160.684 32.44 75.209 32.44 130.842 88.05 55.634 55.611 88.087 130.789 32.453 75.177 32.453 160.653 0 85.476-32.44 160.684-32.44 75.209-88.05 130.842-55.611 55.634-130.789 88.087-75.177 32.453-160.653 32.453Z" />
  ),
} as const;

export const emoteDeclarations = emotes;
