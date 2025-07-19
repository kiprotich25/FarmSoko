// __tests__/categoryRoutes.test.js
require('dotenv').config({ path: '.env.test' });
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");
const Category = require("../../models/Category");

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
  await Category.deleteMany();
});

describe("Category Routes", () => {
  it("should create a new category", async () => {
    const res = await request(app).post("/api/categories").send({
      name: "Vegetables"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Vegetables");
  });

  it("should get all categories", async () => {
    await request(app).post("/api/categories").send({ name: "Fruits" });
    await request(app).post("/api/categories").send({ name: "Grains" });

    const res = await request(app).get("/api/categories");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });
});
