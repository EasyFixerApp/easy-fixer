"use client";

type ResponseDisplayProps = {
  rawResponseData: string | null;
  isWriteTest: boolean;
};

export default function ResponseDisplay({
  rawResponseData,
  isWriteTest,
}: ResponseDisplayProps) {
  if (!rawResponseData) return null;

  return (
    <div className="p-4 bg-gray-50 rounded-md">
      <h3 className="font-medium text-gray-700 mb-3">Raw API Response</h3>
      <div className="bg-slate-800 rounded-md p-3">
        <pre className="text-xs text-white overflow-x-auto">
          {rawResponseData}
        </pre>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        {isWriteTest
          ? "This is the complete raw response received from the write test API call."
          : "This is the health check response from the API."}
      </p>
    </div>
  );
}
