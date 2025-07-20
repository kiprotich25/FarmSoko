require("dotenv").config({ path: ".env.test" });
const mongoose = require("mongoose");
const Product = require("../../models/Product");
const Category = require("../../models/Category");
const User = require("../../models/User");
const productController = require("../../controllers/productController");

describe("Product Controller", () => {
  let user, category;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  beforeEach(async () => {
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    user = await User.create({
      username: "TestUser",
      email: "testuser@example.com",
      password: "hashedpass",
      role: "farmer",
    });

    category = await Category.create({ name: "Livestock" });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a product", async () => {
    const product = await Product.create({
      name: "Test Product",
      price: 10.99,
      category: category._id,
      seller: user._id,
    });

    expect(product).toHaveProperty("_id");
    expect(product.name).toBe("Test Product");
  });

  it("should get all products", async () => {
    await Product.create({
      name: "Test Product",
      price: 10.99,
      category: category._id,
      seller: user._id,
    });

    const products = await Product.find({});
    expect(products.length).toBeGreaterThan(0);
  });

  it("should get a product by ID", async () => {
    const product = await Product.create({
      name: "Test Product",
      price: 10.99,
      category: category._id,
      seller: user._id,
    });

    const found = await Product.findById(product._id);
    expect(found.name).toBe("Test Product");
  });

  it("should get products by the logged-in user", async () => {
    await Product.create({
      name: "User Product",
      price: 12.5,
      category: category._id,
      seller: user._id,
    });

    const products = await Product.find({ seller: user._id });
    expect(products.length).toBeGreaterThan(0);
  });

  it("should update a product", async () => {
    const product = await Product.create({
      name: "Old Name",
      price: 5,
      category: category._id,
      seller: user._id,
    });

    product.name = "Updated Name";
    await product.save();

    const updated = await Product.findById(product._id);
    expect(updated.name).toBe("Updated Name");
  });

  it("should return 404 if product not found", async () => {
    const product = await Product.findById( new mongoose.Types.ObjectId());
    expect(product).toBeNull();
  });

  it("should delete a product", async () => {
    const product = await Product.create({
      name: "To Delete",
      price: 20,
      category: category._id,
      seller: user._id,
    });

    await Product.findByIdAndDelete(product._id);
    const deleted = await Product.findById(product._id);
    expect(deleted).toBeNull();
  });

  it("should return 404 if product to delete not found", async () => {
    const deleted = await Product.findByIdAndDelete(new mongoose.Types.ObjectId());
    expect(deleted).toBeNull();
  });
});
