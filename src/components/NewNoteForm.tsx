import { useState } from "react";
import { postNote } from "../utils";

type NewNoteFormInput = {
  userId: string;
  tagValue: string;
  setTagValue: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setDisplayNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
  getNotes: () => void;
};

export const NewNoteForm = ({
  userId,
  tagValue,
  setTagValue,
  setMessage,
  setDisplayNoteForm,
  getNotes,
}: NewNoteFormInput) => {
  const [noteValue, setNoteValue] = useState("");

  return (
    <div className="w-full mt-4 border-[2px] border-purple-800 rounded-xl p-4">
      <h1 className="text-xl text-purple-600">New Note</h1>
      <form
        className=" w-full flex flex-col"
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
    </div>
  );
};
