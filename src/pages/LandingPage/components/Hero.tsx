import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";
import { twMerge } from "tailwind-merge";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const theme = useTheme();

  return (
    <section className="h-screen pt-24 p-page flex items-center relative ">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 blur-2xl -z-1">
        <figure className="w-[20vw] h-[9vh] bg-primary/50 absolute anim-continuous-rotate rounded-full" />
        <figure className="w-[22vw] h-[12vh] bg-primary/60 absolute rounded-full anim-continuous-rotate -rotate-6" />
        <figure className="w-[20vw] h-[9vh] bg-primary/40 absolute rounded-full anim-continuous-rotate -rotate-45" />
        <figure className="w-[20vw] h-[9vh] bg-primary/40 absolute rounded-full anim-continuous-rotate -rotate-90" />
        <figure className="w-[5vw] h-[50vh] bg-primary -hue-rotate-15 absolute -translate-y-3/4 -translate-x-3/4 rounded-[100%]" />
      </div>

      <figure className="absolute bottom-0 left-[4%] w-[50vw] h-[60vh] -z-1 bg-front/5 rounded-t-full blur-3xl" />

      <div className="basis-1/2 flex flex-col gap-y-10">
        <h1 className="bg-gray-500/20 backdrop-blur-xl px-8 py-3 text-lg font-light rounded-lg w-max">
          Share your thoughts across communities! 😀
        </h1>

        <h2 className="leading-[1.2] text-6xl font-bold font-poppins">
          Every idea
          <br />
          is worth
          <br />
          <span className="text-primary flex gap-x-2 items-end">
            <span
              style={{
                filter:
                  "drop-shadow(-1px -1px 0px rgb(var(--color-front))) drop-shadow(1px 1px 0px rgb(var(--color-background)))",
              }}
            >
              Sharing
            </span>
            <img alt="nest" src="/logo.png" className="h-[1em]" />
          </span>
        </h2>

        <h3 className="text-front/70 text-lg font-light">
          Nest is a privacy first, fully decentralized
          <br />
          Web3 Communites platform
        </h3>

        <div className="flex gap-x-20">
          <button
            onClick={() => navigate("/communities")}
            className="bg-front px-12 py-3 rounded-lg"
          >
            <span className="text-front invert font-light text-base">
              Get Started
            </span>
          </button>
          <button className="">Learn More</button>
        </div>

        <p className="text-front/30 -mt-3 -mb-7 text-xs">Powered By</p>
        <div
          className={twMerge(
            "flex gap-x-10 saturate-0 brightness-0 opacity-30 relative",
            theme.current == "dark" && "invert"
          )}
        >
          <img src="/images/avax.png" alt="Avax" className="w-1/3" />
          <img
            src="/images/particle.png"
            alt="particle connect"
            className="w-1/3"
          />
        </div>
      </div>

      <div className="basis-1/2 relative">
        <div className="relative">
          <img
            src="/images/home-hand.png"
            alt="web3-hand"
            className="relative z-10 rounded-b-3xl animate-[hero-hand-float_10000ms_infinite]"
            style={{
              filter: `drop-shadow(0px 0px 1px rgb(var(--color-front))) drop-shadow(-4px -10px 10px rgba(var(--color-front)/0.15))`,
            }}
          />
          <figure className="absolute bottom-0 right-0 w-[70%] h-[70vh] bg-primary rounded-t-full rounded-b-[250%]" />
          <figure className="absolute top-full w-1/2 right-0 translate-x-1 h-[10vh] bg-background z-10" />
        </div>
      </div>
    </section>
  );
}
