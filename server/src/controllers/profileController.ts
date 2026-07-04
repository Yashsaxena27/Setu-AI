import { Response } from "express";
import User from "../models/user";
import { AuthRequest } from "../middleware/authMiddleware";

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {

  const user = await User.findById(req.userId).select("-password");

  res.json(user);

};

export const updateProfile = async (
  req: AuthRequest,
  res: Response
) => {

  const updated = await User.findByIdAndUpdate(
    req.userId,
    req.body,
    {
      new: true,
    }
  ).select("-password");

  res.json(updated);

};