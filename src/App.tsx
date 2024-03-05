import {
  // ClipboardDocumentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import {
  PencilIcon,
  TrashIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

function App() {
  return (
    <main className="py-12 flex flex-col justify-center items-center w-full h-screen bg-pink-50 bg-opacity-50">
      <h1 className="font-bold text-4xl capitalize text-purple-800">Sing Up</h1>
      {/* <div className=" py-8 flex gap-1 items-center text-sm w-3/4 justify-center">
        <input className="border-2 border-fuchsia-950 rounded-full flex-1 py-2 px-4 text-violet-500 font-bold"></input>
        <button>
          <MagnifyingGlassIcon className="h-8 w-8 text-fuchsia-950" />
        </button>
      </div>
      <div className="w-3/4 pt-10">
        <div className="relative bg-violet-300  p-4 rounded-3xl">
          <div className="absolute -right-3 -top-4 px-2 py-1 flex gap-2 bg-pink-100 rounded-full">
            <button>
              <PencilIcon className="h-6 w-6 text-fuchsia-950" />
            </button>
            <button>
              <TrashIcon className="h-6 w-6 text-fuchsia-950" />
            </button>
            <button>
              <ClipboardDocumentIcon className="h-6 w-6 text-fuchsia-950" />
            </button>
          </div>
          helllo Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Possimus debitis iusto pariatur, vero, officia ad corrupti at laborum
          ex vitae quisquam accusantium sed facilis dolore reprehenderit,
          doloribus tempora veritatis ipsam.
        </div>
      </div> */}
      <form method="POST" action="" className="flex flex-col">
        <label htmlFor="email" className="py-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="border-2 border-indigo-700"
        />

        <label htmlFor="password" className="py-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          className="border-2 border-indigo-700"
        />
        <label htmlFor="password-review" className="py-2">
          Password
        </label>
        <input
          id="password-review"
          type="password"
          required
          className="border-2 border-indigo-700"
        />
        <button>create account</button>
      </form>
    </main>
  );
}

export default App;

// POST: /api/v1/auth/sign-up
// POST: /api/v1/auth/sign-in
