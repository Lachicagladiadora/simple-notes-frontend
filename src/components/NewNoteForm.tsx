import { useState } from "react";
import { getNotes, postNote } from "../utils";
import { NoteType } from "../App";

type NewNoteFormInput = {
  userId: string;
  // newNote: NewNoteType;
  tagValue: string;
  setTagValue: React.Dispatch<React.SetStateAction<string>>;
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setDisplayNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NewNoteForm = ({
  userId,
  tagValue,
  setTagValue,
  setNotes,
  setMessage,
  setDisplayNoteForm,
}: NewNoteFormInput) => {
  const [noteValue, setNoteValue] = useState("");

  return (
    <div className="w-full border-[2px] border-purple-800 rounded-xl p-4">
      <h1 className="text-xl text-purple-600">New Note</h1>
      <form
        className=" w-full flex flex-col"
        onSubmit={(e) => {
          postNote({
            e: e,
            newNote: { name: noteValue, tag: tagValue, user: userId },
            setMessage: setMessage,
          });
          getNotes({ userId: userId, setNotes: setNotes });
          setDisplayNoteForm(false);
          setTagValue("");
          setNoteValue("");
        }}
      >
        <label htmlFor="tag" className="text-purple-800 opacity-80">
          Write a new tag
        </label>
        <input
          type="text"
          id="tag"
          className="border-[2px] border-purple-600 rounded-full py-1 px-2 text-purple-950 focus:border-[13px] focus-visible:border-red-700 focus-within::border-none"
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
        />
        <label htmlFor="note" className="text-purple-800 opacity-80">
          Write a new note
        </label>
        <textarea
          id="note"
          className="border-[2px] border-purple-600 rounded-full py-1 px-2 text-purple-950"
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
        />
        <button className="bg-purple-800 text-fuchsia-50 mt-6 p-2 rounded-full">
          Save
        </button>
      </form>
    </div>
  );
};
