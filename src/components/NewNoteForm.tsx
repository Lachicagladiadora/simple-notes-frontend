import { useState } from "react";
import { postNote } from "../utils";
import { TagData } from "../App";
import { Select, SelectedOptionType } from "./Select";

type NewNoteFormInput = {
  userId: string;
  tags: TagData[];
  getAllNotes: () => void;
  setDisplayNoteForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayAllNotes: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const NewNoteForm = ({
  userId,
  tags,
  getAllNotes,
  setDisplayNoteForm,
  setDisplayAllNotes,
  setMessage,
}: NewNoteFormInput) => {
  const [noteValue, setNoteValue] = useState<string>("");
  const [tagValue, setTagValue] = useState<TagData | null>(null);

  const options: SelectedOptionType[] = tags.map((cur) => {
    return { label: cur.name, value: cur._id };
  });

  const onChangeTag = (selectedId: string) => {
    const foundTag = tags.find((cur) => cur._id === selectedId);
    setTagValue(foundTag ?? null);
  };

  return (
    <form
      className="flex flex-col mt-4 border-[2px] border-purple-800 rounded-xl p-4"
      onSubmit={(e) => {
        if (tagValue) {
          postNote({
            e: e,
            newNote: {
              name: noteValue,
              tag: tagValue._id,
              user: userId,
            },
            setMessage: setMessage,
          });

          setDisplayNoteForm(false);
          setTagValue(null);
          setNoteValue("");
          getAllNotes();
          setDisplayAllNotes(true);
        } else {
          setMessage("error with tag");
        }
      }}
    >
      <h1 className="text-2xl text-purple-600">New Note</h1>
      <label htmlFor="tag" className="text-purple-800 opacity-80">
        Tag
      </label>
      <Select
        selectedOption={
          tagValue ? { label: tagValue.name, value: tagValue._id } : null
        }
        options={options}
        onChange={onChangeTag}
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
