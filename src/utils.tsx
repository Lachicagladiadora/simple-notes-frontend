import { POST } from "./fetch.utils";

// SIGN UP
type UserDataType = {
  email: string;
  username: string;
  password: string;
};

type CreateAccountInput = {
  e: React.FormEvent<HTMLFormElement>;
  // headers: string;
  userData: UserDataType;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
};
// todo: pasar el token y ver que responde

type ResponseDataType = { message: string } | string;

// sing in types
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
  setAccessToken,
  setRefreshToken,
}: CreateAccountInput) => {
  // console.log("hello 1");
  e.preventDefault();

  if (!userData.email || !userData.username || !userData.password)
    return console.log("userData is null");

  // console.log("hello 2");
  const response: ResponseDataType = await POST(
    "http://localhost:4000/api/v1/auth/sign-up",
    // headers: {},
    userData
  );

  console.log({ response });

  const responseSignInAutomatic = await POST<
    AutomaticSignInOutput,
    AutomaticSignInInput
  >("http://localhost:4000/api/v1/auth/sign-in", {
    email: userData?.email,
    password: userData?.password,
  });
  const idUser = responseSignInAutomatic.user;
  console.log({ idUser });
  // console.log("user ID", responseSignIn.user);
  // return responseSignIn;
  setAccessToken(responseSignInAutomatic.accessToken);
  setRefreshToken(responseSignInAutomatic.refreshToken);

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
type SignInInput = {
  e: React.FormEvent<HTMLFormElement>;
  userData: AutomaticSignInInput | null;
  refreshToken: string;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
};

type SignInOutput = AutomaticSignInOutput;

type ResponseSignIn = AutomaticSignInOutput;

type SignInOptions = {
  headers?: { refreshToken?: string };
  body: AutomaticSignInInput | null;
};

export const signIn = async ({
  e,
  userData,
  // accessToken,
  refreshToken,
  setAccessToken,
  setRefreshToken,
}: // setRefreshToken,
SignInInput) => {
  e.preventDefault();
  const responseSignIn: ResponseSignIn = await POST<
    SignInOutput,
    SignInOptions
  >("http://localhost:4000/api/v1/auth/sign-in", {
    body: userData,
    headers: { refreshToken: refreshToken },
  });
  console.log({ responseSignIn });
  // const responseObject = responseSignIn.accessToken;
  // console.log(responseObject);
  setAccessToken(responseSignIn.accessToken);
  setRefreshToken(responseSignIn.refreshToken);
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
