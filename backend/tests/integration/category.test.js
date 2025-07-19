const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
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

describe("Category Endpoints", () => {
  it("should create a category", async () => {
    const res = await request(app).post("/api/categories").send({
      name: "Vegetables",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Vegetables");
  });

  it("should get all categories", async () => {
    const res = await request(app).get("/api/categories");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
