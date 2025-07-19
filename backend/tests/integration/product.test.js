const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../../models/User");
const Product = require("../../models/Product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '.env.test' });


let mongoServer;
let token;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  const hashedPassword = await bcrypt.hash("password123", 10);
  const user = await User.create({
    username: "farmer1",
    email: "farmer1@example.com",
    password: hashedPassword,
    role: "farmer",
  });

  userId = user._id;

  token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || "testsecret", {
    expiresIn: "1d",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Product Endpoints", () => {
  it("should create a product", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({
        name: "Tomatoes",
        price: 100,
        description: "Fresh from farm",
        category: "Vegetables",
        imageUrl: "http://example.com/tomato.jpg",
        seller: userId.toString(),
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Tomatoes");
  });

  it("should get all products", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
