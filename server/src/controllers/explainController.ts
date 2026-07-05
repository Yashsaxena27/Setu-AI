import { Request, Response } from "express";
import Scheme from "../models/Scheme";
import { generateWhyMatch } from "../services/aiExplanationService";

export const explainScheme = async (
  req: Request,
  res: Response
) => {
  try {
    const { schemeId } = req.params;

    const scheme = await Scheme.findById(schemeId);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    const explanation = await generateWhyMatch(
      req.body,
      scheme
    );

    res.json({
      success: true,
      explanation,
    });
  } catch (err: any) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};