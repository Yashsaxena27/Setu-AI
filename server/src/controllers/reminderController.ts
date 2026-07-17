import { Response } from "express";
import Reminder from "../models/Reminder";
import { AuthRequest } from "../middleware/authMiddleware";

export const getReminders = async (
  req: AuthRequest,
  res: Response
) => {
  const reminders = await Reminder.find({
    user_id: req.userId,
  });

  res.json(reminders);
};

export const createReminder = async (
  req: AuthRequest,
  res: Response
) => {
  const reminder = await Reminder.create({
    ...req.body,
    user_id: req.userId,
  });

  res.status(201).json(reminder);
};

export const updateReminder = async (
  req: AuthRequest,
  res: Response
) => {
  const reminder = await Reminder.findOneAndUpdate(
    {
      _id: req.params.id,
      user_id: req.userId,
    },
    req.body,
    { new: true }
  );

  res.json(reminder);
};

export const deleteReminder = async (
  req: AuthRequest,
  res: Response
) => {
  await Reminder.findOneAndDelete({
    _id: req.params.id,
    user_id: req.userId,
  });

  res.json({
    message: "Reminder deleted",
  });
};