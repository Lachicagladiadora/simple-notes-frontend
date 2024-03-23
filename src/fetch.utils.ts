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
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      // Authorization: `Bearer ${body}`,
    },
  });
  const data = res.json();
  return data;
};

export const GET = async <R>(url: string): Promise<R> => {
  const res = await fetch(url);
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
