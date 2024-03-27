import { NoteType } from "./App";
import { DELETE, GET, POST } from "./fetch.utils";

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

  setAccessToken(responseSignInAutomatic.accessToken);
  setRefreshToken(responseSignInAutomatic.refreshToken);
  setAuth(responseSignInAutomatic.auth);
  setUserId(responseSignInAutomatic.user);
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
  const responseSignIn: ResponseSignIn = await POST<
    SignInOutput,
    AutomaticSignInInput
  >("http://localhost:4000/api/v1/auth/sign-in", userData);
  console.log({ responseSignIn });
  if (!responseSignIn.auth) return setAuth(false); // todo: display error message
  setAccessToken(responseSignIn.accessToken);
  setRefreshToken(responseSignIn.refreshToken);
  setAuth(responseSignIn.auth);
  setUserId(responseSignIn.user);
};

// SIGN OUT
export const signOut = async () => {
  const response: ResponseDataType = await POST(
    "http://localhost:4000/api/v1/auth/sign-off/"
  );
  console.log("sign Out", { response });
};

// TAGS
type PostTagInput = {
  e: React.FormEvent<HTMLButtonElement>;
  newTag: { userId: string; tag: string };
};

export const postTag = async ({ e, newTag }: PostTagInput) => {
  console.log("postTag");
  e.preventDefault();
  const response: ResponseDataType = await POST(
    "http://localhost:4000/api/v1/user/:user",
    newTag
  );
  console.log({ response });
};

export const getTag = () => {
  console.log("getTag");
  // e.preventDefault();
  // const response: ResponseDataType = await POST(
  //   "http://localhost:4000/api/v1/user/:user"
  // );
  // console.log({ response });
};

export const updateTag = () => {
  console.log("updateTag");
};

export const deleteTag = () => {
  console.log("deleteTag");
};

// NOTES
export type NewNoteType = {
  name: string;
  tag: string;
  user: string;
};

type PostNoteInput = {
  e: React.FormEvent<HTMLFormElement>;
  newNote: NewNoteType;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const postNote = async ({ e, newNote, setMessage }: PostNoteInput) => {
  try {
    e.preventDefault();
    const responseNote = await POST<string, NewNoteType>(
      "http://localhost:4000/api/v1/note",
      newNote
    );
    console.log({ responseNote });
    setMessage(responseNote);
  } catch (error) {
    console.log({ error });
  }
};

type GetNotesInput = {
  userId: string;
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
};

export const getNotes = async ({ userId, setNotes }: GetNotesInput) => {
  try {
    const response = await GET<NoteType[]>(
      `http://localhost:4000/api/v1/note/user/${userId}`
    );
    setNotes(response);
  } catch (error) {
    console.log({ error });
  }
};

export const updateNotes = () => {
  console.log("updateNotes");
};

type DeleteNotesInput = {
  _id: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};
export const deleteNotes = async ({ _id, setMessage }: DeleteNotesInput) => {
  try {
    console.log("deleteNotes");
    const response = await DELETE<string>(
      `http://localhost:4000/api/v1/note/${_id}`
    );
    setMessage(response);
  } catch (error) {
    console.log({ error });
  }
};
