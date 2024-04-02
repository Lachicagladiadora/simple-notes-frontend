import { XCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { updateNotes, updateTag } from "../utils";

type UpdateNoteFormInput = {
  userId: string;
  noteId: string | null;
  tagId: string | null;
  initialTag: string;
  initialNote: string;
  setDisplayUpdateNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
  getNotes: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UpdateNoteForm = ({
  userId,
  noteId,
  tagId,
  initialTag,
  initialNote,
  setDisplayUpdateNoteForm,
  getNotes,
  setMessage,
}: UpdateNoteFormInput) => {
  const [tagValue, setTagValue] = useState(initialTag);
  const [noteValue, setNoteValue] = useState(initialNote);

  return (
    <div className="bg-purple-950 bg-opacity-40 h-full w-full absolute top-16 flex justify-center items-center">
      <form
        action=""
        className="max-w-4xl bg-violet-50 border border-violet-950 p-6 rounded-xl flex flex-col relative"
        onSubmit={(e) => {
          updateNotes({
            e: e,
            noteId: noteId,
            editNote: { tag: tagValue, name: noteValue },
            setMessage: setMessage,
          });
          updateTag({
            e: e,
            tagId: tagId,
            body: { name: tagValue, user: userId },
            setMessage: setMessage,
          });
          getNotes();
          setDisplayUpdateNoteForm(false);
        }}
      >
        <h1 className="text-xl text-purple-600">Edit note</h1>
        <label htmlFor="tag" className="text-purple-800 opacity-80">
          Tag
        </label>
        <input
          type="text"
          id="tag"
          className="border-[2px] border-purple-600 rounded-lg py-1 px-2 text-purple-950 focus:outline-none focus:border-[3px] focus-visible:border-violet-500"
          placeholder="Write a tag"
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
        />
        <label htmlFor="note" className="text-purple-800 opacity-80">
          Note
        </label>
        <textarea
          id="note"
          className="border-[2px] border-purple-600 rounded-lg py-1 px-2 text-purple-950 focus:outline-none focus:border-[3px] focus-visible:border-violet-500"
          placeholder="Write a note"
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
        />
        <button className="bg-purple-800 text-fuchsia-50 mt-6 p-2 rounded-full">
          Save
        </button>
        <button
          type="button"
          onClick={() => setDisplayUpdateNoteForm(false)}
          className="absolute -top-2 -right-2 rounded-full text-purple-800"
        >
          <XCircleIcon className="h-8" />
        </button>
      </form>
    </div>
  );
};
