import { useState } from "react";

type UserDataType = {
  emailUser: string;
  userNameU: string;
  passwordUser: string;
};

// const dataForm = { email: email, userName: userName, password: password };

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserNAme] = useState("");
  const [password, setPassword] = useState("");
  const [passwordReview, setPasswordReview] = useState("");

  return (
    <div className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2">
      <h1 className="font-bold text-4xl capitalize text-purple-800 w-full">
        Sign Up
      </h1>

      <form method="POST" action="" className="flex flex-col">
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

        <label htmlFor="userName" className="py-2  text-purple-800">
          Username
        </label>
        <input
          id="userName"
          type="email"
          required
          value={userName}
          onChange={(e) => setUserNAme(() => e.target.value)}
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
        <button
          className="bg-violet-800 text-fuchsia-50 mt-6 p-2 rounded-full"
          type="submit"
          onSubmit={(e) =>
            createAccount({
              e: e,
              userData: {
                emailUser: email,
                userNameU: userName,
                passwordUser: password,
              },
            })
          }
        >
          Create account
        </button>
      </form>
    </div>
  );
};

type CreateAccountProps = {
  e: React.FormEvent<HTMLButtonElement>;
  userData: UserDataType | null;
};
const createAccount = async ({ e, userData }: CreateAccountProps) => {
  if (userData === null) console.log("userData is null");

  e.preventDefault();
  const response = await POST(
    "http://localhost:4000/api/v1/auth/sign-up",
    userData
  );
  console.log({ response });
};

const POST = async <R, P>(url: string, body: P): Promise<R> => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  const data = res.json();
  return data;
};

// const

// POST: /api/v1/auth/sign-up
// POST: /api/v1/auth/sign-in
