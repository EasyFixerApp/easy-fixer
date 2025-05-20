import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Easy Fixer Platform
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Smart Service Request Management System connecting people who need
          building repairs with nearby skilled workers.
        </p>

        <Link
          href="/api-check"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Check API Status
        </Link>
      </div>
    </main>
  );
}
