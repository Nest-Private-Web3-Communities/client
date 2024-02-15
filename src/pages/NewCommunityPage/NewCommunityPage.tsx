import { twMerge } from "tailwind-merge";
import DataForm from "../../common/DataForm";
import PageSeparator from "../../common/PageSeparator";
import useWeb3 from "../../contexts/web3context";

export default function NewCommunityPage() {
  const web3 = useWeb3();

  const inputStyle =
    "bg-background border border-front border-opacity-30 outline-none p-2 rounded-md";

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
        className="p-page flex flex-col gap-y-5"
        onSubmit={(data) => {
          web3.contracts?.nest.write.newGroup([
            data.name,
            data.description,
            data.img,
          ]);
        }}
      >
        <div className="flex gap-x-5">
          <DataForm.Input
            name="name"
            placeholder="Community Name"
            className={twMerge(inputStyle, "basis-1/2")}
          />
          <DataForm.Input
            name="img"
            placeholder="ImageUrl"
            className={twMerge(inputStyle, "basis-1/2")}
          />
        </div>

        <DataForm.Textarea
          name="description"
          placeholder="Enter a description for your community, be creative..."
          rows={5}
          className={twMerge(inputStyle, "resize-none")}
        />

        <DataForm.Input
          type="submit"
          className="cursor-pointer w-max px-10 py-2 rounded-md bg-primary"
        />
      </DataForm.Container>

      <div className="h-screen" />
      <div className="h-screen" />
    </>
  );
}
