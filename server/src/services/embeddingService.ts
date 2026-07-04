let ai: any;

async function initializeAI() {
  if (!ai) {
    const { GoogleGenAI } = await import("@google/genai");
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
  }
  return ai;
}

export async function generateEmbedding(text: string) {
  const aiInstance = await initializeAI();
  const response = await aiInstance.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });

  return response.embeddings?.[0]?.values || [];
}