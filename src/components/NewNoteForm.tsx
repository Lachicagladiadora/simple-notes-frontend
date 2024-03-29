import { useState } from "react";
import { postNote } from "../utils";

type NewNoteFormInput = {
  userId: string;
  setDisplayNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
  getNotes: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const NewNoteForm = ({
  userId,
  setMessage,
  setDisplayNoteForm,
  getNotes,
}: NewNoteFormInput) => {
  const [noteValue, setNoteValue] = useState("");
  const [tagValue, setTagValue] = useState("");

  return (
    <form
      className="flex flex-col mt-4 border-[2px] border-purple-800 rounded-xl p-4"
      onSubmit={(e) => {
        postNote({
          e: e,
          newNote: { name: noteValue, tag: tagValue, user: userId },
          setMessage: setMessage,
        });
        setDisplayNoteForm(false);
        setTagValue("");
        setNoteValue("");
        getNotes();
      }}
    >
      <h1 className="text-xl text-purple-600">New Note</h1>
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
    </form>
  );
};
