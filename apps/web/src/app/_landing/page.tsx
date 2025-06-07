import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <h1 className="font-sans text-5xl font-bold text-primary mb-4">
        Welcome to EasyFixer
      </h1>
      <p className="text-accent2 text-lg mb-8 text-center">
        Streamline your repair requests. Fast. Smart. Local.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          aria-label="Login to your account"
          className="bg-primary text-white px-6 py-2 rounded hover:brightness-90"
        >
          Login
        </Link>
        <Link
          href="/register"
          aria-label="Create a new account"
          className="bg-secondary text-accent3 px-6 py-2 rounded hover:brightness-90"
        >
          Register
        </Link>
        <Link
          href="/platform-info"
          aria-label="Learn more about the platform"
          className="underline text-foreground hover:text-primary"
        >
          Learn More
        </Link>
      </div>
    </main>
  );
}
