"use client";

import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export default function HealthStatus() {
  const { isLoading, isError, error } = useQuery({
    queryKey: ["health"],
    queryFn: api.health.check,
  });

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
      <p className="mt-2 text-sm text-green-600">
        The API is running and responding to requests.
      </p>
    </div>
  );
}
