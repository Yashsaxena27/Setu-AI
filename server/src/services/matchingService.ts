import Scheme from "../models/Scheme";
import { generateEmbedding } from "./embeddingService";

export async function findMatchingSchemes(profile: any) {
  const userIncome = Number(profile.income || profile.annual_income || 0);
  const userAge = Number(profile.age || 0);
  const userState = (profile.state || "").trim();
  const userOccupation = (profile.occupation || "").trim().toLowerCase();

  const query = `
${profile.rawText ?? ""}

Age: ${userAge}
State: ${userState}
Occupation: ${profile.occupation ?? ""}
Income: ${userIncome}
Education: ${profile.education ?? ""}
`;

  let candidates: any[] = [];

  try {
    const embedding = await generateEmbedding(query);
    if (embedding && embedding.length > 0) {
      candidates = await Scheme.aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: embedding,
            numCandidates: 50,
            limit: 25,
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
    }
  } catch (err) {
    console.warn("Vector search fallback to collection scan:", err);
  }

  // Fallback if vector search failed or returned empty
  if (!candidates || candidates.length === 0) {
    candidates = await Scheme.find({}).lean();
  }

  return candidates.filter((scheme: any) => {
    const rules = scheme.eligibility_rules || {};

    // 1. Age Filter
    if (userAge > 0) {
      const minAge = rules.min_age != null ? Number(rules.min_age) : 0;
      const maxAge = rules.max_age != null ? Number(rules.max_age) : 120;
      if (userAge < minAge || userAge > maxAge) {
        return false;
      }
    }

    // 2. State Filter
    if (userState && scheme.state_applicability && Array.isArray(scheme.state_applicability)) {
      const states = scheme.state_applicability.map((s: string) => s.toLowerCase());
      const isAll = states.includes("all") || states.includes("all india") || states.includes("pan india");
      if (!isAll && !states.includes(userState.toLowerCase())) {
        return false;
      }
    }

    // 3. Income Filter
    if (rules.income_limit != null && userIncome > 0) {
      const limit = Number(rules.income_limit);
      if (limit > 0 && userIncome > limit) {
        return false;
      }
    }

    // 4. Occupation Filter (Keyword & Synonyms matching)
    if (rules.occupation && typeof rules.occupation === "string") {
      const ruleOcc = rules.occupation.toLowerCase();
      
      // If rule specifies "Any" or "Citizen", skip restriction
      if (ruleOcc !== "any" && ruleOcc !== "citizen" && userOccupation) {
        const isDirectMatch = ruleOcc.includes(userOccupation) || userOccupation.includes(ruleOcc);
        
        // Category synonyms logic
        const isFarmerMatch =
          userOccupation.includes("farmer") &&
          (ruleOcc.includes("farm") || ruleOcc.includes("agri") || ruleOcc.includes("kisan") || ruleOcc.includes("crop") || ruleOcc.includes("pacs") || ruleOcc.includes("fpo"));
        
        const isStudentMatch =
          userOccupation.includes("student") &&
          (ruleOcc.includes("student") || ruleOcc.includes("school") || ruleOcc.includes("scholarship") || ruleOcc.includes("child") || ruleOcc.includes("girl") || ruleOcc.includes("education") || ruleOcc.includes("youth"));
        
        const isWomenMatch =
          (userOccupation.includes("woman") || userOccupation.includes("women") || userOccupation.includes("homemaker")) &&
          (ruleOcc.includes("woman") || ruleOcc.includes("women") || ruleOcc.includes("female") || ruleOcc.includes("girl") || ruleOcc.includes("mother") || ruleOcc.includes("lady") || ruleOcc.includes("shg") || ruleOcc.includes("self help"));

        const isUnemployedMatch =
          userOccupation.includes("unemployed") &&
          (ruleOcc.includes("unemployed") || ruleOcc.includes("youth") || ruleOcc.includes("seeker"));

        const isBusinessMatch =
          (userOccupation.includes("business") || userOccupation.includes("self employed") || userOccupation.includes("private")) &&
          (ruleOcc.includes("business") || ruleOcc.includes("entrepreneur") || ruleOcc.includes("msme") || ruleOcc.includes("self-employed") || ruleOcc.includes("trader") || ruleOcc.includes("artisan"));

        const isMatched = isDirectMatch || isFarmerMatch || isStudentMatch || isWomenMatch || isUnemployedMatch || isBusinessMatch;

        if (!isMatched) {
          return false;
        }
      }
    }

    return true;
  });
}