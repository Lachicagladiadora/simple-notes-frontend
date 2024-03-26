import { useEffect, useState } from "react";
import { SignUpForm } from "./components/SignUpForm";
import { SignInForm } from "./components/SignInForm";

import { Note } from "./components/Note";
import { Searcher } from "./components/Searcher";
import { deleteNotes, getNotes, postNote, signOut } from "./utils";
// import { EditTag } from "./components/EditTag";
// import { EditNote } from "./components/EditNote";

// const NOTE_TEST =
// "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae mollitia sed incidunt accusantium ratione, sapiente nihil debitis doloremque modi laborum ducimus enim tempore voluptatibus dignissimos explicabo, soluta rem autem asperiores.";

export type NoteType = {
  name: string;
  tag: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
};

function App() {
  const [userId, setUserId] = useState("");
  const [auth, setAuth] = useState(false);
  const [displaySignInForm, setDisplaySignInForm] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [message, setMessage] = useState("");

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
    name: " consectetur adipisicing elit. Possimus, labore perspiciatis voluptate cum omnis dolorum totam, neque, minima nostrum aspernatur officiis similique alias consequuntur inventore id tempore doloribus quasi adipisci.",
    tag: "atlas",
    user: userId,
  };

  console.log({ notes });
  // notes.filter((cur) => cur._id !== deleteNote);
  // const NOTES = ;
  // console.log({ NOTES });

  useEffect(() => {
    // postNote({newNote:newNote})
    getNotes({
      userId: "65f8b5218d9f703cff89e59b",
      setNotes: setNotes,
    });
  }, []);

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
              <button
                onClick={(e) =>
                  postNote({ e: e, newNote: newNote, setMessage: setMessage })
                }
              >
                new note
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
            setUserId={setUserId}
          />
        )}
        {displaySignInForm && !auth && (
          <SignInForm
            accessToken={accessToken}
            refreshToken={refreshToken}
            setAuth={setAuth}
            setAccessToken={setAccessToken}
            setRefreshToken={setRefreshToken}
            setUserId={setUserId}
          />
        )}
        {auth && <Searcher />}
        {auth && (
          <>
            <section className=" py-8 flex gap-8 flex-col items-center text-sm w-full justify-center">
              {notes.reverse().map((cur) => (
                <Note
                  key={cur._id}
                  content={cur.name}
                  tag={cur.tag}
                  onDelete={() =>
                    deleteNotes({ _id: cur._id, setMessage: setMessage })
                  }
                />
              ))}
            </section>
          </>
        )}
        <p
          className={`absolute bottom-5 text-lg text-red-600 font-bold transition-opacity bg-yellow-300  p-5 bg-opacity-70 rounded-3xl ${
            message ? "visible" : " hidden"
          }`}
        >
          {message}
        </p>
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
