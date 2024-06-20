import { signIn } from "@/auth.ts";

export function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Sign In
        </h2>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
