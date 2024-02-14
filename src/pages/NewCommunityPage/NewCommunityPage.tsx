import DataForm from "../../common/DataForm";
import PageSeparator from "../../common/PageSeparator";
import useWeb3 from "../../contexts/web3context";

export default function NewCommunityPage() {
  const web3 = useWeb3();

  return (
    <>
      <header className="pt-24 p-page flex flex-col gap-y-2">
        <h1 className="font-medium text-xl">Create New Community</h1>
        <p className="font-light leading-tight text-front text-opacity-70">
          We hope you create a thriving community on nest! <br />
          You can make a nest community which represents a real life community
        </p>
      </header>

      <PageSeparator />

      <DataForm.Container
        className="p-page"
        onSubmit={(data) => {
          web3.contracts?.nest.write.newGroup([
            data.name,
            data.description,
            data.img,
          ]);
        }}
      >
        <DataForm.Input name="img" className="bg-background border" />
        <DataForm.Input name="name" className="bg-background border" />
        <DataForm.Input name="description" className="bg-background border" />
        <DataForm.Input type="submit" />
      </DataForm.Container>

      <div className="h-screen" />
      <div className="h-screen" />
    </>
  );
}
