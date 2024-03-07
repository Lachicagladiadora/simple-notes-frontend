import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export const Searcher = () => {
  return (
    <section className=" py-8 flex gap-3 items-center text-sm w-3/4 justify-center">
      <input
        className="border-2 border-fuchsia-950 rounded-full flex-1 py-2 px-4 text-violet-500 font-bold"
        placeholder="Search"
      ></input>
      <button className="p-1 rounded-full border-2 border-fuchsia-950">
        <MagnifyingGlassIcon className="h-6 w-6 text-fuchsia-950" />
      </button>
    </section>
  );
};
