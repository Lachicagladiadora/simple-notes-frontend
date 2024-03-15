import { POST } from "./fetch.utils";

type UserDataType = {
  email: string;
  username: string;
  password: string;
};

type SignInInput = {
  email: string;
  password: string;
};

type CreateAccountInput = {
  e: React.FormEvent<HTMLFormElement>;
  userData: UserDataType;
};

// SIGN UP
type ResponseDataType = { message: string } | string;

export const createAccount = async ({ e, userData }: CreateAccountInput) => {
  console.log("hello 1");
  e.preventDefault();

  if (!userData.email || !userData.username || !userData.password)
    return console.log("userData is null");

  console.log("hello 2");
  const response: ResponseDataType = await POST(
    "http://localhost:4000/api/v1/auth/sign-up",
    userData
  );
  console.log(response);
  const signIn = await POST<string, SignInInput>(
    "http://localhost:4000/api/v1/auth/sign-in",
    { email: userData?.email, password: userData?.password }
  );
  console.log(signIn);
  // try {
  //   // if (response === "user was created") console.log({ response });
  //   console.log("hello 3");
  //   // if (response === "Empty values, fill with correct values please!")
  //   // if (response === "Email exist, try another!") console.log(response);
  //   // if (response === "some error") console.log(response);
  // } catch (error) {
  //   console.log("hello 4");
  //   console.log(error);
  // }
};

// SIGN IN
type signInInput = {
  e: React.FormEvent<HTMLButtonElement>;
  userData: SignInInput | null;
};

export const signIn = async ({ e, userData }: signInInput) => {
  e.preventDefault();
  const response: ResponseDataType = await POST(
    "http://localhost:4000/api/v1/auth/sign-in",
    userData
  );
  console.log(response);
};

// SIGN OUT
type signOutProps = {
  e: React.FormEvent<HTMLButtonElement>;
  userData: UserDataType | null;
};

export const signOut = async ({ e, userData }: signOutProps) => {
  e.preventDefault();
  const response: ResponseDataType = await POST(
    "http://localhost:4000/api/v1/auth/sign-off/",
    userData
  );
  console.log({ response });
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
export const postNotes = () => {
  console.log("postNotes");
};
export const getNotes = () => {
  console.log("getNotes");
};
export const updateNotes = () => {
  console.log("updateNotes");
};
export const deleteNotes = () => {
  console.log("deleteNotes");
};

// todo: save token in local storage and access with token
