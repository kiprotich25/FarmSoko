// __tests__/authRoutes.test.js
require('dotenv').config({ path: '.env.test' });
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app"); // Adjust path if needed
const User = require("../../models/User");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Auth Routes", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
       username: "testuser",
      email: "test@example.com",
      password: "password123"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it("should login a registered user", async () => {
    await request(app).post("/api/auth/register").send({
       username: "testuser",
      email: "test@example.com",
      password: "password123"
    });

    const res = await request(app).post("/api/auth/login").send({
        username: "testuser",
        email: "test@example.com",
      password: "password123"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("should return user profile if token is valid", async () => {
    const reg = await request(app).post("/api/auth/register").send({
       username: "testuser",
      email: "test@example.com",
      password: "password123"
    });

    const token = reg.body.token;

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("test@example.com");
  });
});
