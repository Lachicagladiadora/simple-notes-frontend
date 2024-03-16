import { useState } from "react";
import { createAccount } from "../utils";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserNAme] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReview, setPasswordReview] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

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
      </form>
    </div>
  );
};
