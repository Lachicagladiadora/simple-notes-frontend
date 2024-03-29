import { useState } from "react";
import { postTag } from "../utils";

type NewTagFormInput = {
  userId: string;
  setDisplayPostTagForm: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const NewTagForm = ({
  userId,
  setDisplayPostTagForm,
  setMessage,
}: NewTagFormInput) => {
  const [tagValue, setTagValue] = useState("");

  return (
    <form
      className=" max-w-4xl flex flex-col mt-4 border-[2px] border-purple-800 rounded-xl p-4"
      onSubmit={(e) => {
        postTag({
          e: e,
          newTag: { name: tagValue, user: userId },
          setMessage: setMessage,
        });
        setDisplayPostTagForm(false);
        setTagValue("");
        // todo: get tags
      }}
    >
      <h1 className="text-2xl text-purple-600">New Tag</h1>
      <label htmlFor="tag" className="text-purple-800 opacity-80">
        Tag
      </label>
      <input
        type="text"
        id="tag"
        placeholder="Write a tag"
        className="w-full border-[2px] border-purple-600 rounded-md py-1 px-2 text-purple-950 focus:outline-none focus:border-[3px] focus-visible:border-violet-500"
        value={tagValue}
        onChange={(e) => setTagValue(e.target.value)}
      />
      <button className="bg-purple-800 text-fuchsia-50 mt-6 p-2 rounded-full">
        Save
      </button>
    </form>
  );
};
