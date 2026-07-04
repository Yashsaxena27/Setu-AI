import { Request, Response } from "express";
import { findMatchingSchemes } from "../services/matchingService";
import { generateWhyMatch } from "../services/aiExplanationService";
export const matchSchemes = async (
  req: Request,
  res: Response
) => {
  try {
    const matches = await findMatchingSchemes(req.body);

    const response = [];

for (const scheme of matches) {
  const explanation = await generateWhyMatch(req.body, scheme);

  response.push({
    scheme_name: scheme.scheme_name,
    category: scheme.category,
    score: Number((scheme.score * 100).toFixed(1)),
    summary: scheme.summary_text,
    benefits: scheme.benefits,
    documents: scheme.required_documents,
    official_link: scheme.official_link,
    whyYouMatch: explanation,
  });
}

    res.json({
      success: true,
      total: response.length,
      matches: response,
    });
  }catch (err: any) {
  console.error("===== MATCH ERROR =====");
  console.error(err);
  console.error(err?.message);
  console.error(err?.stack);

  res.status(500).json({
    success: false,
    message: err?.message || "Matching failed",
  });
}
};