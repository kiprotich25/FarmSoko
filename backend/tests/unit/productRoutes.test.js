// __tests__/productRoutes.test.js
require('dotenv').config({ path: '.env.test' });
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");
const Product = require("../../models/Product");
const User = require("../../models/User");

let mongoServer;
let token;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  // Register test user
  const res = await request(app).post("/api/auth/register").send({
    username: "Farmer One",
    email: "farmer@example.com",
    password: "password123"
  });

  token = res.body.token;

  const user = await User.findOne({ email: "farmer@example.com" });
  userId = user._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Product.deleteMany();
});

describe("Product Routes", () => {
  it("should create a product", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Tomatoes",
        category: "Vegetables",
        price: 200,
        image: "https://image.url",
        description: "Fresh tomatoes",
        
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Tomatoes");
  });

  it("should get all products", async () => {
    await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Maize",
        category: "Grains",
        price: 150,
        image: "https://image.url",
        description: "Dry maize",
        
      });

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("should get a product by ID", async () => {
    const created = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Beans",
        category: "Legumes",
        price: 180,
        image: "https://image.url",
        description: "Red beans",
        
      });

    const productId = created.body._id;

    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Beans");
  });

  it("should update a product", async () => {
    const created = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Onions",
        category: "Vegetables",
        price: 100,
        image: "https://image.url",
        description: "Red onions",
        
      });

    const res = await request(app)
      .put(`/api/products/${created.body._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Onions - Updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Onions - Updated");
  });

  it("should delete a product", async () => {
    const created = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Cabbages",
        category: "Vegetables",
        price: 120,
        image: "https://image.url",
        description: "Green cabbages",
        
      });

    const res = await request(app)
      .delete(`/api/products/${created.body._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });

  it("should get products owned by the logged in user", async () => {
    await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Carrots",
        category: "Vegetables",
        price: 90,
        image: "https://image.url",
        description: "Organic carrots",
        
      });

    const res = await request(app)
      .get("/api/products/my")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toBe("Carrots");
  });
});
