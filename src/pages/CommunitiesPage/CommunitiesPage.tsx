import useWeb3 from "../../contexts/web3context";

export default function CommunitiesPage() {
  const web3 = useWeb3();

  console.log(web3.contracts?.nest.read.getCommunitiesOfSender());

  return (
    <>
      <section className="pt-20 p-page">
        <button onClick={() => console.log(window.ethereum)}>
          {JSON.stringify({ account: "!" })}
        </button>
      </section>
    </>
  );
}
