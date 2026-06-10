export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded-xl">
        <h1 className="text-2xl font-bold mb-4">
          Forgot Password
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </main>
  );
}