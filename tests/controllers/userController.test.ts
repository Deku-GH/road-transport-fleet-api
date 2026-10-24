
import { beforeEach, afterEach, describe, expect, it, jest } from "@jest/globals";
import type { Request, Response } from "express";
import { Role, UserStatus } from "../../src/types/enums.js";

// Mock the service BEFORE importing the controller.
jest.unstable_mockModule("../../src/services/userService.js", () => ({
  userService: {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  },
}));

const { userController } = await import(
  "../../src/controllers/userController.js"
);

const { userService } = await import(
  "../../src/services/userService.js"
);

function createResponse() {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  return res as unknown as Response;
}

const mockUser = {
  _id: "user123",
  firstname: "Mouad",
  lastname: "Sertati",
  email: "mouad@example.com",
  role: Role.CHAUFFEUR,
  status: UserStatus.ACTIVE,
};

describe("UserController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getAllUsers", () => {
    it("should return all users with status 200", async () => {
      jest.mocked(userService.getAllUsers).mockResolvedValue(
        [mockUser] as never
      );

      const res = createResponse();

      await userController.getAllUsers({} as Request, res);

      expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: [mockUser],
      });
    });

    it("should return 500 when retrieving users fails", async () => {
      jest.mocked(userService.getAllUsers).mockRejectedValue(
        new Error("Database error")
      );
      jest.spyOn(console, "error").mockImplementation(() => {});

      const res = createResponse();

      await userController.getAllUsers({} as Request, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Failed to retrieve users",
      });
    });
  });

  describe("getUserById", () => {
    it("should return a user with status 200", async () => {
      jest.mocked(userService.getUserById).mockResolvedValue(
        mockUser as never
      );

      const req = {
        params: { id: "user123" },
      } as Request<{ id: string }>;

      const res = createResponse();

      await userController.getUserById(req, res);

      expect(userService.getUserById).toHaveBeenCalledWith("user123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockUser,
      });
    });

    it("should return 404 when the user does not exist", async () => {
      jest.mocked(userService.getUserById).mockResolvedValue(null);

      const req = {
        params: { id: "unknown" },
      } as Request<{ id: string }>;

      const res = createResponse();

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "User not found",
      });
    });

    it("should return 500 when retrieving a user fails", async () => {
      jest.mocked(userService.getUserById).mockRejectedValue(
        new Error("Database error")
      );
      jest.spyOn(console, "error").mockImplementation(() => {});

      const req = {
        params: { id: "user123" },
      } as Request<{ id: string }>;

      const res = createResponse();

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Failed to retrieve user",
      });
    });
  });

  describe("updateUser", () => {
    it("should update a user with status 200", async () => {
      const body = {
        nom: "Sertati",
        prenom: "Mouad",
        email: "mouad.updated@example.com",
        role: Role.CHAUFFEUR,
        status: UserStatus.ACTIVE,
      };

      const updatedUser = {
        ...mockUser,
        ...body,
      };

      jest.mocked(userService.updateUser).mockResolvedValue(
        updatedUser as never
      );

      const req = {
        params: { id: "user123" },
        body,
      } as Request<{ id: string }>;

      const res = createResponse();

      await userController.updateUser(req, res);

      expect(userService.updateUser).toHaveBeenCalledWith(
        "user123",
        body
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    });

    it("should return 404 when the user does not exist", async () => {
      jest.mocked(userService.updateUser).mockResolvedValue(null);

      const req = {
        params: { id: "unknown" },
        body: { nom: "Updated" },
      } as Request<{ id: string }>;

      const res = createResponse();

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "User not found",
      });
    });

    it("should return 500 when updating fails", async () => {
      jest.mocked(userService.updateUser).mockRejectedValue(
        new Error("Update failed")
      );
      jest.spyOn(console, "error").mockImplementation(() => {});

      const req = {
        params: { id: "user123" },
        body: { nom: "Updated" },
      } as Request<{ id: string }>;

      const res = createResponse();

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Failed to update user",
        error: "Update failed",
      });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user with status 200", async () => {
      jest.mocked(userService.deleteUser).mockResolvedValue(
        mockUser as never
      );

      const req = {
        params: { id: "user123" },
      } as Request<{ id: string }>;

      const res = createResponse();

      await userController.deleteUser(req, res);

      expect(userService.deleteUser).toHaveBeenCalledWith("user123");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "User deleted successfully",
      });
    });

    it("should return 404 when the user does not exist", async () => {
      jest.mocked(userService.deleteUser).mockResolvedValue(null);

      const req = {
        params: { id: "unknown" },
      } as Request<{ id: string }>;

      const res = createResponse();

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "User not found",
      });
    });

    it("should return 500 when deleting fails", async () => {
      jest.mocked(userService.deleteUser).mockRejectedValue(
        new Error("Delete failed")
      );
      jest.spyOn(console, "error").mockImplementation(() => {});

      const req = {
        params: { id: "user123" },
      } as Request<{ id: string }>;

      const res = createResponse();

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Failed to delete user",
      });
    });
  });
});
