import { api, API_PREFIX } from "../../helpers/api.js";

//test fixtures
const EXISTENT_ROUTE = "/health/check"; // Remove the /api/v1 prefix if it's added elsewhere
const NON_EXISTENT_ROUTE = "/this-route-does-not-exist";

describe("Route Not Found Handler", () => {
  it("should return 404 for non-existent routes", async () => {
    // execute
    const response = await api.get(NON_EXISTENT_ROUTE);

    // assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: `Route not found: GET ${API_PREFIX}${NON_EXISTENT_ROUTE}`,
      success: false,
    });
  });

  it("should return 404 for PUT requests to existent route with different method", async () => {
    // execute
    const response = await api.put(EXISTENT_ROUTE).send({ data: "test" });

    // assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: `Route not found: PUT ${API_PREFIX}${EXISTENT_ROUTE}`,
      success: false,
    });
  });

  it("should return 200 for an existing path without triggering route not found handler", async () => {
    // execute
    const response = await api.get(EXISTENT_ROUTE);

    // assert
    expect(response.status).toBe(200);
  });
});
