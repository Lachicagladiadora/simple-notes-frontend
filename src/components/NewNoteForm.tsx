import { useState } from "react";
import { postNote, postTag } from "../utils";
import { TagType } from "../App";

type NewNoteFormInput = {
  userId: string;
  tags: TagType[];
  getNotes: () => void;
  setDisplayNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayAllNotes: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const NewNoteForm = ({
  userId,
  tags,
  getNotes,
  setDisplayNoteForm,
  setDisplayAllNotes,
  setMessage,
}: NewNoteFormInput) => {
  const [noteValue, setNoteValue] = useState("");
  const [tagValue, setTagValue] = useState("");

  return (
    <form
      className="flex flex-col mt-4 border-[2px] border-purple-800 rounded-xl p-4"
      onSubmit={(e) => {
        if (tags.filter((cur) => cur.name !== tagValue).length > 0) {
          postNote({
            e: e,
            newNote: { name: noteValue, tag: tagValue, user: userId },
            setMessage: setMessage,
          });
          postTag({
            e: e,
            newTag: { name: tagValue, user: userId },
            setMessage: setMessage,
          });
          setDisplayNoteForm(false);
          setTagValue("");
          setNoteValue("");
          getNotes();
          setDisplayAllNotes(true);
        } else {
          const tagId = tags.filter((cur) => cur.name === tagValue)[0]._id;
          postNote({
            e: e,
            newNote: { name: noteValue, tag: tagId, user: userId },
            setMessage: setMessage,
          });
        }
      }}
    >
      <h1 className="text-2xl text-purple-600">New Note</h1>
      <label htmlFor="tag" className="text-purple-800 opacity-80">
        Tag
      </label>
      <input
        type="text"
        id="tag"
        className="border-[2px] border-purple-600 rounded-lg py-1 px-2 text-purple-950 focus:outline-none focus:border-[3px] focus-visible:border-violet-500"
        placeholder="Write a tag"
        value={tagValue}
        onChange={(e) => setTagValue(e.target.value.trimStart())}
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
