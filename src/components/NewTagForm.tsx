import { useState } from "react";

export const NewTagForm = () => {
  const [tagValue, setTagValue] = useState("");

  return (
    <div className="w-full border-[2px] border-purple-800 rounded-xl p-4">
      <h1 className="text-xl text-purple-600">New Tag</h1>
      <form className=" w-full flex flex-col">
        <label htmlFor="tag" className="text-purple-800 opacity-80">
          Write a new tag
        </label>
        <input
          type="text"
          id="tag"
          className="border-[2px] border-purple-600 rounded-full"
          value={tagValue}
          onChange={(e) => setTagValue(e.target.value)}
        />
        <button className="bg-purple-800 text-fuchsia-50 mt-6 p-2 rounded-full">
          Save
        </button>
      </form>
    </div>
  );
};
