import { useCallback, useEffect, useState } from "react";
import { deleteNotes, getNotes, getTags, signOut } from "./utils";

import { SignUpForm } from "./components/SignUpForm";
import { SignInForm } from "./components/SignInForm";
import { Note } from "./components/Note";
import { Searcher } from "./components/Searcher";
import { NewTagForm } from "./components/NewTagForm";
import { NewNoteForm } from "./components/NewNoteForm";
import { UpdateNoteForm } from "./components/UpdateNoteForm";

export type NoteType = {
  name: string;
  tag: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
};

export type TagType = {
  createdAt: string;
  name: string;
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
  const [tags, setTags] = useState<TagType[]>([]);
  const [message, setMessage] = useState("");
  const [displayPostNoteForm, setDisplayPostNoteForm] = useState(false);
  const [displayPostTagForm, setDisplayPostTagForm] = useState(false);
  const [displayUpdateNoteForm, setDisplayUpdateNoteForm] = useState(false);
  const [displayAllTags, setDisplayAllTags] = useState(false);

  console.log({ auth });
  console.log({ notes });

  const signInDisplay = !auth && displaySignInForm ? "Sign up" : "Sign in";

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
          </ul>
        </section>
      </header>
      <main className="w-full py-12 flex flex-col justify-center items-center">
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
            <section className="w-full flex flex-col justify-center items-center">
              <ul className="flex items-center gap-10">
                <li>
                  <button
                    onClick={() => {
                      getTags({ userId: userId, setTags: setTags });
                      setDisplayAllTags((prev) => !prev);
                    }}
                  >
                    Get Tags
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`border-[2px] py-1 px-2 rounded-full  border-violet-700 hover:bg-violet-600 hover:text-neutral-50 ${
                      displayPostTagForm && !displayPostNoteForm
                        ? "text-neutral-50 bg-violet-600"
                        : "border-violet-700 text-violet-700"
                    }`}
                    onClick={() => {
                      setDisplayPostTagForm((prev) => !prev);
                      setDisplayPostNoteForm(false);
                    }}
                  >
                    New tag
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`border-[2px] border-violet-700 rounded-full py-1 px-2 hover:bg-violet-600 hover:text-neutral-50 ${
                      displayPostNoteForm && !displayPostTagForm
                        ? "text-neutral-50 bg-violet-600"
                        : "border-violet-700 text-violet-700"
                    }`}
                    onClick={() => {
                      setDisplayPostNoteForm((prev) => !prev);
                      setDisplayPostTagForm(false);
                    }}
                  >
                    New note
                  </button>
                </li>
              </ul>
              {/* <div className="w-full"> */}
              {displayPostTagForm && !displayPostNoteForm && (
                <NewTagForm
                  userId={userId}
                  setMessage={setMessage}
                  setDisplayPostTagForm={setDisplayPostTagForm}
                />
              )}
              {!displayPostTagForm && displayPostNoteForm && (
                <NewNoteForm
                  userId={userId}
                  setMessage={setMessage}
                  setDisplayNoteForm={setDisplayPostNoteForm}
                  getNotes={allNotes}
                />
              )}
              {/* </div> */}
            </section>
            <section className=" py-8 flex gap-8 flex-col items-center text-sm w-full justify-center">
              {!displayAllTags &&
                notes.reverse().map((cur) => (
                  <>
                    <Note
                      key={cur._id}
                      content={cur.name}
                      tag={cur.tag}
                      updateNote={() => setDisplayUpdateNoteForm(true)}
                      onDelete={() => {
                        console.log(cur);
                        deleteNotes({
                          noteId: cur._id,
                          setMessage: setMessage,
                        });
                      }}
                      getNotes={allNotes}
                    />
                    {displayUpdateNoteForm && (
                      <UpdateNoteForm
                        noteId={cur._id}
                        initialTag={cur.tag}
                        initialNote={cur.name}
                        setDisplayUpdateNoteForm={setDisplayUpdateNoteForm}
                        getNotes={allNotes}
                        setMessage={setMessage}
                      />
                    )}
                  </>
                ))}
              {displayAllTags &&
                tags.map((cur) => (
                  <>
                    <ul className="border border-red-600">
                      <li key={cur._id}>{cur.name}</li>
                    </ul>
                  </>
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
