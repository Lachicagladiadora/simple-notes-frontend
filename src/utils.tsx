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
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
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
  setAuth,
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
  setAuth(responseSignInAutomatic.auth);
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
  userData: AutomaticSignInInput;
  accessToken: string;
  refreshToken: string;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
};

type SignInOutput = AutomaticSignInOutput;

type ResponseSignIn = AutomaticSignInOutput;

// type SignInOptions = {
//   // headers?: string;
//   body: AutomaticSignInInput
// };

export const signIn = async ({
  e,
  userData,
  // accessToken,
  // refreshToken,
  setAuth,
  setAccessToken,
  setRefreshToken,
}: // setRefreshToken,
SignInInput) => {
  e.preventDefault();
  // if(userData)
  const responseSignIn: ResponseSignIn = await POST<
    SignInOutput,
    AutomaticSignInInput
  >("http://localhost:4000/api/v1/auth/sign-in", userData);
  console.log({ responseSignIn });
  if (!responseSignIn.auth) return setAuth(false); // todo: display error message
  setAccessToken(responseSignIn.accessToken);
  setRefreshToken(responseSignIn.refreshToken);
  setAuth(responseSignIn.auth);
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
