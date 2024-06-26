import { NoteData, TagData } from "./App";
import { DELETE, GET, POST, PUT } from "./fetch.utils";

// SIGN UP
type UserDataType = {
  email: string;
  username: string;
  password: string;
};

type CreateAccountInput = {
  e: React.FormEvent<HTMLFormElement>;
  userData: UserDataType;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

type ResponseDataType = { message: string } | string;

// automatic sing in types
type AutomaticSignInInput = {
  email: string;
  password: string;
};

type AutomaticSignInOutput = {
  accessToken: string;
  auth: boolean;
  message: string;
  refreshToken: string;
  user: string;
};

export const createAccount = async ({
  e,
  userData,
  setAuth,
  setAccessToken,
  setRefreshToken,
  setUserId,
}: CreateAccountInput) => {
  e.preventDefault();
  try {
    if (!userData.email || !userData.username || !userData.password)
      return console.log("userData is null");

    const response: ResponseDataType = await POST(
      "http://localhost:4000/api/v1/auth/sign-up",
      userData
    );
    console.log("create account", { response });

    const responseSignInAutomatic = await POST<
      AutomaticSignInOutput,
      AutomaticSignInInput
    >("http://localhost:4000/api/v1/auth/sign-in", {
      email: userData?.email,
      password: userData?.password,
    });

    const updateTokensData = {
      refreshToken: responseSignInAutomatic.refreshToken,
      accessToken: responseSignInAutomatic.accessToken,
    };
    localStorage.setItem("Tokens Data", JSON.stringify(updateTokensData));

    setAccessToken(responseSignInAutomatic.accessToken);
    setRefreshToken(responseSignInAutomatic.refreshToken);
    setAuth(responseSignInAutomatic.auth);
    setUserId(responseSignInAutomatic.user);
  } catch (error) {
    console.log("create account", { error });
  }
};

// SIGN IN
type SignInInput = {
  e: React.FormEvent<HTMLFormElement>;
  userData: AutomaticSignInInput;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

type SignInOutput = AutomaticSignInOutput;

type ResponseSignIn = AutomaticSignInOutput;

export const signIn = async ({
  e,
  userData,
  setAuth,
  setAccessToken,
  setRefreshToken,
  setUserId,
}: SignInInput) => {
  e.preventDefault();
  try {
    const responseSignIn: ResponseSignIn = await POST<
      SignInOutput,
      AutomaticSignInInput
    >("http://localhost:4000/api/v1/auth/sign-in", userData);
    console.log({ responseSignIn });
    if (!responseSignIn.auth) return setAuth(false); // todo: display error message

    const updateTokensData = {
      refreshToken: responseSignIn.refreshToken,
      accessToken: responseSignIn.accessToken,
    };
    localStorage.setItem("Tokens Data", JSON.stringify(updateTokensData));

    setAccessToken(responseSignIn.accessToken);
    setRefreshToken(responseSignIn.refreshToken);
    setAuth(responseSignIn.auth);
    setUserId(responseSignIn.user);
  } catch (error) {
    console.log("sign in", { error });
  }
};

// SIGN OUT
export const signOut = async () => {
  try {
    const response: ResponseDataType = await POST(
      "http://localhost:4000/api/v1/auth/sign-off/"
    );
    console.log("sign Out", { response });
  } catch (error) {
    console.log("sign out", { error });
  }
};

// TAGS
export type NewTagType = { name: string; user: string };

type PostTagInput = {
  e: React.FormEvent<HTMLFormElement>;
  newTag: NewTagType;
  // userId: string;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const postTag = async ({ e, newTag, setMessage }: PostTagInput) => {
  try {
    e.preventDefault();
    console.log("postTag");
    const response: ResponseDataType = await POST<string, NewTagType>(
      "http://localhost:4000/api/v1/tag",
      newTag
    );
    console.log("post tag response", { response });
    setMessage(response);
  } catch (error) {
    console.log("post tag error", { error });
  }
};

type GetTagsInput = {
  userId: string;
  setTags: React.Dispatch<React.SetStateAction<TagData[]>>;
};

export const getTags = async ({ userId, setTags }: GetTagsInput) => {
  console.log("getTag");
  try {
    const response = await GET<TagData[]>(
      `http://localhost:4000/api/v1/tag/user/${userId}`
    );
    setTags(response);
    console.log("gat tags", { response });
  } catch (error) {
    console.log("get tags", { error });
  }
};

type UpdateTag = { name: string; user: string };

type UpdateTagInput = {
  tagId: string | null;
  body: UpdateTag;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

// type ErrorType = { message: string; stack: string };

export const updateTag = async ({
  tagId,
  body,
  setMessage,
}: UpdateTagInput) => {
  try {
    console.log("updateTag");
    const response = await PUT<string, UpdateTag>(
      `http://localhost:4000/api/v1/tag/${tagId}`,
      body
    );
    console.log("", { response });
    setMessage(response);
  } catch (error) {
    console.log("update tag", { error });
    // setMessage(error.message);
  }
};

type DeleteTagInput = {
  tagId: string;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const deleteTag = async ({ tagId, setMessage }: DeleteTagInput) => {
  console.log("deleteTag");
  try {
    const response = await DELETE<string>(
      `http://localhost:4000/api/v1/tag/${tagId}`
    );
    setMessage(response);
    console.log("delete tag", { response });
  } catch (error) {
    console.log("delete tag", { error });
  }
};

// NOTES
export type NewNoteType = {
  name: string;
  tag: string | null;
  user: string;
};

type PostNoteInput = {
  e: React.FormEvent<HTMLFormElement>;
  newNote: NewNoteType;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const postNote = async ({ e, newNote, setMessage }: PostNoteInput) => {
  e.preventDefault();
  try {
    const responseNote = await POST<string, NewNoteType>(
      "http://localhost:4000/api/v1/note",
      newNote
    );
    console.log({ responseNote });
    setMessage(responseNote);
  } catch (error) {
    console.log("post note ", { error });
    // setMessage(error.message);
  }
};

type GetNotesInput = {
  userId: string;
  setNotes: React.Dispatch<React.SetStateAction<NoteData[]>>;
};

export const getNotes = async ({ userId, setNotes }: GetNotesInput) => {
  try {
    const response = await GET<NoteData[]>(
      `http://localhost:4000/api/v1/note/user/${userId}`
    );
    setNotes(response);
  } catch (error) {
    console.log("get notes", { error });
  }
};

type UpdateNoteType = { name: string; tag: string };

type UpdateNotesInput = {
  e: React.FormEvent<HTMLFormElement>;
  noteId: string | null;
  editNote: UpdateNoteType;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const updateNotes = async ({
  e,
  noteId,
  editNote,
  setMessage,
}: UpdateNotesInput) => {
  e.preventDefault();
  try {
    const response = await PUT<string, UpdateNoteType>(
      `http://localhost:4000/api/v1/note/${noteId}`,
      editNote
    );
    setMessage(response);
    console.log("edit note", { response });
  } catch (error) {
    console.log("update note", { error });
  }
};

type DeleteNotesInput = {
  noteId: string;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const deleteNotes = async ({ noteId, setMessage }: DeleteNotesInput) => {
  try {
    console.log("deleteNotes");
    const response = await DELETE<string>(
      `http://localhost:4000/api/v1/note/${noteId}`
    );
    setMessage(response);
  } catch (error) {
    console.log(`delete note${noteId}`, { error });
  }
};
