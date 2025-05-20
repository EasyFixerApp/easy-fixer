"use client";

import { Types } from "easy-fixer-shared";
import { useState } from "react";

type DatabaseTestFormProps = {
  onRunTest: (email: string) => Promise<void>;
  isWriteTesting: boolean;
  writeTestError: string | null;
  writeTestResult: Types.Health.CreateResponse | null;
};

export default function DatabaseTestForm({
  onRunTest,
  isWriteTesting,
  writeTestError,
  writeTestResult,
}: DatabaseTestFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onRunTest(email);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-md">
      <h3 className="font-medium text-gray-700 mb-3">
        Test Database Write/Delete
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
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
            type="submit"
            disabled={isWriteTesting || !email}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isWriteTesting ? "Testing..." : "Run Test"}
          </button>
        </div>

        {writeTestError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <h4 className="text-sm font-medium text-red-700">Test Failed:</h4>
            <p className="text-xs text-red-600 mt-1">{writeTestError}</p>
          </div>
        )}

        {writeTestResult && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <h4 className="text-sm font-medium text-green-700">Test Result:</h4>
            <pre className="text-xs mt-1 overflow-x-auto bg-white p-2 rounded border">
              {JSON.stringify(writeTestResult, null, 2)}
            </pre>
          </div>
        )}

        {!writeTestResult && !writeTestError && !isWriteTesting && email && (
          <p className="text-xs text-gray-500">
            Enter your email and click &quot;Run Test&quot; to verify database
            write/delete operations.
          </p>
        )}
      </form>
    </div>
  );
}
