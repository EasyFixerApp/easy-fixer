import apiClient from "@/lib/axios";
import { Types } from "easy-fixer-shared";

type HealthCheckFn = () => Promise<Types.Health.CheckResponse>;
type HealthCreateFn = (
  data: Types.Health.CreateRequest,
) => Promise<Types.Health.CreateResponse>;

const healthCheck: HealthCheckFn = async () => {
  const response = await apiClient.get("/health/check");
  if (response.status !== 200)
    throw new Error(
      "Failed to connect to API. Mostly likely due to network issues.",
    );

  return response.data;
};

const healthCreate: HealthCreateFn = async (data) => {
  const response = await apiClient.post("/health/write-delete", data);
  return response.data;
};

export const healthService = {
  check: healthCheck,
  create: healthCreate,
};
