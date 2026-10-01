import { User, IUser } from "../models/user.model.js";
import { Role, UserStatus } from "../types/enums.js";
import bcrypt from "bcrypt";

export class UserService {
  async createUser(data: {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: Role;
  }): Promise<IUser> {
    const existingUser = await User.findOne({
      email: data.email,
    });

    if (existingUser) {
      throw new Error("User already exists");
    }
const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await User.create({
      firstname: data.nom,
      lastname: data.prenom,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      status: UserStatus.ACTIVE,
    });

    return user;
  }

  async getUsers(): Promise<IUser[]> {
    return await User.find();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async updateUser(
    id: string,
    data: Partial<{
      nom: string;
      prenom: string;
      email: string;
      role: Role;
      status: UserStatus;
    }>,
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }

  async suspendUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      id,
      {
        status: UserStatus.SUSPENDED,
      },
      {
        new: true,
      },
    );
  }

  async activateUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      id,
      {
        status: UserStatus.ACTIVE,
      },
      {
        new: true,
      },
    );
  }
}

export const userService = new UserService();
