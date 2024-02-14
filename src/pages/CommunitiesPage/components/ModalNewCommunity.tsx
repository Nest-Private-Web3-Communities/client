import useModal from "../../../hooks/useModal";
import DataForm from "../../../common/DataForm";
import Icon from "../../../common/Icon";

export default function ModalNewCommunity() {
  const modal = useModal();

  return (
    <div className="max-w-[50vw] min-w-[25vw] bg-background border border-front border-opacity-20 p-5 rounded-lg flex flex-col items-center gap-y-1 relative">
      <button className="absolute top-3 right-3 text-xl" onClick={modal.hide}>
        <Icon icon="close" />
      </button>

      <img src="/logo.png" className="h-12 select-none" draggable={false} />
      <h1 className="text-lg font-medium text-front">
        Create your own community
      </h1>

      <DataForm.Container className="py-6 flex flex-col self-stretch gap-y-2 text-sm">
        <DataForm.Input
          name="name"
          placeholder="Community Name"
          className="bg-background border border-front rounded p-1 border-opacity-20"
        />
        <DataForm.Textarea
          name="description"
          placeholder="Community Description"
          className="bg-background border border-front rounded p-1 border-opacity-20 resize-none"
          rows={4}
        />
      </DataForm.Container>
    </div>
  );
}
