import { useEffect, useState } from "react";
import { createAccount } from "../utils";

type SignUpFormInput = {
  accessToken: string;
  refreshToken: string;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplaySignInForm: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
};

export const SignUpForm = ({
  accessToken,
  refreshToken,
  setAuth,
  setDisplaySignInForm,
  setAccessToken,
  setRefreshToken,
}: SignUpFormInput) => {
  const [email, setEmail] = useState("");
  const [userName, setUserNAme] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReview, setPasswordReview] = useState("");

  useEffect(() => {
    const tokensData = {
      ultimateRefreshToken: refreshToken,
      ultimateAccessToken: accessToken,
    };
    localStorage.setItem("Tokens Data", JSON.stringify(tokensData));
  }, [accessToken, refreshToken]);

  const changeDisplay = (
    setDisplaySignInForm: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setDisplaySignInForm(true);
  };

  return (
    <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2">
      <h1 className="font-bold text-4xl capitalize text-purple-800 w-full">
        Sign Up
      </h1>

      <form
        className="flex flex-col"
        onSubmit={(e) =>
          createAccount({
            e: e,
            userData: {
              email: email,
              username: userName,
              password: password,
            },
            setAuth,
            setRefreshToken,
            setAccessToken,
          })
        }
      >
        <label htmlFor="userName" className="py-2  text-purple-800">
          Username
        </label>
        <input
          id="userName"
          type="text"
          required
          value={userName}
          onChange={(e) => setUserNAme(() => e.target.value)}
          className="border-2 border-violet-800 py-1 px-4 rounded-md"
        />
        <label htmlFor="email" className="py-2  text-purple-800">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(() => e.target.value)}
          className="border-2 border-violet-800 py-1 px-4 rounded-md"
        />
        <label htmlFor="password" className="py-2  text-purple-800">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(() => e.target.value)}
          className="border-2 border-violet-800 py-1 px-4 rounded-md"
        />
        <label htmlFor="password-review" className="py-2  text-purple-800">
          Again write password
        </label>
        <input
          id="password-review"
          type="password"
          required
          value={passwordReview}
          onChange={(e) => setPasswordReview(() => e.target.value)}
          className="border-2 border-violet-800 py-1 px-4 rounded-md"
        />
        <button className="bg-violet-800 text-fuchsia-50 mt-6 p-2 rounded-full">
          Create account
        </button>
        <p className="inline text-center opacity-70 text-violet-800 pt-4">
          or sign in{" "}
          <button
            type="button"
            className="underline text-indigo-800 inline"
            onClick={() => changeDisplay(setDisplaySignInForm)}
          >
            here
          </button>
        </p>
      </form>
    </div>
  );
};
