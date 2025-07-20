
require('dotenv').config({ path: '.env.test' });
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Product = require("../../models/Product");
const Category = require("../../models/Category");
const User = require("../../models/User");

let token;
let categoryId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/test-db");

  // Register + login user
  await request(app).post("/api/auth/register").send({
    username: "farmer",
    email: "farmer@example.com",
    password: "123456",
  });

  const res = await request(app).post("/api/auth/login").send({
    email: "farmer@example.com",
    password: "123456",
  });

  token = res.body.token;

  // Create category
  const category = await Category.create({ name: "Vegetables" });
  categoryId = category._id;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  await Product.deleteMany();
});

describe("Product Endpoints", () => {
  test("should create a product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Tomatoes",
        price: 50,
        description: "Red ripe tomatoes",
        category: categoryId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Tomatoes");
  });

  test("should get all products", async () => {
    await Product.create({
      name: "Onions",
      price: 30,
      description: "Fresh onions",
      category: categoryId,
      seller: (await User.findOne({ email: "farmer@example.com" }))._id,
    });

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
