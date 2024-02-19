import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#171617] text-white mt-12 p-page pt-20 relative">
      <figure className="absolute bottom-0 left-1/3 -translate-x-1/2 w-1/2 h-3/4 bg-white/5 rounded-t-full blur-3xl pointer-events-none" />

      <div className="flex">
        <div className="basis-1/2">
          <div className="flex items-end gap-x-4 text-5xl">
            <img src="/logo.png" alt="nest" className="h-[1em]" />
            <h1 className="text-primary font-semibold">NEST</h1>
          </div>
        </div>

        <div className="basis-1/2 flex">
          <div className="w-1/3">
            <h2 className="text-lg font-medium">Useful Links</h2>
            <div className="flex flex-col text-sm font-light text-white/50 my-4 gap-y-3">
              <Link to="/communities">Home</Link>
              <Link to="/communities">Your Communities</Link>
              <Link to="/communities/new">Create Community</Link>
            </div>
          </div>
          <div className="w-1/3">
            <h2 className="text-lg font-medium">Resources</h2>
            <div className="flex flex-col text-sm font-light text-white/50 my-4 gap-y-3">
              <Link to="/#">How it works</Link>
              <Link to="/faqs">Faqs</Link>
              {/* <Link to="/communities/new">Create Community</Link> */}
            </div>
          </div>
          <div className="w-1/3">
            <h2 className="text-lg font-medium">Socials</h2>
            <div className="flex flex-col text-sm font-light text-white/50 my-4 gap-y-3">
              <Link
                to="https://github.com/Nest-Private-Web3-Communities"
                target="_blank"
              >
                Github
              </Link>
              <Link to="https://www.linkedin.com/in/marsian83" target="_blank">
                Marsian
              </Link>
              <Link to="/communities/new">Jriyyya</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-1">
        <figure className="border border-white/50 my-6" />
        <p className="font-medium text-white/20">
          Made by{" "}
          <Link
            target="_blank"
            className="italic text-white/40"
            to="https://www.github.com/marsian83"
          >
            {" "}
            @marsan83
          </Link>{" "}
          and{" "}
          <Link
            target="_blank"
            className="italic text-white/40"
            to="https://www.github.com/jriyyya"
          >
            @jriyyya
          </Link>
        </p>
      </div>
    </footer>
  );
}
