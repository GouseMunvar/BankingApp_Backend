import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../Models/userModel"
import { AccountModel } from "../Models/accountModel";
import { TransactionModel } from "../Models/transactionModel";
import jwt from "jsonwebtoken";


export const RegisterUser = async (req: Request, res: Response) => {

  const { name, email, password, cnfPassword, role } = req.body;

  try {

    // 1. Check password match
    if (password !== cnfPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }


    // 2. Check existing user
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }


    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    // 4. Create user
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      accountNumber: Math.floor(
        1000000000 + Math.random() * 9000000000
      ).toString()
    });


    // 5. Create account
    await AccountModel.create({
      userId: user._id,
      accountType: "saving",
      balance: 0,
      status: "active"
    });


    return res.status(201).json({
      message: "User registered successfully",
      user
    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });

  }

};







export const LoginUser = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {

    // 1. Find user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }


    // 2. Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );


    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }


    // 3. Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d"
      }
    );


    // 4. Send response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });


  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });

  }

};
















