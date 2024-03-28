import { useCallback, useEffect, useState } from "react";
import { SignUpForm } from "./components/SignUpForm";
import { SignInForm } from "./components/SignInForm";

import { Note } from "./components/Note";
import { Searcher } from "./components/Searcher";
import { deleteNotes, getNotes, postNote, signOut, updateNotes } from "./utils";
import { NewTagForm } from "./components/NewTagForm";
import { NewNoteForm } from "./components/NewNoteForm";

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
  const [displayNoteForm, setDisplayNoteForm] = useState(false);
  const [displayTagForm, setDisplayTagForm] = useState(false);
  const [tagValue, setTagValue] = useState("");

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
      setAuth(false);
    }

    if (tokensData !== null) {
      const tokens = JSON.parse(tokensData);
      setRefreshToken(tokens.refreshToken);
      setAccessToken(tokens.accessToken);
      // setAuth(true);
    }
  }, [accessToken, refreshToken]);

  console.log({ notes });

  const allNotes = useCallback(() => {
    getNotes({ userId: userId, setNotes: setNotes });
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    getNotes({ userId: userId, setNotes: setNotes });
  }, [userId]);

  const name =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem explicabo molestiae soluta obcaecati autem excepturi iusto ratione aperiam blanditiis aliquid. Omnis quos esse dolore repudiandae repellat! Veniam ea ad quod! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem explicabo molestiae soluta obcaecati autem excepturi iusto ratione aperiam blanditiis aliquid. Omnis quos esse dolore repudiandae repellat! Veniam ea ad quod!";
  const updateNote = { name: name, tag: "Superman" };
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
            <section>
              <ul className="flex items-center gap-10">
                <li>
                  <button
                    type="button"
                    className={`border-[2px] py-1 px-2 rounded-full  border-violet-700 hover:bg-violet-600 hover:text-neutral-50 ${
                      displayTagForm && !displayNoteForm
                        ? "text-neutral-50 bg-violet-600"
                        : "border-violet-700 text-violet-700"
                    }`}
                    onClick={() => {
                      setDisplayTagForm((prev) => !prev);
                      setDisplayNoteForm(false);
                    }}
                  >
                    New tag
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`border-[2px] border-violet-700 rounded-full py-1 px-2 hover:bg-violet-600 hover:text-neutral-50 ${
                      displayNoteForm && !displayTagForm
                        ? "text-neutral-50 bg-violet-600"
                        : "border-violet-700 text-violet-700"
                    }`}
                    onClick={() => {
                      setDisplayNoteForm((prev) => !prev);
                      setDisplayTagForm(false);
                    }}
                  >
                    New note
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={(e) => {
                      updateNotes({
                        e: e,
                        noteId: "660231a8e25d579b91df9284",
                        editNote: updateNote,
                      });
                      allNotes();
                    }}
                  >
                    edit note "Atlas"
                  </button>
                </li>
                {/* <li><button type="button">New tag</button></li> */}
              </ul>
              {displayTagForm && !displayNoteForm && <NewTagForm />}
              {!displayTagForm && displayNoteForm && (
                <NewNoteForm
                  userId={userId}
                  tagValue={tagValue}
                  setTagValue={setTagValue}
                  setMessage={setMessage}
                  setDisplayNoteForm={setDisplayNoteForm}
                  getNotes={allNotes}
                />
              )}
            </section>
            <section className=" py-8 flex gap-8 flex-col items-center text-sm w-full justify-center">
              {notes.reverse().map((cur) => (
                <Note
                  key={cur._id}
                  content={cur.name}
                  tag={cur.tag}
                  onDelete={() => {
                    console.log(cur);
                    deleteNotes({ noteId: cur._id, setMessage: setMessage });
                  }}
                  getNotes={allNotes}
                />
              ))}
            </section>
          </>
        )}
        <p
          className={`fixed bottom-5 text-lg text-red-600 font-bold transition-opacity bg-yellow-300  p-5 bg-opacity-70 rounded-3xl ${
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
