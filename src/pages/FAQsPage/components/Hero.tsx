import { twMerge } from "tailwind-merge";
import useTheme from "../../../hooks/useTheme";

const faqs = [
  {
    id: 1,
    question: "How does Nest ensure privacy and security for its users",
    answer:
      "Nest prioritizes privacy and security by leveraging decentralized technologies and encryption methods. Each community is fully encrypted, ensuring that only authorized members can access its content.",
  },
  {
    id: 2,
    question: "How does the Encryption work",
    answer:
      "The key exchange protocol is an asynchronous slightly modified version of the Diffie Hellman Key Exchange protocol adapted for multi party exchange.",
  },
  {
    id: 3,
    question:
      "What sets Nest apart from traditional community management platforms?",
    answer:
      " Unlike traditional platforms that may face issues of centralization and security vulnerabilities, Nest provides a private, fully encrypted environment for seamless community creation, management, and participation.",
  },
  {
    id: 4,
    question:
      "What are the upcoming features that Nest users can look forward to?",
    answer:
      "Nest is continuously evolving to enhance user experience. In the pipeline are features such as messaging, community aggregation, collaboration, and integration with Web2 plugins. These additions will further enrich the platform's functionality, offering users more ways to connect and interact within communities.",
  },
  {
    id: 5,
    question: "What technologies were utilized in developing Nest?",
    answer:
      "Nest's web client is built using React, viem, Particle Connect, and TailwindCss, providing a seamless and responsive user interface. The smart contracts powering Nest are written in Solidity, ensuring the security and efficiency of decentralized operations. ",
  },
  {
    id: 6,
    question:
      "How does Nest ensure community customization while maintaining a cohesive user experience?",
    answer:
      "Nest empowers community creators with full customization options, allowing them to tailor every aspect to suit their community's unique vibe. From color themes to emojis and reactions, users have the freedom to personalize their communities.",
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
          <div className="mt-8">
            <dl className="flex flex-wrap gap-x-4 gap-y-6 justify-around">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border py-4 px-6 rounded-xl w-[49%] border-front border-opacity-40 bg-front bg-opacity-5 backdrop-blur-md"
                >
                  <dt className="text-base font-semibold leading-7 text-front">
                    {faq.question}
                  </dt>
                  <dd className=" leading-7 text-front text-opacity-50 text-sm">
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
