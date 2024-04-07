import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { NoteData, TagData } from "../App";
import { useEffect, useState } from "react";

type SearcherInput = {
  tags: TagData[];
  notes: NoteData[];
};

export const Searcher = ({ tags, notes }: SearcherInput) => {
  const [displayAutocomplete, setDisplayAutocomplete] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [tagsFiltered, setTagsFiltered] = useState<TagData[]>([]);
  const [notesFiltered, setNotesFiltered] = useState<NoteData[]>([]);

  type UpdateTagsFilteredInput = {
    word: string;
    updateFilterTags: React.Dispatch<React.SetStateAction<TagData[]>>;
  };

  type UpdateNotesFilteredInput = {
    word: string;
    updateFilterNotes: React.Dispatch<React.SetStateAction<NoteData[]>>;
  };

  useEffect(() => {
    const updateTagsFiltered = ({
      word,
      updateFilterTags,
    }: UpdateTagsFilteredInput) => {
      const newTags = tags.filter((cur) => cur.name.includes(word));
      updateFilterTags(newTags);
    };
    const updateNotesFiltered = ({
      word,
      updateFilterNotes,
    }: UpdateNotesFilteredInput) => {
      const newNotes = notes.filter((cur) => cur.name.includes(word));
      updateFilterNotes(newNotes);
    };
    updateTagsFiltered({
      word: searchValue,
      updateFilterTags: setTagsFiltered,
    });
    updateNotesFiltered({
      word: searchValue,
      updateFilterNotes: setNotesFiltered,
    });
  }, [notes, searchValue, tags]);

  return (
    <section className=" py-8 flex gap-3 text-sm w-3/4 justify-center items-center relative">
      <input
        placeholder="Search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setDisplayAutocomplete(true);
        }}
        className={`border-2 border-fuchsia-950 rounded-full flex-1 py-2 px-4 text-violet-500 font-bold`}
      />
      <MagnifyingGlassIcon className="h-6 w-6 text-fuchsia-950 absolute right-3 opacity-50" />
      {/* <button
        type="button"
        className="p-1 rounded-full border-2 border-fuchsia-950"
      >
      </button> */}
      {displayAutocomplete && (
        <div
          className={`w-11/12 px-6 py-2 absolute top-[72px] bg-fuchsia-50 rounded-b-3xl `}
        >
          <h3>Tags</h3>
          <ul>
            {tagsFiltered.map((cur) => (
              <li key={cur._id}>{cur.name}</li>
            ))}
          </ul>
          <h3>Notes</h3>
          <ul>
            {notesFiltered.map((cur) => (
              <li key={cur._id}>{cur.name}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
