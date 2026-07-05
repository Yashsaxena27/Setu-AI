let ai: any;

async function initializeAI() {
  if (!ai) {
    const { GoogleGenAI } = await import("@google/genai");

    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
  }
}

export async function parseProfile(message: string) {
  await initializeAI();

  const prompt = `
You are an AI that extracts structured user information.

Extract the following fields from the user's message.

Return ONLY valid JSON.

Schema:
{
  "age": number | null,
  "state": string | null,
  "occupation": string | null,
  "annual_income": number | null,
  "education": string | null
}

User Message:
${message}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  let text = response.text ?? "{}";

  // Remove markdown code blocks if Gemini returns them
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  const profile = JSON.parse(text);

  profile.rawText = message;

  return profile;
}