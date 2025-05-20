"use client";

import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { hasKey, Types } from "easy-fixer-shared";

export default function HealthStatus() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["health"],
    queryFn: api.health.check,
  });

  const [email, setEmail] = useState("");
  const [writeTestResult, setWriteTestResult] =
    useState<Types.Health.CreateResponse | null>(null);
  const [isWriteTesting, setIsWriteTesting] = useState(false);
  const [writeTestError, setWriteTestError] = useState<string | null>(null);
  const [rawResponseData, setRawResponseData] = useState<string | null>(null);

  // Set initial health check data when it loads
  useEffect(() => {
    if (data) {
      setRawResponseData(JSON.stringify(data, null, 2));
    }
  }, [data]);

  const handleWriteTest = async () => {
    if (!email) return;
    setIsWriteTesting(true);
    setWriteTestResult(null);
    setWriteTestError(null);
    setRawResponseData(null);

    try {
      const result = await api.health.create({ email });
      setWriteTestResult(result);
      setRawResponseData(JSON.stringify(result, null, 2));
    } catch (err) {
      console.error("Write test failed:", err);
      setWriteTestError(
        err instanceof Error ? err.message : "Unknown error occurred",
      );

      // Try to capture response even from error
      if (
        err instanceof Error &&
        hasKey(err, "response") &&
        hasKey(err.response, "data")
      ) {
        setRawResponseData(JSON.stringify(err.response.data, null, 2));
      }
    } finally {
      setIsWriteTesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 rounded-md">
        <p className="text-blue-700">Checking API status...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 rounded-md">
        <h3 className="font-bold text-red-700">API Connection Error</h3>
        <p className="text-red-600">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-md">
        <h3 className="font-bold text-green-700">API Status: Connected</h3>
        <div className="mt-2 text-sm">
          <p className="text-green-600">
            The API is running and responding to requests.
          </p>
          <p className="font-medium mt-2">
            Database Status:{" "}
            <span
              className={
                data?.data?.db === "up" ? "text-green-600" : "text-red-600"
              }
            >
              {data?.data?.db === "up" ? "Online" : "Offline"}
            </span>
          </p>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-md">
        <h3 className="font-medium text-gray-700 mb-3">
          Test Database Write/Delete
        </h3>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email for test"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <button
            onClick={handleWriteTest}
            disabled={isWriteTesting || !email}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isWriteTesting ? "Testing..." : "Run Test"}
          </button>
        </div>

        {writeTestError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <h4 className="text-sm font-medium text-red-700">Test Failed:</h4>
            <p className="text-xs text-red-600 mt-1">{writeTestError}</p>
          </div>
        )}

        {writeTestResult && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
            <h4 className="text-sm font-medium text-green-700">Test Result:</h4>
            <pre className="text-xs mt-1 overflow-x-auto bg-white p-2 rounded border">
              {JSON.stringify(writeTestResult, null, 2)}
            </pre>
          </div>
        )}

        {!writeTestResult && !writeTestError && !isWriteTesting && email && (
          <p className="mt-3 text-xs text-gray-500">
            Enter your email and click &quot;Run Test&quot; to verify database
            write/delete operations.
          </p>
        )}
      </div>

      {/* Always show raw response section, either with health check or write test data */}
      <div className="p-4 bg-gray-50 rounded-md">
        <h3 className="font-medium text-gray-700 mb-3">Raw API Response</h3>
        <div className="bg-slate-800 rounded-md p-3">
          <pre className="text-xs text-white overflow-x-auto">
            {rawResponseData || "No response data available"}
          </pre>
        </div>
        <p className="mt-2 text-xs text-gray-500">
          {writeTestResult
            ? "This is the complete raw response received from the write test API call."
            : "This is the health check response from the API."}
        </p>
      </div>
    </div>
  );
}
