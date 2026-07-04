import { Request, Response } from "express";
import Reminder from "../models/Reminder";

export const getReminders = async (
  _: Request,
  res: Response
) => {

  const reminders = await Reminder.find();

  res.json(reminders);

};

export const createReminder = async (
  req: Request,
  res: Response
) => {

  const reminder = await Reminder.create(req.body);

  res.status(201).json(reminder);

};