import { twMerge } from "tailwind-merge";
import useTheme from "../../../hooks/useTheme";

const faqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 2,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 3,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 4,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 5,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 6,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];

export default function Hero() {
  const theme = useTheme();
  return (
    <section className="relative bg-background pt-16 text-front h-screen p-page">
      <div
        className={twMerge(
          "absolute-cover opacity-60 blur-2xl",
          theme.current == "light" && "opacity-0"
        )}
      >
        <video
          src="/videos/faq-gradient.mp4"
          autoPlay
          loop
          muted
          className="absolute-cover object-cover blur-3xl"
        />
        <article className="bg-primary absolute-cover mix-blend-hue" />
      </div>
      <div className="z-10 absolute">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-front">
              Frequently asked questions
            </h2>
            <p className="mt-4 leading-7 text-front text-opacity-60">
              Have a different question and can’t find the answer you’re looking
              for? Reach out to our support team by{" "}
              <a
                href="#"
                className="font-semibold text-front hover:text-primary"
              >
                sending us an email
              </a>{" "}
              and we’ll get back to you as soon as we can.
            </p>
          </div>
          <div className="mt-14">
            <dl className="flex flex-wrap gap-x-6 gap-y-12 justify-around">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border py-4 px-6 rounded-xl w-[45%] border-front border-opacity-40 bg-front bg-opacity-5 backdrop-blur-md"
                >
                  <dt className="text-base font-semibold leading-7 text-front">
                    {faq.question}
                  </dt>
                  <dd className=" text-base leading-7 text-front text-opacity-50">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
