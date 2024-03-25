import { useEffect, useId, useState } from "react";
import { SignUpForm } from "./components/SignUpForm";
import { SignInForm } from "./components/SignInForm";

import { Note } from "./components/Note";
import { Searcher } from "./components/Searcher";
import { getNotes, postNote, signOut } from "./utils";
// import { EditTag } from "./components/EditTag";
// import { EditNote } from "./components/EditNote";

const NOTE_TEST =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae mollitia sed incidunt accusantium ratione, sapiente nihil debitis doloremque modi laborum ducimus enim tempore voluptatibus dignissimos explicabo, soluta rem autem asperiores.";

export type NoteType = {
  name: string;
  tag: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
};

function App() {
  // const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);
  const [displaySignInForm, setDisplaySignInForm] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [notes, setNotes] = useState<NoteType[]>([]);

  console.log({ auth });
  console.log({ notes });

  const signInDisplay = !auth && displaySignInForm ? "Sign up" : "Sign in";

  // useEffect(() => {
  //   const tokensData = localStorage.getItem("Tokens Data");
  //   if (tokensData === null) return;
  //   const tokens = JSON.parse(tokensData);
  //   console.log("get 1", { tokensData });
  //   setRefreshToken(tokens.refreshToken);
  //   setAccessToken(tokens.accessToken);
  //   console.log("get 2", localStorage.getItem("Tokens Data"));
  // }, [setAccessToken, setRefreshToken]);

  console.log({ refreshToken }, { accessToken });
  useEffect(() => {
    const tokensData = localStorage.getItem("Tokens Data");

    if (tokensData === null) {
      const updateTokensData = {
        refreshToken: refreshToken,
        accessToken: accessToken,
      };
      console.log("set 1", { tokensData });
      localStorage.setItem("Tokens Data", JSON.stringify(updateTokensData));
      console.log("set 2", localStorage.getItem("Tokens Data"));
    }

    if (tokensData !== null) {
      const tokens = JSON.parse(tokensData);
      setRefreshToken(tokens.refreshToken);
      setAccessToken(tokens.accessToken);
      setAuth(true);
    }
  }, [accessToken, refreshToken]);

  const newNote = {
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, labore perspiciatis voluptate cum omnis dolorum totam, neque, minima nostrum aspernatur officiis similique alias consequuntur inventore id tempore doloribus quasi adipisci.",
    tag: "Books",
    user: "65f8b5218d9f703cff89e59b",
  };
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
                  signOut();
                  setDisplaySignInForm((prev) => !prev);
                }}
              >
                {auth ? "Sign out" : signInDisplay}
              </button>
            </li>
            <li>
              <button onClick={(e) => postNote({ e: e, newNote: newNote })}>
                new note
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  getNotes({
                    userId: "65f8b5218d9f703cff89e59b",
                    setNotes: setNotes,
                  })
                }
              >
                get notes
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
              {notes.map((cur) => (
                <Note content={cur.name} tag={cur.tag} />
              ))}
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default App;

// type InitialTagsType = [
//   {
//     userId: string;
//     tagName: string;
//     notes: [
//       {
//         userId: string;
//         tagName: string;
//         note: string;
//       }
//     ];
//   }
// ];

// const INITIAL_TAGS: InitialTagsType = [
//   {
//     userId: "65f8b5218d9f703cff89e59b",
//     tagName: "books",
//     notes: [
//       {
//         userId: "65f8b5218d9f703cff89e59b",
//         tagName: "books",
//         note: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae mollitia sed incidunt accusantium ratione, sapiente nihil debitis doloremque modi laborum ducimus enim tempore voluptatibus dignissimos explicabo, soluta rem autem asperiores.",
//       },
//     ],
//   },
// ];
