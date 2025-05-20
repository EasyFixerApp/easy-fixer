"use client";

import { Types } from "easy-fixer-shared";

type ConnectionStatusProps = {
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  data?: Types.Health.CheckResponse;
};

export default function ConnectionStatus({
  isLoading,
  isError,
  error,
  data,
}: ConnectionStatusProps) {
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
              data?.data.db === "up" ? "text-green-600" : "text-red-600"
            }
          >
            {data?.data.db === "up" ? "Online" : "Offline"}
          </span>
        </p>
      </div>
    </div>
  );
}
