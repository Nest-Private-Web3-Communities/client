import React from "react";
import DataForm from "../../common/DataForm";
import PageSeparator from "../../common/PageSeparator";

export default function NewCommunityPage() {
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

      {/* <DataForm.Container className="p-page">
        <DataForm.Input name="name" />
      </DataForm.Container> */}

      <div className="h-screen" />
      <div className="h-screen" />
    </>
  );
}
