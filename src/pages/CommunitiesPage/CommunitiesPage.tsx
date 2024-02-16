import PageSeparator from "../../common/PageSeparator";
import CommunitiesList from "./components/CommunitiesList";
import Header from "./components/Header";

export default function CommunitiesPage() {
  return (
    <>
      <Header />

      <PageSeparator />

      <CommunitiesList />
    </>
  );
}
