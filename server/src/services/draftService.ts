import { cache } from "../utils/cache";
import { profileHash } from "../utils/hash";

let ai: any;

async function initializeAI() {
  if (!ai) {
    const { GoogleGenAI } = await import("@google/genai");

    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
  }
}

export async function generateDraft(
  profile: any,
  scheme: any
) {
  await initializeAI();

  const key = `draft-${scheme._id}-${profileHash(profile)}`;

const cached = cache.get<string>(key);

if (cached) {
  console.log("✅ Draft Cache Hit");
  return cached;
}

  const prompt = `
Generate a professional government application draft.

Applicant:
${JSON.stringify(profile)}

Scheme:
${JSON.stringify(scheme)}

Write the following sections:

# Applicant Summary

# Eligibility

# Purpose

# Submission Advice

Do NOT include Required Documents.

Return Markdown.
`;

  try {
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const draft = result.text ?? "";

  cache.set(key, draft);

  console.log("🤖 Draft Generated");

  return draft;

} catch (error) {

  console.error("Gemini Draft Error:", error);

  const cached = cache.get<string>(key);

  if (cached) {
    console.log("⚠ Returning Cached Draft");
    return cached;
  }

  return `# Applicant Summary

The applicant appears to meet the basic eligibility criteria for this scheme based on the submitted profile.

# Eligibility

Please verify all eligibility conditions on the official government website before applying.

# Purpose

I wish to apply for this scheme as I believe I satisfy the required conditions.

# Submission Advice

Review the required documents and submit the application through the official government portal.
`;
}
}