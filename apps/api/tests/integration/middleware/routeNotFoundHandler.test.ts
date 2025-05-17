import api from "../../helpers/request.js";

describe("Route Not Found Handler", () => {
  it("should return 404 for non-existent routes", async () => {
    // execute
    const response = await api.get("/non-existent-route");

    // assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Route not found: GET /non-existent-route",
      success: false,
    });
  });

  it("should return 404 for PUT requests to existent route with different method", async () => {
    // execute
    const response = await api.put("/api/v1/health").send({ data: "test" });

    // assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Route not found: PUT /api/v1/health",
      success: false,
    });
  });

  it("should return 200 for an existing path without triggering route not found handler", async () => {
    // execute
    const response = await api.get("/api/v1/health");

    // assert
    expect(response.status).toBe(200);
  });
});
