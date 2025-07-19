const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
require('dotenv').config({ path: '.env.test' });


let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Auth Endpoints", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "john",
      email: "john@example.com",
      password: "password123",
      role: "farmer",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login a user", async () => {
    await request(app).post("/api/auth/register").send({
      username: "jane",
      email: "jane@example.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "jane@example.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
