import supertest from "supertest";

import app from "../../src/app.js";

// Create a supertest instance with the base API path
const testClient = supertest(app);

// Helper constants
export const API_PREFIX = "/api/v1";

// Helper functions for making requests with the API prefix
export const api = {
  delete: (path: string) => testClient.delete(`${API_PREFIX}${path}`),
  get: (path: string) => testClient.get(`${API_PREFIX}${path}`),
  patch: (path: string) => testClient.patch(`${API_PREFIX}${path}`),
  post: (path: string) => testClient.post(`${API_PREFIX}${path}`),
  put: (path: string) => testClient.put(`${API_PREFIX}${path}`),
};

export default testClient;
