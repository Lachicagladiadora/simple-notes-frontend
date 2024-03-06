import { SignInForm } from "./components/SignInForm";

function App() {
  return (
    <>
      <header className="w-full h-16 bg-purple-900 flex items-center justify-center capitalize text-pink-50 px-6">
        <h1 className="font-bold text-4xl font-serif flex-1">notes</h1>
        <section className="w-auto capitalize">
          <ul className="flex gap-4">
            <li>sign in</li>
          </ul>
        </section>
      </header>
      <main className="py-12 flex flex-col justify-center items-center">
        <SignInForm />
      </main>
    </>
  );
}

export default App;
