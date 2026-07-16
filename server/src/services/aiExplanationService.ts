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

export async function generateWhyMatch(
  profile: any,
  scheme: any
) {
  await initializeAI();

  const key = `explain-${scheme._id}-${profileHash(profile)}`;

const cached = cache.get<string>(key);

if (cached) {
  console.log("✅ Cache Hit");
  return cached;
}

  const prompt = `
You are an expert government welfare assistant.

User Profile:
${JSON.stringify(profile, null, 2)}

Scheme:
${JSON.stringify(scheme, null, 2)}

Explain why this user matches this scheme.

Rules:
- Use only the provided profile and scheme data.
- Do not invent eligibility.
- Keep the language simple.
- Return ONLY bullet points.
- Each bullet must start with "-".
- Write exactly 3-5 bullets.
- Do NOT include headings like "Reasons", "Match Score", "Confidence", or any introduction.

Example output:

- State eligibility matches Uttar Pradesh.
- Income falls within the eligible range.
- Age criteria are satisfied.
- Required applicant category matches.
`;

  try {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const explanation = response.text ?? "";

  cache.set(key, explanation);

  return explanation;
} catch (error) {
  console.error("Gemini Error:", error);

  const cached = cache.get<string>(key);

  if (cached) {
    return cached;
  }

  return `
• This scheme appears to match your profile.
• Please verify the eligibility on the official government website.
• AI explanation is temporarily unavailable.
`;
}
}