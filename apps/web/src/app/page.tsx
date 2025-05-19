import HealthStatus from "@/components/HealthStatus";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to Easy Fixer
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            API Connection Status
          </h2>
          <HealthStatus />
          <p className="text-sm text-gray-500 mt-2">
            Status check only verifies if the API is online and responding to
            requests.
          </p>
        </section>

        <div className="mt-8">
          <Link
            href="/create-user"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New User
          </Link>
        </div>
      </div>
    </main>
  );
}
