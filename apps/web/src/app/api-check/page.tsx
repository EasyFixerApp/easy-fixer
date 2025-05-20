import Link from "next/link";
import HealthStatus from "./components/HealthStatus";

export default function ApiCheckPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            API Health Monitor
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            API Connection Status
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <HealthStatus />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            What This Check Verifies
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>API server availability and connection status</li>
              <li>Database connectivity status</li>
              <li>Database write and delete operations</li>
              <li>Full request-response cycle between frontend and backend</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              This health check is essential for verifying that all components
              of the Easy Fixer platform are functioning correctly. It confirms
              that the API is accessible and the database is properly connected
              and operational.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            API Documentation
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600 mb-4">
              For more detailed information about the API endpoints and usage,
              please visit the API documentation:
            </p>
            <a
              href="http://localhost:4000/api-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View API Documentation
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
