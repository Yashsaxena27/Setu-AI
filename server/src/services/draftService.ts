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

  const prompt = `
Generate a simple government application draft.

Applicant:
${JSON.stringify(profile)}

Scheme:
${JSON.stringify(scheme)}

Write:
- Applicant Summary
- Eligibility
- Purpose
- Required Documents
- Submission Advice

Use plain English.
`;

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return result.text;
}