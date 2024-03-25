// type Options = {
//   headers?: { refreshToken?: string };
//   body: AutomaticSignInInput | null;
// }
// const options = {
//   headers: string,
//   body,
// };
//  todo: modificar el tipado generico para que se asigne debidamente el header
// export const POST_SIGN_IN = async <R, P>(
//   url: string,
//   { body, headers }: P
// ): Promise<R> => {
//   const res = await fetch(url, {
//     method: "POST",
//     body: JSON.stringify(body),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//       Authorization: `Bearer ${headers}`,
//     },
//   });
//   const data = res.json();
//   return data;
// };

export const POST = async <R, P>(url: string, body?: P): Promise<R> => {
  const tokens = localStorage.getItem("Tokens Data");
  const accessToken = tokens ? JSON.parse(tokens).accessToken : "";
  // return accessToken;

  console.log({ body });
  console.log({ url });
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      ...(accessToken && { authorization: `Bearer ${accessToken}` }),
    },
  });
  console.log({ res });
  const data = res.json();
  console.log({ data });
  return data;
};

export const GET = async <R>(url: string): Promise<R> => {
  const tokens = localStorage.getItem("Tokens Data");
  const accessToken = tokens ? JSON.parse(tokens).accessToken : "";

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      ...(accessToken && { authorization: `Bearer ${accessToken}` }),
    },
  });
  const data = await res.json();
  return data;
};

export const PUT = async <R, P>(url: string, body: P): Promise<R> => {
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  const data = await res.json();
  return data;
};

export const DELETE = async <R>(url: string): Promise<R> => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
