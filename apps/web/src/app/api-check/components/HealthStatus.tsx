"use client";

import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Types } from "easy-fixer-shared";
import ConnectionStatus from "./ConnectionStatus";
import DatabaseTestForm from "./DatabaseTestForm";
import ResponseDisplay from "./ResponseDisplay";

export default function HealthStatus() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["health"],
    queryFn: api.health.check,
  });

  const [writeTestResult, setWriteTestResult] =
    useState<Types.Health.CreateResponse | null>(null);
  const [isWriteTesting, setIsWriteTesting] = useState(false);
  const [writeTestError, setWriteTestError] = useState<string | null>(null);
  const [rawResponseData, setRawResponseData] = useState<string | null>(null);
  const [isWriteTest, setIsWriteTest] = useState(false);

  // Set initial health check data when it loads
  useEffect(() => {
    if (data) {
      setRawResponseData(JSON.stringify(data, null, 2));
      setIsWriteTest(false);
    }
  }, [data]);

  const handleRunTest = async (email: string) => {
    setIsWriteTesting(true);
    setWriteTestResult(null);
    setWriteTestError(null);
    setRawResponseData(null);

    try {
      const result = await api.health.create({ email });
      setWriteTestResult(result);
      setRawResponseData(JSON.stringify(result, null, 2));
      setIsWriteTest(true);
    } catch (err) {
      console.error("Write test failed:", err);
      setWriteTestError(
        err instanceof Error ? err.message : "Unknown error occurred",
      );

      // Try to capture response even from error
      if (err instanceof Error && "response" in err) {
        const errorResponse = err.response;
        if (
          typeof errorResponse === "object" &&
          errorResponse !== null &&
          "data" in errorResponse
        ) {
          setRawResponseData(JSON.stringify(errorResponse.data, null, 2));
          setIsWriteTest(true);
        }
      }
    } finally {
      setIsWriteTesting(false);
    }
  };

  return (
    <div className="space-y-4">
      <ConnectionStatus
        isLoading={isLoading}
        isError={isError}
        error={error}
        data={data}
      />

      {!isLoading && !isError && (
        <>
          <DatabaseTestForm
            onRunTest={handleRunTest}
            isWriteTesting={isWriteTesting}
            writeTestError={writeTestError}
            writeTestResult={writeTestResult}
          />

          <ResponseDisplay
            rawResponseData={rawResponseData}
            isWriteTest={isWriteTest}
          />
        </>
      )}
    </div>
  );
}
