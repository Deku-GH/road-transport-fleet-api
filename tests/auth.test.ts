import {
  describe,
  test,
  expect,
  jest,
  beforeAll,
  afterAll,
} from "@jest/globals";

import mongoose from "mongoose";
import Database from "../src/config/Database.js";
import { authController } from "../src/controllers/AuthController.js";

const database = new Database();

beforeAll(async () => {
  await database.connect();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Auth", () => {
  test("Signup should create a user", async () => {
    const req = {
      body: {
        firstname: "Mouad",
        lastname: "Sertati",
        email: `mouad-${Date.now()}@example.com`,
        password: "123456",
        role: "chauffeur",
      },
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await authController.signup(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "User created successfully",
      }),
    );
  });
});
