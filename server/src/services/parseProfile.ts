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

  let profile: any = {};
  try {
    profile = JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse Gemini profile JSON, attempting bracket cleanup:", err);
    try {
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd !== -1) {
        profile = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
      }
    } catch (innerErr) {
      console.error("Failed to clean up and parse profile json:", innerErr);
    }
  }

  return {
    age: profile.age != null ? Number(profile.age) : null,
    state: profile.state || null,
    occupation: profile.occupation || null,
    annual_income: profile.annual_income != null ? Number(profile.annual_income) : null,
    education: profile.education || null,
    rawText: message,
  };
}