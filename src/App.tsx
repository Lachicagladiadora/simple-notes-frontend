import { useState } from "react";
import { SignUpForm } from "./components/SignUpForm";
import { SignInForm } from "./components/SignInForm";

import { Note } from "./components/Note";
import { Searcher } from "./components/Searcher";
// import { EditTag } from "./components/EditTag";
// import { EditNote } from "./components/EditNote";

const NOTE_TEST =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae mollitia sed incidunt accusantium ratione, sapiente nihil debitis doloremque modi laborum ducimus enim tempore voluptatibus dignissimos explicabo, soluta rem autem asperiores.";

function App() {
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);
  const [displaySignInForm, setDisplaySignInForm] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

  console.log({ auth });

  const signInDisplay = !auth && displaySignInForm ? "Sign up" : "Sign in";

  return (
    <>
      <header className="w-full h-16 bg-purple-900 flex items-center justify-center capitalize text-pink-50 px-6">
        <h1 className="font-bold text-4xl font-serif flex-1">notes</h1>
        <section className="w-auto capitalize">
          <ul className="flex gap-4">
            <li>
              <button
                type="button"
                onClick={() => {
                  setAuth(false);
                  setDisplaySignInForm((prev) => !prev);
                }}
              >
                {auth ? "Sign out" : signInDisplay}
              </button>
            </li>
          </ul>
        </section>
      </header>
      <main className="py-12 flex flex-col justify-center items-center">
        {!displaySignInForm && !auth && (
          <SignUpForm
            accessToken={accessToken}
            refreshToken={refreshToken}
            setAuth={setAuth}
            setDisplaySignInForm={setDisplaySignInForm}
            setAccessToken={setAccessToken}
            setRefreshToken={setRefreshToken}
          />
        )}
        {displaySignInForm && !auth && (
          <SignInForm
            accessToken={accessToken}
            refreshToken={refreshToken}
            setAuth={setAuth}
            setAccessToken={setAccessToken}
            setRefreshToken={setRefreshToken}
          />
        )}
        {auth && <Searcher />}
        {auth && (
          <>
            {/* <div className="flex flex-col justify-center items-center">
              <EditTag />
              <EditNote />
            </div> */}
            <section className=" py-8 flex gap-8 flex-col items-center text-sm w-full justify-center">
              <Note content={NOTE_TEST + NOTE_TEST} tag="#fruit" />
              <Note content={NOTE_TEST} tag="#house" />
              <Note content={NOTE_TEST + NOTE_TEST} tag="#book" />
              <Note content={NOTE_TEST} tag="#health" />
              <Note content={NOTE_TEST + NOTE_TEST} tag="#study" />
              <Note content={NOTE_TEST} tag="#fruit" />
              <Note content={NOTE_TEST + NOTE_TEST} tag="#book" />
              {/* {INITIAL_TAGS.filter((tag) => tag.userId === user)} */}
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default App;

type InitialTagsType = [
  {
    userId: string;
    tagName: string;
    notes: [
      {
        userId: string;
        tagName: string;
        note: string;
      }
    ];
  }
];

const INITIAL_TAGS: InitialTagsType = [
  {
    userId: "65f8b5218d9f703cff89e59b",
    tagName: "books",
    notes: [
      {
        userId: "65f8b5218d9f703cff89e59b",
        tagName: "books",
        note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae mollitia sed incidunt accusantium ratione, sapiente nihil debitis doloremque modi laborum ducimus enim tempore voluptatibus dignissimos explicabo, soluta rem autem asperiores.",
      },
    ],
  },
];
