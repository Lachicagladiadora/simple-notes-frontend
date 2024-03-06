import {
  PencilIcon,
  TrashIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/16/solid";

export const Note = () => {
  return (
    <div className="w-3/4 pt-10">
      <div className="relative bg-violet-300  p-4 rounded-3xl">
        <div className="absolute -right-3 -top-4 px-2 py-1 flex gap-2 bg-pink-100 rounded-full">
          <button>
            <PencilIcon className="h-6 w-6 text-fuchsia-950" />
          </button>
          <button>
            <TrashIcon className="h-6 w-6 text-fuchsia-950" />
          </button>
          <button>
            <ClipboardDocumentIcon className="h-6 w-6 text-fuchsia-950" />
          </button>
        </div>
        helllo Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Possimus debitis iusto pariatur, vero, officia ad corrupti at laborum ex
        vitae quisquam accusantium sed facilis dolore reprehenderit, doloribus
        tempora veritatis ipsam.
      </div>
    </div>
  );
};
