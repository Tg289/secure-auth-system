import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">
        Secure Auth System
      </h1>

      <p className="text-gray-500">
        Production Ready Authentication
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="rounded-lg border px-5 py-3"
        >
          Register
        </Link>
      </div>
    </main>
  );
}