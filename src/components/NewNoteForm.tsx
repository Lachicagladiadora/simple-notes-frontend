import { useEffect, useState } from "react";
import { postNote } from "../utils";
import { TagType } from "../App";
import { Select, SelectedOptionType } from "./Select";

type NewNoteFormInput = {
  userId: string;
  tags: TagType[];
  getNotes: () => void;
  setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
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
  const [noteValue, setNoteValue] = useState<string>("");
  const [tagValue, setTagValue] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [filterTag, setFilterTag] = useState<TagType[]>([]);

  useEffect(() => {
    const existInTags = tags.filter((cur) => cur.name !== tagValue?.value);
    setFilterTag(existInTags);
  }, [tagValue, tags]);

  // const newOptions: SelectedOptionType[] = filterTag.map((cur) =>
  //   cur ? { label: cur.name, value: cur.name } : null
  // );
  const xx = tags.filter((curr) => curr.name === tagValue?.value);
  console.log("tag id for post", { xx });
  return (
    <form
      className="flex flex-col mt-4 border-[2px] border-purple-800 rounded-xl p-4"
      onSubmit={(e) => {
        postNote({
          e: e,
          newNote: {
            name: noteValue,
            tag: tags.filter((curr) => curr.name === tagValue?.value)[0]._id,
            user: userId,
          },
          setMessage: setMessage,
        });

        setDisplayNoteForm(false);
        setTagValue(null);
        setNoteValue("");
        getNotes();
        setDisplayAllNotes(true);
      }}
    >
      <h1 className="text-2xl text-purple-600">New Note</h1>
      <label htmlFor="tag" className="text-purple-800 opacity-80">
        Tag
      </label>
      <Select
        selectedOption={tagValue}
        options={filterTag.map((cur) =>
          cur ? { label: cur.name, value: cur.name } : null
        )}
        onChange={() => setTagValue(tagValue)}
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
