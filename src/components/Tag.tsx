import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

type TagInput = {
  content: string;
  tagId: string | null;
  onUpdateTag: () => void;
  onDeleteTag: () => void;
  getTags: () => void;
  setTagId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Tag = ({
  content,
  tagId,
  onUpdateTag,
  onDeleteTag,
  getTags,
  setTagId,
}: TagInput) => {
  const [mouseInNote, setMouseInNote] = useState(false);

  return (
    <div
      className="relative bg-violet-200 p-6 rounded-3xl capitalize"
      onClick={() => setTagId(tagId)}
      onMouseOver={() => {
        setMouseInNote(true);
      }}
      onMouseOut={() => setMouseInNote(false)}
    >
      <div
        className={`absolute -right-6 -top-5 px-1 py-1 flex gap-2 bg-pink-100 rounded-full ${
          mouseInNote ? "visible" : "hidden"
        }`}
      >
        <button
          className="p-1 rounded-full text-fuchsia-950 hover:text-fuchsia-50 hover:bg-fuchsia-950 hover:text-2xl"
          onClick={(e) => {
            e.preventDefault();
            onUpdateTag();
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
      {content}
    </div>
  );
};
