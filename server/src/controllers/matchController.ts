import { Request, Response } from "express";
import { findMatchingSchemes } from "../services/matchingService";
import { formatMatchResponse } from "../services/matchResponseFormatter";

export const matchSchemes = async (
  req: Request,
  res: Response
) => {
  try {
    const matches = await findMatchingSchemes(req.body);

    const response = formatMatchResponse(matches);

    res.json({
      success: true,
      total: response.length,
      matches: response,
    });
  } catch (err: any) {
    console.error("===== MATCH ERROR =====");
    console.error(err);

    res.status(500).json({
      success: false,
      message: err?.message || "Matching failed",
    });
  }
};