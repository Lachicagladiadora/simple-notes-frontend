import { useState } from "react";
import { signIn } from "../utils";

type SignInFormInput = {
  accessToken: string;
  refreshToken: string;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

export const SignInForm = ({
  setAuth,
  setAccessToken,
  setRefreshToken,
  setUserId,
}: SignInFormInput) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2">
      <h1 className="font-bold text-4xl capitalize text-purple-800 w-full">
        Sign In
      </h1>

      <form
        method="POST"
        action=""
        className="flex flex-col"
        onSubmit={(e) =>
          signIn({
            e: e,
            userData: {
              email: email,
              password: password,
            },
            setAuth: setAuth,
            setAccessToken: setAccessToken,
            setRefreshToken: setRefreshToken,
            setUserId: setUserId,
          })
        }
      >
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
        <button className="bg-violet-800 text-fuchsia-50 mt-6 p-2 rounded-full">
          Sign in
        </button>
      </form>
    </div>
  );
};
