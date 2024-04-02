import {
  PencilIcon,
  TrashIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";

type NoteProps = {
  tag: string;
  content: string;
  noteId: string;
  updateNote: () => void;
  onDelete: () => void;
  getNotes: () => void;
  setNoteId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Note = ({
  tag,
  content,
  noteId,
  updateNote,
  onDelete,
  getNotes,
  setNoteId,
}: NoteProps) => {
  const [mouseInNote, setMouseInNote] = useState(false);

  return (
    <a
      href="/api/note"
      className="w-3/4 hover:bg-pink-600 hover:opacity-70 hover:rounded-3xl"
      onMouseOver={() => {
        setNoteId(noteId);
        setMouseInNote(true);
      }}
      onMouseOut={() => {
        setMouseInNote(false);
      }}
    >
      <div className="relative bg-violet-200 p-6 rounded-3xl">
        <div
          className={`absolute right-6 -top-5 px-1 py-1 flex gap-2 bg-pink-100 rounded-full ${
            mouseInNote ? "visible" : "hidden"
          }`}
        >
          <button
            className="p-1 rounded-full text-fuchsia-950 hover:text-fuchsia-50 hover:bg-fuchsia-950 hover:text-2xl"
            onClick={(e) => {
              e.preventDefault();
              updateNote();
              getNotes();
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
          <button className="p-1 rounded-full text-fuchsia-950 hover:text-fuchsia-50 hover:bg-fuchsia-950 hover:text-2xl">
            <ClipboardDocumentIcon className="h-5 w-5" />
          </button>
        </div>
        <span
          className={`whitespace-pre border px-2 py-1 rounded-lg font-semibold capitalize ${
            mouseInNote
              ? "border-fuchsia-950 text-purple-950"
              : "border-purple-800 text-purple-800"
          }`}
        >
          # {tag}
        </span>
        <p
          className={`${
            mouseInNote
              ? "opacity-90  text-fuchsia-950"
              : "opacity-50 text-purple-950"
          } mt-4 line-clamp-2`}
        >
          {content}
        </p>
      </div>
    </a>
  );
};
