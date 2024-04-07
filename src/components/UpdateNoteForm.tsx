import { XCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { updateNotes } from "../utils";
import { Select, SelectedOptionType } from "./Select";
import { NoteData, TagData } from "../App";

type UpdateNoteFormInput = {
  note: NoteData;
  tags: TagData[];
  onSuccess: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UpdateNoteForm = ({
  note,
  tags,
  onSuccess,
  setMessage,
}: UpdateNoteFormInput) => {
  const [tagValue, setTagValue] = useState<TagData | null>(
    tags.find((cur) => cur._id === note.tag) ?? null
  );
  const [noteName, setNoteName] = useState(note.name);

  const newOptions: SelectedOptionType[] = tags.map((cur) => {
    return { label: cur.name, value: cur._id };
  });

  const onChangeTag = (tagId: string) => {
    const foundTag = tags.find((cur) => cur._id === tagId);
    setTagValue(foundTag ?? null);
  };

  return (
    <div className="bg-purple-950 bg-opacity-40 h-full w-full absolute top-16 flex justify-center items-center">
      <form
        action=""
        className="max-w-4xl bg-violet-50 border border-violet-950 p-6 rounded-xl flex flex-col relative"
        onSubmit={async (e) => {
          if (!tagValue) return;
          await updateNotes({
            e: e,
            noteId: note._id,
            editNote: {
              tag: tagValue._id,
              name: noteName,
            },
            setMessage: setMessage,
          });
          onSuccess();
        }}
      >
        <h1 className="text-xl text-purple-600">Edit note</h1>
        <label htmlFor="tag" className="text-purple-800 opacity-80">
          Tag
        </label>
        <Select
          selectedOption={
            tagValue ? { label: tagValue.name, value: tagValue._id } : null
          }
          options={newOptions}
          onChange={onChangeTag}
        />
        <label htmlFor="note" className="text-purple-800 opacity-80">
          Note
        </label>
        <textarea
          id="note"
          className="border-[2px] border-purple-600 rounded-lg py-1 px-2 text-purple-950 focus:outline-none focus:border-[3px] focus-visible:border-violet-500"
          placeholder="Write a note"
          value={noteName}
          onChange={(e) => setNoteName(e.target.value)}
        />
        <button className="bg-purple-800 text-fuchsia-50 mt-6 p-2 rounded-full">
          Save
        </button>
        <button
          type="button"
          onClick={() => onSuccess()}
          className="absolute -top-2 -right-2 rounded-full text-purple-800"
        >
          <XCircleIcon className="h-8" />
        </button>
      </form>
    </div>
  );
};
