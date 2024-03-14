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

type CreateAccountProps = {
  e: React.FormEvent<HTMLFormElement>;
  userData: UserDataType;
};

type ResponseDataType = { message: string } | string;

// SIGN UP
export const createAccount = async ({ e, userData }: CreateAccountProps) => {
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

type signInProps = {
  e: React.FormEvent<HTMLButtonElement>;
  userData: SignInInput | null;
};

// SIGN IN
export const signIn = async ({ e, userData }: signInProps) => {
  e.preventDefault();
  const response: ResponseDataType = await POST(
    "http://localhost:4000/api/v1/auth/sign-in",
    userData
  );
  console.log(response);
};

type signOutProps = {
  e: React.FormEvent<HTMLButtonElement>;
  userData: UserDataType | null;
};

// SIGN OUT
export const signOut = async ({ e, userData }: signOutProps) => {
  e.preventDefault();
  const response: ResponseDataType = await POST(
    "http://localhost:4000/api/v1/auth/sign-off/",
    userData
  );
  console.log({ response });
};

// TAGS

// NOTES

// todo: save token in local storage and access with token
