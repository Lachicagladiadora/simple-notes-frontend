import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { TagData } from "../App";

type TagInput = {
  tag: TagData;
  onDeleteTag: () => void;
  getTags: () => void;
  setSelectedTag: (newValue: TagData) => void;
};

export const Tag = ({
  tag,
  setSelectedTag,
  onDeleteTag,
  getTags,
}: TagInput) => {
  return (
    <div className="relative bg-violet-200 p-6 rounded-3xl capitalize">
      <div
        className={`absolute -right-6 -top-5 px-1 py-1 flex gap-2 bg-pink-100 rounded-full `}
      >
        <button
          className="p-1 rounded-full text-fuchsia-950 hover:text-fuchsia-50 hover:bg-fuchsia-950 hover:text-2xl"
          type="button"
          onClick={() => {
            setSelectedTag(tag);
            console.log({ tag });
            getTags();
          }}
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          className="p-1 rounded-full text-fuchsia-950 hover:text-fuchsia-50 hover:bg-fuchsia-950 hover:text-2xl"
          onClick={(e) => {
            e.preventDefault();
            onDeleteTag();
            getTags();
          }}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      {tag.name}
    </div>
  );
};
