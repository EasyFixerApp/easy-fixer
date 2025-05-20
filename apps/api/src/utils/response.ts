import { ReasonPhrases } from "http-status-codes";

/**
 * @description
 * This function creates a response object for successful API responses.
 * It takes a data object and returns a complete typed response object with the data, a success message, and a success flag.
 * * Should be used to keep the response consistent across the application.
 *
 * @param responseData - The data object to include in the response.
 * @param responseData.data - The data to be returned in the response.
 * @param responseData.message - Defaults to "OK". An optional message to include in the response.
 * @returns An object representing the API response.
 *
 * @example
 * const response = createResponseJson({
 *   data: { id: 1, name: "John Doe" }
 * });
 * // response will be:
 * // {
 * //   data: { id: 1, name: "John Doe" },
 * //   message: "OK",
 * //   success: true
 * // }
 */
export function createResponseJson<T>(
  responseData: Omit<ApiResponse<T>, "error" | "success">,
): ApiResponse<T> {
  return {
    data: responseData.data,
    message: responseData.message || ReasonPhrases.OK,
    success: true,
  };
}
