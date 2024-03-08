// import { SignInForm } from "./components/SignInForm";

import {
  DocumentTextIcon,
  PlusCircleIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
// import { Note } from "./components/Note";
import { Searcher } from "./components/Searcher";
import { ButtonForSection } from "./components/ButtonForSection";
import { EditTag } from "./components/EditTag";
import { EditNote } from "./components/EditNote";
import { SignUpForm } from "./components/SignUpForm";
import { SignInForm } from "./components/SignInForm";

// import { SignUpForm } from "./components/SignUpForm";

// const NOTE_TEST =
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae mollitia sed incidunt accusantium ratione, sapiente nihil debitis doloremque modi laborum ducimus enim tempore voluptatibus dignissimos explicabo, soluta rem autem asperiores.";

function App() {
  return (
    <>
      <header className="w-full h-16 bg-purple-900 flex items-center justify-center capitalize text-pink-50 px-6">
        <h1 className="font-bold text-4xl font-serif flex-1">notes</h1>
        <section className="w-auto capitalize">
          <ul className="flex gap-4">
            <li>Sign in</li>
          </ul>
        </section>
      </header>
      <main className="py-12 flex flex-col justify-center items-center">
        {/* <SignInForm /> */}
        {/* <SignUpForm /> */}
        <Searcher />
        <div className="w-full flex gap-4 justify-center">
          <ButtonForSection>
            <DocumentTextIcon className="h-6" />
            notes
          </ButtonForSection>
          <ButtonForSection>
            <PlusCircleIcon className="h-6" />
            new note
          </ButtonForSection>
          <ButtonForSection>
            <PlusCircleIcon className="h-6" />
            new tag
          </ButtonForSection>
          <ButtonForSection>
            <TagIcon className="h-6" />
            tags
          </ButtonForSection>

          {/* <button className="border py-1 px-2 rounded-full bg-purple-800 text-fuchsia-50 capitalize text-base flex gap-1 items-center justify-center hover:bg-fuchsia-50 hover:text-purple-800 hover:border-purple-800">
            <UserCircleIcon className="h-5" />
            profile
          </button> */}
        </div>
        <SignInForm />
        {/* <section className=" py-8 flex gap-8 flex-col items-center text-sm w-full justify-center">
          <Note content={NOTE_TEST + NOTE_TEST} tag="#fruit" />
          <Note content={NOTE_TEST} tag="#house" />
          <Note content={NOTE_TEST + NOTE_TEST} tag="#book" />
          <Note content={NOTE_TEST} tag="#health" />
          <Note content={NOTE_TEST + NOTE_TEST} tag="#study" />
          <Note content={NOTE_TEST} tag="#fruit" />
          <Note content={NOTE_TEST + NOTE_TEST} tag="#book" />
        </section> */}
        {/* <div className="flex flex-col justify-center items-center">
          <EditTag />
          <EditNote />
        </div> */}
      </main>
    </>
  );
}

export default App;
