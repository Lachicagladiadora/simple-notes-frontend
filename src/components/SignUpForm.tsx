import { useState } from "react";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const form = { email: email, password: password };

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
        <button
          className="bg-violet-800 text-fuchsia-50 mt-6 p-2 rounded-full"
          type="submit"
          // onClick={() => POST("/api/v1/auth/sign-up", JSON.stringify(form))}
          // onSubmit={(e) => createAccount(e)}
        >
          create account
        </button>
      </form>
    </div>
  );
};

const createAccount = (e: React.FormEvent<HTMLButtonElement>) => {
  console.log("create account", { e });
  e.preventDefault();
  // POST("/api/v1/auth/sign-up");
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
