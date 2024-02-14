import PageSeparator from "../../common/PageSeparator";
import useWeb3 from "../../contexts/web3context";
import useModal from "../../hooks/useModal";
import Header from "./components/Header";

export default function CommunitiesPage() {
  const web3 = useWeb3();

  console.log(web3.contracts?.nest.read.getCommunitiesOfSender());

  return (
    <>
      <Header />

      <PageSeparator />

      <section className="p-page">
        <button onClick={() => console.log(window.ethereum)}>
          {JSON.stringify({ account: "!" })}
        </button>
      </section>
    </>
  );
}
