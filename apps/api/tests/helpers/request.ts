import supertest from "supertest";

import app from "../../src/app.js";

const api = supertest(app);

export default api;
