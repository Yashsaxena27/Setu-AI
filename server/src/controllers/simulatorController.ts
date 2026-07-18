import { Request, Response } from "express";
import { findMatchingSchemes } from "../services/matchingService";

export async function simulateEligibility(
  req: Request,
  res: Response
) {
  try {
    const { originalProfile, simulatedProfile } = req.body;

    const originalMatches = await findMatchingSchemes(originalProfile);
    const simulatedMatches = await findMatchingSchemes(simulatedProfile);

    const originalIds = new Set(
      originalMatches.map((s: any) => String(s._id))
    );

    const simulatedIds = new Set(
      simulatedMatches.map((s: any) => String(s._id))
    );

    const gained = simulatedMatches.filter(
      (s: any) => !originalIds.has(String(s._id))
    );

    const lost = originalMatches.filter(
      (s: any) => !simulatedIds.has(String(s._id))
    );

    const unchanged = simulatedMatches.filter(
      (s: any) => originalIds.has(String(s._id))
    );

    res.json({
      success: true,
      gained,
      lost,
      unchanged,
    });
  } catch (err: any) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message || "Simulation failed",
    });
  }
}