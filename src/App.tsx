import { useCallback, useEffect, useState } from "react";
import { deleteNotes, deleteTag, getNotes, getTags, signOut } from "./utils";

import { SignUpForm } from "./components/SignUpForm";
import { SignInForm } from "./components/SignInForm";
import { Searcher } from "./components/Searcher";

import { Note } from "./components/Note";
import { NewNoteForm } from "./components/NewNoteForm";
import { UpdateNoteForm } from "./components/UpdateNoteForm";

import { Tag } from "./components/Tag";
import { NewTagForm } from "./components/NewTagForm";
import { UpdateTagForm } from "./components/UpdateTagForm";

export type NoteData = {
  name: string;
  tag: string;
  updatedAt: string;
  user: string;
  _id: string;
};

export type TagData = {
  createdAt: string;
  name: string;
  updatedAt: string;
  user: string;
  _id: string;
};

function App() {
  const [userId, setUserId] = useState("");
  const [auth, setAuth] = useState(false);
  const [displaySignInForm, setDisplaySignInForm] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [tags, setTags] = useState<TagData[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [displayPostNoteForm, setDisplayPostNoteForm] = useState(false);
  const [displayPostTagForm, setDisplayPostTagForm] = useState(false);
  const [displayAllTags, setDisplayAllTags] = useState(false);
  const [displayAllNotes, setDisplayAllNotes] = useState(true);
  const [selectedNote, setSelectedNote] = useState<NoteData | null>(null);
  const [selectedTag, setSelectedTag] = useState<TagData | null>(null);

  const signInDisplay = !auth && displaySignInForm ? "Sign up" : "Sign in";

  useEffect(() => {
    const tokensData = localStorage.getItem("Tokens Data");

    if (tokensData === null) {
      const updateTokensData = {
        refreshToken: refreshToken,
        accessToken: accessToken,
      };
      localStorage.setItem("Tokens Data", JSON.stringify(updateTokensData));
      setAuth(false);
    }

    if (tokensData !== null) {
      const tokens = JSON.parse(tokensData);
      setRefreshToken(tokens.refreshToken);
      setAccessToken(tokens.accessToken);
    }
  }, [accessToken, refreshToken]);

  const onSuccessNote = () => {
    setSelectedNote(null);
    getAllNotes();
  };

  const onSuccessTag = () => {
    setSelectedTag(null);
  };

  setTimeout(() => {
    setMessage(null);
  }, 1000);

  const getAllNotes = useCallback(() => {
    getNotes({ userId: userId, setNotes: setNotes });
  }, [userId]);

  const getAllTags = useCallback(() => {
    getTags({ userId: userId, setTags: setTags });
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    getNotes({ userId: userId, setNotes: setNotes });
    getTags({ userId: userId, setTags: setTags });
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
        {auth && <Searcher tags={tags} notes={notes} />}
        {auth && (
          <>
            <section className="w-full flex flex-col justify-center items-center">
              <ul className="flex items-center gap-10">
                <li>
                  <button
                    type="button"
                    className={`border-[2px] py-1 px-2 rounded-full  border-violet-700 hover:bg-violet-600 hover:text-neutral-50 ${
                      displayAllNotes && !displayAllTags
                        ? "text-neutral-50 bg-violet-600"
                        : "border-violet-700 text-violet-700"
                    }`}
                    onClick={() => {
                      getAllNotes();
                      setDisplayAllNotes(true);
                      setDisplayAllTags(false);
                      setDisplayPostNoteForm(false);
                      setDisplayPostTagForm(false);
                    }}
                  >
                    Notes
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`border-[2px] py-1 px-2 rounded-full  border-violet-700 hover:bg-violet-600 hover:text-neutral-50 ${
                      !displayAllNotes && displayAllTags
                        ? "text-neutral-50 bg-violet-600"
                        : "border-violet-700 text-violet-700"
                    }`}
                    onClick={() => {
                      getAllTags();
                      setDisplayAllTags(true);
                      setDisplayAllNotes(false);
                      setDisplayPostNoteForm(false);
                      setDisplayPostTagForm(false);
                    }}
                  >
                    Tags
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
                      setDisplayPostTagForm(true);
                      setDisplayPostNoteForm(false);
                      setDisplayAllNotes(false);
                      setDisplayAllTags(false);
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
                      setDisplayPostNoteForm(true);
                      setDisplayPostTagForm(false);
                      setDisplayAllNotes(false);
                      setDisplayAllTags(false);
                    }}
                  >
                    New note
                  </button>
                </li>
              </ul>
            </section>
            <section className=" py-8 flex gap-8 flex-col items-center text-sm w-full justify-center">
              {!displayAllTags &&
                !displayAllNotes &&
                displayPostTagForm &&
                !displayPostNoteForm && (
                  <NewTagForm
                    userId={userId}
                    getAllTags={getAllTags}
                    setMessage={setMessage}
                    setDisplayPostTagForm={setDisplayPostTagForm}
                    setDisplayAllTags={setDisplayAllTags}
                  />
                )}
              {!displayAllTags &&
                !displayAllNotes &&
                !displayPostTagForm &&
                displayPostNoteForm && (
                  <NewNoteForm
                    userId={userId}
                    tags={tags}
                    getAllNotes={getAllNotes}
                    setMessage={setMessage}
                    setDisplayNoteForm={setDisplayPostNoteForm}
                    setDisplayAllNotes={setDisplayAllNotes}
                  />
                )}
              {displayAllNotes &&
                !displayAllTags &&
                !displayPostNoteForm &&
                !displayPostTagForm &&
                notes.map((cur) => (
                  <>
                    <Note
                      key={cur._id}
                      note={cur}
                      tags={tags}
                      setSelectedNote={setSelectedNote}
                      onDelete={() => {
                        deleteNotes({
                          noteId: cur._id,
                          setMessage: setMessage,
                        });
                      }}
                      getNotes={getAllNotes}
                    />
                    {selectedNote && (
                      <UpdateNoteForm
                        note={selectedNote}
                        tags={tags}
                        onSuccess={onSuccessNote}
                        setMessage={setMessage}
                      />
                    )}
                  </>
                ))}
              {displayAllTags &&
                !displayAllNotes &&
                !displayPostNoteForm &&
                !displayPostTagForm &&
                tags.map((cur) => (
                  <>
                    <Tag
                      key={cur._id}
                      tag={cur}
                      setSelectedTag={setSelectedTag}
                      onDeleteTag={() => {
                        deleteTag({ tagId: cur._id, setMessage: setMessage });
                      }}
                      getTags={getAllTags}
                    />
                    {selectedTag && (
                      <UpdateTagForm
                        tag={selectedTag}
                        onSuccess={onSuccessTag}
                        getTags={() =>
                          getTags({ userId: cur.user, setTags: setTags })
                        }
                        setMessage={setMessage}
                      />
                    )}
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
