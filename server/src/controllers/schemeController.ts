import { Request, Response } from "express";
import Scheme from "../models/Scheme";

export const getAllSchemes = async (_: Request, res: Response) => {
  try {
    const schemes = await Scheme.find();

    res.json(schemes);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch schemes",
    });
  }
};

export const getSchemeById = async (req: Request, res: Response) => {
  try {
    const scheme = await Scheme.findById(req.params.id);

    if (!scheme) {
      return res.status(404).json({
        message: "Scheme not found",
      });
    }

    res.json(scheme);
  } catch {
    res.status(500).json({
      message: "Error fetching scheme",
    });
  }
};