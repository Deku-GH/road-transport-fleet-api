import mongoose, { Schema, Document } from "mongoose";
import { Role, UserStatus } from "../types/enums.js";

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
  status: UserStatus;
}

const userSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
     
    },

    lastname: {
      type: String,
  
    },

    email: {
      type: String,
  
    },

    password: {
      type: String,
      
    },

    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
  },
  { 
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);