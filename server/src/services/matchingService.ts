import Scheme from "../models/Scheme";
import { generateEmbedding } from "./embeddingService";

export async function findMatchingSchemes(profile: any) {
  const query = `
${profile.rawText ?? ""}

Age: ${profile.age ?? ""}
State: ${profile.state ?? ""}
Occupation: ${profile.occupation ?? ""}
Income: ${profile.annual_income ?? ""}
Education: ${profile.education ?? ""}
`;

  const embedding = await generateEmbedding(query);

  const results = await Scheme.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: embedding,
        numCandidates: 50,
        limit: 10,
      },
    },
    {
      $project: {
        scheme_name: 1,
        category: 1,
        summary_text: 1,
        eligibility_rules: 1,
        state_applicability: 1,
        benefits: 1,
        required_documents: 1,
        official_link: 1,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
  ]);

  return results.filter((scheme: any) => {
    const rules = scheme.eligibility_rules || {};

    // Age Filter
    if (
      profile.age &&
      (profile.age < (rules.min_age ?? 0) ||
        profile.age > (rules.max_age ?? 120))
    ) {
      return false;
    }

    // State Filter
    if (
      profile.state &&
      !scheme.state_applicability.includes("All") &&
      !scheme.state_applicability.includes(profile.state)
    ) {
      return false;
    }

    // Income Filter
    if (
      rules.income_limit != null &&
      profile.annual_income != null &&
      profile.annual_income > rules.income_limit
    ) {
      return false;
    }

    // Occupation Filter
    if (
      rules.occupation &&
      rules.occupation !== "Any" &&
      rules.occupation.toLowerCase() !==
        (profile.occupation || "").toLowerCase()
    ) {
      return false;
    }

    return true;
  });
}