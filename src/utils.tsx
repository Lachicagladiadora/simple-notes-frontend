import { POST } from "./fetch.utils";

type UserDataType = {
  emailUser: string;
  userNameU: string;
  passwordUser: string;
};

type CreateAccountProps = {
  e: React.FormEvent<HTMLButtonElement>;
  userData: UserDataType | null;
};

type ResponseDataType = { message: string } | any;

export const createAccount = async ({ e, userData }: CreateAccountProps) => {
  if (userData === null) console.log("userData is null");

  e.preventDefault();
  const response: ResponseDataType = await POST(
    "http://localhost:4000/api/v1/auth/sign-up",
    userData
  );
  try {
    console.log({ response });
    if (response.message === "Empty values, fill with correct values please!")
      console.log(response.message);
    if (response.message === "Email exist, try another!")
      console.log(response.message);
    if (response.message === "some error") console.log(response.message);
  } catch (error) {
    console.log(error);
  }
};
