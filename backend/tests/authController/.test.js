const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../../models/User");
const { register, login, getMe } = require("../../controllers/authController");

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
  jest.clearAllMocks();
});

describe("Auth Controller", () => {
  describe("register", () => {
    it("should register a new user", async () => {
      const req = {
        body: {
          username: "testuser",
          email: "test@example.com",
          password: "password123",
          role: "farmer"
        }
      };
      const res = mockResponse();

      bcrypt.hash.mockResolvedValue("hashedpassword");
      jwt.sign.mockReturnValue("mockedToken");

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          username: "testuser",
          email: "test@example.com",
          role: "farmer",
          token: "mockedToken"
        })
      );
    });

    it("should not register if email is invalid", async () => {
      const req = {
        body: {
          username: "baduser",
          email: "invalid-email",
          password: "pass"
        }
      };
      const res = mockResponse();

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid email format" });
    });
  });

  describe("login", () => {
    it("should login with correct credentials", async () => {
      const user = new User({
        username: "test",
        email: "test@example.com",
        password: "hashedpassword",
        role: "farmer"
      });
      await user.save();

      const req = {
        body: {
          email: "test@example.com",
          password: "password123"
        }
      };
      const res = mockResponse();

      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("validtoken");

      await login(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          token: "validtoken",
          user: expect.objectContaining({ username: "test", role: "farmer" })
        })
      );
    });

    it("should fail if user doesn't exist", async () => {
      const req = {
        body: { email: "noone@example.com", password: "1234" }
      };
      const res = mockResponse();

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid email" });
    });
  });

  describe("getMe", () => {
    it("should return current user", async () => {
      const user = await User.create({
        username: "meuser",
        email: "me@example.com",
        password: "hashedpass",
        role: "farmer"
      });

      const req = { user: { userId: user._id } };
      const res = mockResponse();

      await getMe(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          user: expect.objectContaining({ username: "meuser", email: "me@example.com" })
        })
      );
    });

    it("should return 404 if user not found", async () => {
      const req = { user: { userId: new mongoose.Types.ObjectId() } };
      const res = mockResponse();

      await getMe(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });
});

function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}
