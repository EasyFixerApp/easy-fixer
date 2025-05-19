import apiClient from "@/lib/axios";

type HealthCheckFn = () => Promise<number>;

const healthCheck: HealthCheckFn = async () => {
  const response = await apiClient.get("/healthh");
  if (response.status !== 200)
    throw new Error(
      "Failed to connect to API. Mostly likely due to network issues.",
    );

  return response.status;
};

export const healthService = {
  check: healthCheck,
};
