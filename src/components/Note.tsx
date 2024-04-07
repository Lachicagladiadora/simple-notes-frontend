import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { NoteData, TagData } from "../App";

type NoteProps = {
  tags: TagData[];
  note: NoteData;
  onDelete: () => void;
  getNotes: () => void;
  setSelectedNote: (newValue: NoteData) => void;
};

export const Note = ({
  tags,
  note,
  onDelete,
  getNotes,
  setSelectedNote,
}: NoteProps) => {
  const tagDataFromNote = () => {
    const found = tags.find((cur) => cur._id === note.tag);
    return found ? found.name : "";
  };
  return (
    <div className="relative bg-violet-200 p-6 rounded-3xl">
      <div
        className={`absolute right-6 -top-5 px-1 py-1 flex gap-2 bg-pink-100 rounded-full`}
      >
        <button
          className="p-1 rounded-full text-fuchsia-950 hover:text-fuchsia-50 hover:bg-fuchsia-950 hover:text-2xl"
          onClick={(e) => {
            e.preventDefault();
            setSelectedNote(note);
            // getNotes();
          }}
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          className="p-1 rounded-full text-fuchsia-950 hover:text-fuchsia-50 hover:bg-fuchsia-950 hover:text-2xl"
          onClick={(e) => {
            e.preventDefault();
            onDelete();
            getNotes();
          }}
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      <span
        className={`whitespace-pre border-[2px] border-purple-800 text-purple-800 px-2 py-1 rounded-lg font-semibold capitalize`}
      >
        # {tagDataFromNote()}
      </span>
      <p>{note.name}</p>
    </div>
  );
};
