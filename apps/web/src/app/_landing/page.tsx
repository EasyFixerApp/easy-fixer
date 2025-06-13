import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">
        Welcome to EasyFixer
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center">
        Streamline your repair requests. Fast. Smart. Local.
      </p>
      <div className="flex gap-4">
        <Link
          href="/auth/login"
          aria-label="Login to your account"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          aria-label="Create a new account"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
        >
          Register
        </Link>
        <Link
          href="/platform-info"
          aria-label="Learn more about the platform"
          className="underline text-blue-600 hover:text-blue-800"
        >
          Learn More
        </Link>
      </div>
    </main>
  );
}
