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
  const prompt = `
You are an expert government welfare assistant.

User Profile:
${JSON.stringify(profile, null, 2)}

Scheme:
${JSON.stringify(scheme, null, 2)}

Explain in 3-4 concise bullet points why this user matches this scheme.

Rules:
- Use only the provided profile and scheme data.
- Do not invent eligibility.
- Keep the language simple.
- Return only bullet points.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text ?? "";
}