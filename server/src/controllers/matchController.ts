import { Request, Response } from "express";
import { findMatchingSchemes } from "../services/matchingService";

export const matchSchemes = async (
  req: Request,
  res: Response
) => {
  try {
    const matches = await findMatchingSchemes(req.body);

    const response = matches.map((scheme) => ({
      _id: scheme._id,
      scheme_name: scheme.scheme_name,
      category: scheme.category,
      score: Number((scheme.score * 100).toFixed(1)),
      summary: scheme.summary_text,
      benefits: scheme.benefits,
      documents: scheme.required_documents,
      official_link: scheme.official_link,
    }));

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