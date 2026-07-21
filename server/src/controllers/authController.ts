import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../middleware/authMiddleware";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const cleanEmail = (email || "").trim().toLowerCase();

    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    // Use 8 salt rounds for fast computation (~40ms)
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      name: (name || "").trim(),
      email: cleanEmail,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "Registration Successful",
      token,
      user: userResponse,
    });
  } catch (err: any) {
    console.error("Register Error:", err);
    res.status(500).json({
      message: err?.message || "Registration Failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const cleanEmail = (email || "").trim().toLowerCase();

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.password) {
      return res.status(500).json({ message: "User has no password set" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id.toString());

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      message: "Login Successful",
      token,
      user: userResponse,
    });
  } catch (err: any) {
    console.error("Login Error:", err);
    res.status(500).json({
      message: err?.message || "Login Failed",
    });
  }
};

export async function deleteAccount(req: AuthRequest, res: Response) {
  try {
    await User.findByIdAndDelete(req.userId);

    res.json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete account",
    });
  }
}