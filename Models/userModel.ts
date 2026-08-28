import mongoose, { Mongoose } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  accountNumber: string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "user"
  },

  accountNumber: {
    type: String,
    required: true,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


export const UserModel = mongoose.model("User", userSchema);